import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../apiCalendar"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth"
import { onLogoutCalendar } from "../store/calendar"


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth )
    const dispatch = useDispatch()
    

    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() )

        try {

            const { data } = await calendarApi.post('/auth', { email, password })

            localStorage.setItem('calendarapp-token', data.token)
            localStorage.setItem('calendarapp-token-init-date', new Date().getTime())
            dispatch( onLogin({ name: data.name, uid: data.uid }) )

        } catch (error) {

            dispatch( onLogout('Correo y/o Contraseña incorrectas') )

            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 500);

        }
    }

    const startRegister = async({ name, email, password }) => {
        try {
            
            const { data } = await calendarApi.post('/auth/new', { name, email, password })
            
            localStorage.setItem('calendarapp-token', data.token)
            localStorage.setItem('calendarapp-token-init-date', new Date().getTime())
            dispatch( onLogin({ name: data.name, uid: data.uid }) )

        } catch (error) {

            dispatch( onLogout(error.response?.data?.msg || Object.values(error.response.data.errors)[0].msg || 'Error en el registro') )


            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 500);
        }
    }

    const checkAuthToken = async() => {
        
        const token = localStorage.getItem('calendarapp-token')

        if(!token){ return dispatch( onLogout() ) }

        try {

            const { data } = await calendarApi.get('/auth/renew')
            localStorage.setItem('calendarapp-token', data.token)
            localStorage.setItem('calendarapp-token-init-date', new Date().getTime())
            dispatch( onLogin({ name: data.name, uid: data.uid }) )
            
        } catch (error) {
            console.log(error);
            localStorage.removeItem('calendarapp-token')
            localStorage.removeItem('calendarapp-token-init-date')
            dispatch( onLogout() )
        }
    }

    const startLogout = () => {
        localStorage.removeItem('calendarapp-token')
        localStorage.removeItem('calendarapp-token-init-date')
        dispatch( onLogoutCalendar() )
        dispatch( onLogout() )
    }

    return {
        
        // Properties
        status,
        user,
        errorMessage,

        // Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}
