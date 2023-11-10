import React from 'react'
import Header from './Layoutpartials/Header'
import { Outlet } from 'react-router-dom'

function RootLayout() {
    return (
        <div>
            <Header />
            <div className=' '>
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout