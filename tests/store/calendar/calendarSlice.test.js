import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarState"

describe('Pruebas en calendarSlice', () => {


    test('Debe de regresar el estado por defecto', () => {

        const state = calendarSlice.getInitialState()

        expect(state).toEqual(initialState)
    })


    test('onSetActiveEvent debe de activar el evento', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventsState, onSetActiveEvent(events[0]))

        expect(state.activeEvent).toEqual(events[0])

    })


    test('Debe de agregar el evento', () => {

        const newEvent = {
            id: 'ABC',
            start: new Date('2022-06-15 13:00:00'),
            end: new Date('2022-06-15 15:00:00'),
            title: 'Dia de películas',
            notes: 'Comprar comida chatarra',
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))

        expect(state.events).toEqual([...events, newEvent])
    })



    test('Debe de actualizar el evento', () => {

        const updatedEvent = {
            id: '1',
            start: new Date('2022-06-15 13:00:00'),
            end: new Date('2022-06-15 15:00:00'),
            title: 'Jueves pozolero',
            notes: 'Comprar posole y muchos aguacates',
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent))

        expect(state.events).toContain(updatedEvent)
    })


    test('Debe de borrar el evento activo', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventsState, onDeleteEvent())

        expect(state.activeEvent).toBe(null)
        expect(state.events).not.toContain(events[0])
    })



    test('onLoadEvents debe de establecer los eventos', () => {

        const state = calendarSlice.reducer(initialState, onLoadEvents(events))
        expect(state.isLoadingEvents).toBeFalsy()
        expect(state.events).toEqual(events)

        // Verificar que no se dupliquen
        const newState = calendarSlice.reducer(initialState, onLoadEvents(events))
        expect( newState.events.length ).toBe(events.length)
    })



    test('onLogoutCalendar bebe de limpiar el estado', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventsState, onLogoutCalendar())

        expect(state).toEqual(initialState)
    })


})