import { createSlice } from '@reduxjs/toolkit';

export const authStatus = {
    checking: 'checking',
    notAuthenticated: 'not-authenticated',
    authenticated: 'authenticated'
}


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: authStatus.checking,
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onChecking: (state, /* action */) => {
            state.status = authStatus.checking
            state.user = {}
            state.errorMessage = undefined
        },
        onLogin: (state, { payload }) => {
            state.status = authStatus.authenticated
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout: (state, { payload }) => {
            state.status = authStatus.notAuthenticated
            state.user = {}
            state.errorMessage = payload
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined
        }
    }
});



export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;