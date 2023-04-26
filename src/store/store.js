import { configureStore } from '@reduxjs/toolkit'


import { uiSlice } from './ui'
import { calendarSlice } from './calendar'
import { authSlice } from './auth'

export const store = configureStore({
    
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },
})