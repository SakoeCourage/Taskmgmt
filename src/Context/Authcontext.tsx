import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from '../Api'
import Cookies from "js-cookie";
import { Axios, AxiosResponse } from "axios";
import { LoginResponseDto, authUserData } from "./Responsedatadto";


export type responseState = 'idle' | 'fullfiled' | 'processing'

export type FormData<K extends string, V extends any> = Record<K, V>;

interface AuthContextValues {
    user: null | authUserData;
    login: (formData: FormData<string, any>) => Promise<LoginResponseDto>;
    logout: () => void;
    getUser: () => void;
    checkingforuser: responseState;
    notificationsCount: any;
}
const AuthContext = createContext<AuthContextValues | undefined>(undefined);



export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<authUserData | null>(null)
    const [notificationsCount, setNotificationsCount] = useState({})
    const [checkingforuser, setCheckingforUser] = useState<responseState>('idle')
    const navigate = useNavigate();

    const getNoficationsCount = () => {
        Api.get("/notification-count").then(res => {
            setNotificationsCount(res.data)
            console.log(res.data)
        }).catch(err => {
        }).finally(() => {
            setCheckingforUser('fullfiled')
        })
    }

    const getUser = () => {
        setCheckingforUser('processing')
        Api.get("/auth/user").then((res: AxiosResponse) => {
            const userData: authUserData = res.data
            setUser(userData)
        }).catch(err => {
           
        })
            .finally(() => {
                setCheckingforUser('fullfiled')
            })
    }


    const login:(formData: FormData<string, any>) => Promise<LoginResponseDto> = async (formData) => {
        return new Promise((resolve, reject) => {
            Api.post('/auth/login', formData)
                .then((res) => {
                    const userResponse: LoginResponseDto = res.data
                    const { accessToken } = userResponse;
                    Cookies.set('BearerToken', accessToken);
                    resolve(userResponse);
                    location.reload();
                    // getUser();
                })
                .catch((err) => {
                    console.log(err)
                    if (err?.response?.status === 400) {
                        reject(err?.response?.data?.errors);
                    }
                });
        });
    };



    const logout = () => {
         Cookies.remove("BearerToken")
         location.reload();
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
            getUser,
            checkingforuser,
            notificationsCount
        }),
        [checkingforuser, user, notificationsCount]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};