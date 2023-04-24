import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar"




export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector( state => state.calendar )


    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }



    const startSavingEvent = async( calendarEvent ) => {
        // TODO: Llegar al backend

        if( calendarEvent._id ){
            // Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) )
        } else {
            // Creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
        }
    }


    const startDeletingEvent = async() => {

        if( activeEvent === null ){ return }

        // TODO: Llegar al backend
        

        dispatch( onDeleteEvent() )
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
    }
}
