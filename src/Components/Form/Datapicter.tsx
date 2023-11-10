
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Datepicker(props: any) {
    const [startDate, setStartDate] = useState(new Date());
    const [showerror, setShowError] = React.useState(false)
    let handleChange = (data: any) => {
        setStartDate(data)
        setShowError(false)
        if (props.hasOwnProperty('getdateData')) {
            props.getdateData(data)
        }

    }
    useEffect(() => {
        setStartDate(new Date(new Date(props.value)))
    }, [props.value])

    useEffect(() => {
        handleChange(null)
    }, [])

    React.useEffect(() => {
        if (props.error) {
            setShowError(true)
        }
    }, [props.error])

    return (
        <div className={`w-full  text-blue-950 text-xs ${props.className} ${props.disabled && 'pointer-events-none opacity-50'}`}>
            {props.label && <nav className='mb-2'>   <label htmlFor="lastname" className="font-normal  text-sm capitalize ">{props.label ?? 'label'}</label> {props.required && <abbr className='text-red-300' title='This field is requred'>*</abbr>}
            </nav>
            }
            <nav className={`flex items-center gap-2 w-full relative px-2  rounded  leading-6  focus-within:border-indigo-400 ring-offset-1 focus-within:ring-2 transition-all ease-out duration-150 focus-within:outline-none focus-within:border-none ${!props.disabled && 'border border-gray-200'}`}>

                <Icon icon="uil:calender" className="text-gray-500" />
                <DatePicker
                    withPortal={true}
                    dropdownMode="select"
                    showMonthDropdown
                    showYearDropdown
                    minDate={props.minDate ?? null} maxDate={props.maxDate ?? new Date()} placeholderText={props.placeholder ?? 'Select Date'} dateFormat={props.format ?? 'dd/MM/yyyy'} className="  py-[0.62rem] !outline-none border border-blue-950/20 w-full !border-none focus:!outline-none focus:!border-none focus-within:!outline-none focus-within:!border-none grow rounded-sm text-sm " disabled={props.disabled} selected={startDate} onChange={(date) => handleChange(date)} />
                {props.error && showerror && <nav className="icon-warning cursor-pointer error-element  gap-1 font-awesome flex items-center absolute right-2 inset-y-0">
                    <Icon icon="carbon:warning-filled" className="text-red-400 h-5 w-5 min-h-[1.25rem] min-w-[1.25rem] order-2 " />
                    <span className="  text-xs text-red-400 backdrop-blur-sm bg-white/30 error ">{props.error}</span>
                </nav>}
            </nav>
        </div>
    )
}
