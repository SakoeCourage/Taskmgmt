import axios, { AxiosInstance } from "axios";
import Cookies from 'js-cookie'

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const Bearertoken = Cookies.get('BearerToken')

const Api: AxiosInstance = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials: true,
})


if (Bearertoken !== undefined) Api.defaults.headers.common['Authorization'] = `Bearer ${Bearertoken}`;


Api.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error?.response?.status === 401 || error?.response?.status === 419) {
        Cookies.remove('BearerToken')
    } else {
        return Promise.reject(error);
    }

    return Promise.reject(error);
});

export default Api;