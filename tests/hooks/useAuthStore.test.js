import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import { useAuthStore } from "../../src/hooks/useAuthStore"
import { authSlice, authStatus } from "../../src/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedState } from "../fixtures/authState"
import { testUserCredentials } from "../fixtures/testUser"
import { calendarApi } from "../../src/apiCalendar"



const getMockStore = ( initialState )=> {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en useAuthStore', () => {

    beforeEach(()=> {
        localStorage.removeItem('calendarapp-token')
        localStorage.removeItem('calendarapp-token-init-date')
    })


    test('Debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore(initialState)
        
        const { result } = renderHook( () => useAuthStore() ,{
            wrapper: ({ children }) => {
                return <Provider store={ mockStore }>{ children }</Provider>
            }
        })

        expect(result.current).toEqual(    {
            status : authStatus.checking,
            user   : {},
            errorMessage  : undefined,
            startLogin    : expect.any( Function ),
            startRegister : expect.any( Function ),
            checkAuthToken: expect.any( Function ),
            startLogout   : expect.any( Function )
        })
    })


    
    test('startLogin debe de realizar el login correctamente ', async() => {

        const mockStore = getMockStore(notAuthenticatedState)
       
        const { result } = renderHook( () => useAuthStore() ,{
            wrapper: ({ children }) => {
                return <Provider store={ mockStore }>{ children }</Provider>
            }  
        })

        
        await act(async()=>{
            await result.current.startLogin( testUserCredentials )
        })


        const { status, user, errorMessage } = result.current

        expect({ status, user, errorMessage }).toEqual({
            status: authStatus.authenticated,
            user: { 
                name: testUserCredentials.name, 
                uid: testUserCredentials.uid 
            },
            errorMessage: undefined,
        })

        
        expect(result.current).toEqual({
            status: authStatus.authenticated,
            user: { 
                name: testUserCredentials.name, 
                uid: testUserCredentials.uid 
            },
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        })


        expect( localStorage.getItem('calendarapp-token') ).toEqual( expect.any( String ) )
        expect( localStorage.getItem('calendarapp-token-init-date') ).toEqual( expect.any( String ) )

    })



    test('startLogin debe de fallar la autenticación ', async() => {
    

        const mockStore = getMockStore(notAuthenticatedState)
       
        const { result } = renderHook( () => useAuthStore() ,{
            wrapper: ({ children }) => {
                return <Provider store={ mockStore }>{ children }</Provider>
            }  
        })

        
        await act(async()=>{
            await result.current.startLogin({ email: 'hola@gmail.com', password:'123456789' })
        })


        const { status, user, errorMessage } = result.current

        expect({ status, user, errorMessage }).toEqual(    {
            status: authStatus.notAuthenticated,
            user: {},
            errorMessage: expect.any( String )
        })

        expect(localStorage.getItem('calendarapp-token')).toBe(null)
    
        await waitFor(
            ()=> expect( result.current.errorMessage ).toBe(undefined)
        )
    })   



    test('startRegister debe de crear un usuario', async() => {

        const newUser = { 
            name: 'testuser2',
            email: 'hola@gmail.com', 
            password:'123456789'
        }

        const mockStore = getMockStore(notAuthenticatedState)
       
        const { result } = renderHook( () => useAuthStore() ,{
            wrapper: ({ children }) => {
                return <Provider store={ mockStore }>{ children }</Provider>
            }  
        })

        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: '6450aab947384816620ba722',
                name: 'Test User',
                token: 'TokenDePruebaeyJhb-cnqTpJLXBkpFqH25vtxmP9d8UI'
            }
        })

        await act(async()=>{
            await result.current.startRegister(newUser)
        })

        const { status, user, errorMessage } = result.current

        expect({ status, user, errorMessage } ).toEqual({
            status: 'authenticated',
            user: { name: 'Test User', uid: '6450aab947384816620ba722' },
            errorMessage: undefined
        })

        spy.mockRestore()
    })



    test('startRegister debe de fallar la creación', async() => {


        const mockStore = getMockStore(notAuthenticatedState)
       
        const { result } = renderHook( () => useAuthStore() ,{
            wrapper: ({ children }) => {
                return <Provider store={ mockStore }>{ children }</Provider>
            }  
        })

        await act(async()=>{
            await result.current.startRegister(testUserCredentials)
        })

        const { status, user, errorMessage } = result.current

        expect({ status, user, errorMessage } ).toEqual({
            status: authStatus.notAuthenticated,
            user: {},
            errorMessage: 'Ya existe un usuario registrado con ese correo'
        })

        await waitFor(
            ()=> expect( result.current.errorMessage ).toBe(undefined)
        )
    })


    test('checkAuthToken debe de fallar si no hay un token ', async() => {

        const mockStore = getMockStore(initialState)

        const { result } = renderHook( () => useAuthStore() ,{
            wrapper: ({ children }) => {
                return <Provider store={ mockStore }>{ children }</Provider>
            }  
        })

        await act(async()=>{
            await result.current.checkAuthToken()
        })

        const { status, user, errorMessage } = result.current

        expect({ status, user, errorMessage }).toEqual({
            status: authStatus.notAuthenticated,
            user: {},
            errorMessage: undefined
        })

    })

    test('checkAuthToken autenticar correctamente si hay un token', async() => {

        const { data } = await calendarApi.post('/auth', testUserCredentials)
        localStorage.setItem('calendarapp-token', data.token)
        localStorage.setItem('calendarapp-token-init-date', new Date().getTime())

        const mockStore = getMockStore(initialState)

        const { result } = renderHook( () => useAuthStore() ,{
            wrapper: ({ children }) => {
                return <Provider store={ mockStore }>{ children }</Provider>
            }  
        })

        await act(async()=>{
            await result.current.checkAuthToken()
        })

        const { status, user, errorMessage } = result.current

        expect({ status, user, errorMessage }).toEqual({
            status: authStatus.authenticated,
            user: { 
                name: testUserCredentials.name, 
                uid: testUserCredentials.uid
            },
            errorMessage: undefined
        })

    })


    test('startLogout debe de limpiar el estado y hacer el logout', async() => {

        


        const mockStore = getMockStore(authenticatedState)

        const { result } = renderHook( () => useAuthStore() ,{
            wrapper: ({ children }) => {
                return <Provider store={ mockStore }>{ children }</Provider>
            }  
        })

        act(()=>{
            result.current.startLogout()
        })

        const { status, user, errorMessage } = result.current

        expect({status, user, errorMessage}).toEqual({ 
            status: authStatus.notAuthenticated,
            user: {},
            errorMessage: undefined 
        })
        
        expect(localStorage.getItem('calendarapp-token')).toBe(null)

    })
})