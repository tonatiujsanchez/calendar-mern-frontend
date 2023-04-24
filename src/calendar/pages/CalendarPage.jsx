import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Nabvar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../components"

import { localizer, getMessagesES } from '../../helpers'
import { useUiStore, useCalendarStore } from '../../hooks'






export const CalendarPage = () => {

    const [lastView, setLastView] = useState( localStorage.getItem('lastView-calendarapp') || 'month' )

    const { openDateModal } = useUiStore()
    const { events, setActiveEvent } = useCalendarStore()

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: '#FFF'
        }

        return {
            style
        }
    }


    const onDoudleClick = ( event ) => {
        openDateModal()
    }
    
    const onSelect = ( event ) => {
        console.log({ click: event });
        setActiveEvent(event)
    }

    const onViewChanged = ( event ) => {
        
        localStorage.setItem('lastView-calendarapp', event)
        setLastView(event)
    }

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
