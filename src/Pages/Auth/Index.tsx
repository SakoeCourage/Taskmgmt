import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import instImage from '../../images/loginhero.png'
import { useAuth } from '../../Context/Authcontext'
import { Navigate } from 'react-router-dom'


export type KeyTypeofComponent = "Login" | "Register";

export interface ComponentProps {
    setCurrentComponent: (com: KeyTypeofComponent) => void;
}

type ComponentTypes<T extends KeyTypeofComponent> = {
    [K in T]: React.FC<ComponentProps>;
}

const components: ComponentTypes<KeyTypeofComponent> = {
    Login: Login, 
    Register: Register, 
}

function Index() {
    const { user } = useAuth()
    const [currentComponent, setCurrentComponent] = useState<KeyTypeofComponent>('Login')
    const Component: React.FC<ComponentProps> = components[currentComponent]

    var getPreviousUrl = ():string =>String(window.history.back())
  
    {
        if (!user) {
            return <div>
                <div className='constrain flex p-5 pt-10 items-center '>
                    <img src={instImage} alt="" className=' max-h-[30rem] hidden md:block ' />
                    <div className='w-full'>
                        <Component setCurrentComponent={setCurrentComponent} />
                    </div>
                </div>
            </div>
        }
        else {
            return <Navigate to={getPreviousUrl()} />;
        }

    }
}

export default Index