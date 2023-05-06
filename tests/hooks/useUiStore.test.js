import { act, renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { uiSlice } from "../../src/store/ui"


const getMockStore = ( initialState )=> {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Pruebas en useUiStore', () => {

    test('Debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({
            isDateModalOpen: false
        })

        const { result } = renderHook( ()=> useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })
        
        expect( result.current ).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any( Function ),
            closeDateModal: expect.any( Function ),
            toggleDateModal: expect.any( Function ),
        })
    })

    test('openDateModal de de cambiar a "true" el isDateModalOpen', () => {

        const mockStore = getMockStore({
            isDateModalOpen: false
        })

        const { result } = renderHook( ()=> useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        const {  openDateModal } = result.current

        // Este es 'false' por que se extrajo antes de ejecutarse la funcion que lo cambia
        // const { isDateModalOpen } = result.current

        act(()=> {
            openDateModal()
        })

        // Este es 'true' por que se extrajo despues de ejecutarse la funcion que lo cambia
        const { isDateModalOpen } = result.current


        expect(result.current.isDateModalOpen).toBeTruthy()
        expect(isDateModalOpen).toBeTruthy()

    })

    test('closeDateModal dede cambiar isDateModalOpen a false', () => {

        const mockStore = getMockStore({
            isDateModalOpen: true
        })

        const { result } = renderHook( ()=> useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        const { closeDateModal } = result.current

        act(()=> {
            closeDateModal()
        })

        expect( result.current.isDateModalOpen ).toBeFalsy()
    })


    test('toggleDateModal debe de cambiar el isDateModalOpen', () => {

        const mockStore = getMockStore({
            isDateModalOpen: true
        })

        const { result } = renderHook( ()=> useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })
    

        act(()=> {
            result.current.toggleDateModal()
        })

        expect( result.current.isDateModalOpen ).toBeFalsy()


        act(()=> {
            result.current.toggleDateModal()
        })
        
        expect( result.current.isDateModalOpen ).toBeTruthy()
    })

})