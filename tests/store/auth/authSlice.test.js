import { authSlice, authStatus, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../fixtures/authState"
import { testUserCredentials } from "../../fixtures/testUser"


describe('Pruebas en authSlice', () => {


    test('Debe de regresar el estado inicial ', () => {
        expect( authSlice.getInitialState() ).toEqual( initialState )
    })


    test('Debe de realizar un Login', () => {
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) )

        expect( state ).toEqual({
            status: authStatus.authenticated,
            user: testUserCredentials,
            errorMessage: undefined
        })
    })

    test('Debe de realizar el Logout', () => {

        const state = authSlice.reducer( authenticatedState, onLogout() )

        expect( state ).toEqual({
            status: authStatus.notAuthenticated,
            user: {},
            errorMessage: undefined
        })

    })

    test('Debe de realizar el Logout con un mensaje', () => {

        const errorMessage = 'Credenciales no válidas'

        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) )

        expect( state ).toEqual({
            status: authStatus.notAuthenticated,
            user: {},
            errorMessage: errorMessage
        })

    })

    test('Debe de limpiar el mensaje de error', () => {

        const errorMessage = 'Credenciales no válidas'

        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) )
        const newState = authSlice.reducer( state, clearErrorMessage() )

        expect( newState.errorMessage ).toBe( undefined )

    })


    test('Debe de realizar el Checking', () => {

        const state = authSlice.reducer( authenticatedState, onChecking() )

        expect( state ).toEqual( initialState )

    })

})