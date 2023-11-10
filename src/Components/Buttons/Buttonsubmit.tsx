import React from 'react'
import Loadingspinner from '../Spinners/Loadingspinner'

export default function Buttonsubmit(props:any) {
    return (
        <button onClick={props.onClick} type="submit" className={`${props.className} inline-flex text-sm justify-center items-center space-x-2 border transition-all font-semibold focus:outline-none  px-4 py-1  leading-6 rounded border-red-700 bg-red-500 text-white hover:text-white hover:bg-red-800 hover:border-red-800 focus:ring focus:ring-red-400 focus:ring-opacity-50 active:bg-red-700 active:border-red-700  w-full py-2 ${props.processing && 'opacity-50 pointer-events-none'}`}>
            {props.processing && <Loadingspinner />}
            {props.text}
        </button>
    )
}