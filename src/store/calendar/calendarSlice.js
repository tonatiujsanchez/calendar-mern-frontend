import { createSlice } from '@reduxjs/toolkit';

// import { addHours } from 'date-fns';


// const tempEvent = {
//         id : new Date().getTime(),
//         title: 'Cumpleaños',
//         notes: 'Hay que comprar el pastel',
//         start: new Date(),
//         end: addHours( new Date(), 2 ),
//         bgColor: '#FAFAFA',
//         user: {
//             _id: '123',
//             name: 'Ton J.'
//         }
//     }


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            // tempEvent,
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },
        onAddNewEvent: ( state, { payload } ) => {
            state.events.push( payload )
            state.activeEvent = null
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => event.id === payload.id ? payload : event )
            state.activeEvent = null
        },
        onDeleteEvent: ( state ) => {
            state.events = state.events.filter( event => event.id !== state.activeEvent.id )
            state.activeEvent = null
        },
        onLoadEvents: ( state, { payload = [] } ) => {
            
            payload.forEach(event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id  )

                if(!exists) {
                    state.events.push( event )
                }
            });

            state.isLoadingEvents = false
        },
        onLogoutCalendar: ( state ) => {
            state.isLoadingEvents = true
            state.events = []
            state.activeEvent = null
        }
    }
});



export const { 
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar 
} = calendarSlice.actions;