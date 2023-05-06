

export const events = [
    {
        id: '1',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        title: 'Cumpleaños',
        notes: 'Hay que comprar el pastel',
    },
    {
        id: '2',
        start: new Date('2022-05-10 14:00:00'),
        end: new Date('2022-05-10 16:00:00'),
        title: 'Dia de las Madres',
        notes: 'Hay que comprar el pastel',
    },
]



export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}


export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}


export const calendarWithActiveEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] }
}