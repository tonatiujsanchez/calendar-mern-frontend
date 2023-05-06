

import { render, screen } from "@testing-library/react"

import { useAuthStore } from "../../src/hooks/useAuthStore"
import { authStatus } from "../../src/store/auth"
import { AppRouter } from "../../src/router/AppRouter"
import { MemoryRouter } from "react-router-dom"
import { CalendarPage } from "../../src/calendar/pages/CalendarPage"

jest.mock('../../src/hooks/useAuthStore')
jest.mock('../../src/calendar/pages/CalendarPage',()=>({
    CalendarPage: ()=> <h1>CalendarPage</h1>
}))


describe('Pruebas en AppRouter', () => {

    const mockCheckAuthToken = jest.fn()

    beforeEach(()=> jest.clearAllMocks() )



    test('Debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
        
        useAuthStore.mockReturnValue({
            status: authStatus.checking,
            checkAuthToken: mockCheckAuthToken
        })

        render( <AppRouter /> )

        expect( screen.getByText('Cargando...') ).toBeTruthy()
        expect( mockCheckAuthToken ).toHaveBeenCalled()
    })




    test('Debe de mostrar el login en caso de NO estar autenticado', () => {
        useAuthStore.mockReturnValue({
            status: authStatus.notAuthenticated,
            checkAuthToken: mockCheckAuthToken
        })

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )

        expect( screen.getByText('Ingreso') ).toBeTruthy()
        expect( container ).toMatchSnapshot()
    })
    



    test('Debe de mostrar el calendario SI estamos autenticados', () => {
        useAuthStore.mockReturnValue({
            status: authStatus.authenticated,
            checkAuthToken: mockCheckAuthToken
        })
        
        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )
        
        expect( screen.getByText('CalendarPage') ).toBeTruthy()
    })





})