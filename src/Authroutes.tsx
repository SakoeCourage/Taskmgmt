import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from './Context/Authcontext';
import { Navigate } from "react-router-dom";

function Authroutes() {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/" />;
    } else {
        return <Outlet />;
    }

}

export default Authroutes