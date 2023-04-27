import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Nabvar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../components"

import { localizer, getMessagesES } from '../../helpers'
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'






export const CalendarPage = () => {

    const [lastView, setLastView] = useState( localStorage.getItem('lastView-calendarapp') || 'month' )

    const { user } = useAuthStore()
    const { openDateModal } = useUiStore()
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()

    const eventStyleGetter = ( event, /* start, end, isSelected */ ) => {

        const isMyEvent = ( user.uid === event.user._id ) || (user.uid ===  event.user.uid )

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#a3a3a3',
            borderRadius: '0px',
            opacity: 0.8,
            color: '#FFF'
        }

        return {
            style
        }
    }


    const onDoudleClick = () => {
        openDateModal()
    }
    
    const onSelect = ( event ) => {
        setActiveEvent(event)
    }

    const onViewChanged = ( event ) => {
        
        localStorage.setItem('lastView-calendarapp', event)
        setLastView(event)
    }


    useEffect(()=>{
        startLoadingEvents()
    },[])

    return (
        <>
            <Nabvar />
            <Calendar
                culture='es'
                localizer={localizer}
                events={ events }
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={ getMessagesES() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoudleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />
            <CalendarModal />

            <FabAddNew />
            <FabDelete />
        </>
    )
}
