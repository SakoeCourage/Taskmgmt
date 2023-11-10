import { Icon } from '@iconify/react'
import React, { useState, useEffect } from 'react'


const Textinput = ((props:any) => {
    const [value, setValue] = useState('')
    const [showerror, setShowError] = useState(false)
    let handleonchange = (onchangeValue:any) => {
        setShowError(false)
        setValue(onchangeValue)
        if (props.hasOwnProperty('onChange')) {
            props.onChange({ target: { value: onchangeValue } })
        }
    }

    useEffect(() => {
        if (props.error) {
            setShowError(true)
        }
    }, [props.error])
    useEffect(() => {
        handleonchange(props.value ?? '')
    }
        , [props.value])

    useEffect(
        () => handleonchange('')
        , [props.reset])
    return (
        <div className={`w-full space-y-1 text-blue-950 text-xs ${props.className} ${props.disabled && 'pointer-events-none select-none opacity-50'}`}>
            {props.label && <nav className='mb-2'>   <label htmlFor="lastname" className="font-normal  text-sm capitalize ">{props.label ?? 'label'}</label> {props.required && <abbr className='text-red-300' title='This field is requred'>*</abbr>}
            </nav>
            }
            <nav className={`block  relative border bg-inherit  border-blue-950/20 focus-within:border-none rounded-md leading-6 w-full ring-offset-1 focus-within:ring-2 ring-red-300 transition-all ease-out duration-500 ${props.readOnly && 'focus-within:none border-none ring-0 ring-offset-0 outline-none'}`} >
                <input disabled={props.disabled} inputMode={props.inputMode ?? 'none'} value={props.value ?? value} type={props.type ?? 'text'} onChange={(e) => handleonchange(e.target.value)} readOnly={props.readOnly} min='0' placeholder={props?.placeholder ?? ''} className={`px-5 py-3 text-sm rounded-md bg-inherit  w-full outline-none border-none focus:border-none focus:outline-none `} />
                {props.error && showerror && <nav className="cursor-pointer error-element  gap-1 font-awesome flex items-center absolute right-2 inset-y-0 icon-warning">
                    <Icon icon="carbon:warning-filled" className="text-red-400 h-5 w-5 min-h-[1.25rem] min-w-[1.25rem] order-2 " />
                    <span className="  text-xs text-red-400 backdrop-blur-sm bg-white/30 error ">{props.error}</span>
                </nav>}
            </nav>
        </div>
    )
})

export default Textinput