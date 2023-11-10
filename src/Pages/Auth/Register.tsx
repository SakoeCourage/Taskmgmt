import React, { FormEvent, useState } from 'react'
import Textinput from '../../Components/Form/Textinput'
import Buttonsubmit from '../../Components/Buttons/Buttonsubmit'
import Api from '../../Api/index'
import { useSnackbar } from 'notistack'
import type { ComponentProps } from './Index'

export default function Register({ setCurrentComponent }:ComponentProps) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })
    const [errors, setErrors] = useState<any>({

    })
    const [processing, setProcessing] = useState(false)
 
    const handleRegister = (e:FormEvent) => {
        e.preventDefault()
        setProcessing(true)
        Api.post('/auth/register', formData)
            .then((res:any) => {
                console.log(res.data)
                setCurrentComponent('Login')
                enqueueSnackbar({variant: 'success',message: "New Account Created"})
            })
            .catch((err:any) => { 
                console.log(err)
                if (err?.response.status === 400) {
                    setErrors(err?.response?.data?.errors)
                }
                setProcessing(false)
            })
    }

    return (
        <form onSubmit={handleRegister} className=' flex items-center flex-col gap-7 card max-w-xl mx-auto h-full bg-pink-100/20 rounded-md'>
            <div className=' flex flex-col items-center'>
                <nav className=' font-semibold text-2xl'>Register</nav>
                <nav className=' font-normal'>Enter your credentials in the form provided</nav>
            </div>
            <Textinput error={errors?.name} value={formData.name} onChange={(e:any) => setFormData((cv) => cv = { ...cv, name: e.target.value })} label="User name" placeholder="User name" type="text" />
            <Textinput error={errors?.email} value={formData.email} onChange={(e:any) => setFormData((cv) => cv = { ...cv, email: e.target.value })} label="Email" placeholder="user@eamil.com" type="text" />
            <Textinput error={errors?.password || errors?.passwordConfirmation} value={formData.password} onChange={(e:any) => setFormData((cv) => cv = { ...cv, password: e.target.value })} placeholder="password" label="Password" type="password" />
            <Textinput value={formData.passwordConfirmation} onChange={(e:any) => setFormData((cv) => cv = { ...cv, passwordConfirmation: e.target.value })} placeholder="Confirm password" label="Confirm password" type="password" />
            <Buttonsubmit processing={processing} className="" text="Login" />
            <nav onClick={() => setCurrentComponent('Login')} className="mt-auto text-blue-900 cursor-pointer">
                Login instead
            </nav>
        </form>
    )
}
