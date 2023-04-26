import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { useAuthStore } from "../hooks"

import { LoginPage } from "../auth/pages"
import { CalendarPage } from "../calendar/pages"

import { authStatus as authStatusOptions } from "../store/auth"


export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore()
    
    useEffect(()=> {
        checkAuthToken()
    },[])

    
    if( status === authStatusOptions.checking ){
        return (
            <div>
                <p>Cargando...</p>
            </div>
        )
    }


    return (
        <Routes>
            {
                ( status === 'not-authenticated' )
                    ? (
                        <>
                            <Route path="/auth/*" element={ <LoginPage /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <CalendarPage /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }
        </Routes>
    )
}


