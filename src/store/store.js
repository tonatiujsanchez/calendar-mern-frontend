import { configureStore } from '@reduxjs/toolkit'


import { uiSlice } from './ui'
import { calendarSlice } from './calendar'

export const store = configureStore({
    
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },
})