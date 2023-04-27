import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar"
import { calendarApi } from "../apiCalendar"
import { convertEventsToDateEvents } from "../helpers"
import Swal from "sweetalert2"




export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector( state => state.calendar )
    const { user } = useSelector( state => state.auth )



    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }



    const startSavingEvent = async( calendarEvent ) => {

        try {
            
            if( calendarEvent.id ){
                // Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent )
                dispatch( onUpdateEvent({ ...calendarEvent, user }) )
                return
            } 
    
            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent )
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) )
        } catch (error) {
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }

        
    }



    const startDeletingEvent = async() => {

        if( activeEvent === null ){ return }

        try {
            await calendarApi.delete(`/events/${ activeEvent.id }` )
            dispatch( onDeleteEvent() )

        } catch (error) {
            Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }
        
    }

    const startLoadingEvents = async() => {
        try {
            
            const { data } = await calendarApi.get('/events')

            const events = convertEventsToDateEvents( data.eventos )
            dispatch( onLoadEvents( events ) )

        } catch (error) {
            console.log('Error al cargar los eventos');
            console.log(error);

        }
    }



    return {
        // properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}
