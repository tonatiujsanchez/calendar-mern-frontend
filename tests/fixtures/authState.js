import { authStatus } from "../../src/store/auth/authSlice";


export const initialState = {
    status: authStatus.checking,
    user: {},
    errorMessage: undefined
}

export const authenticatedState = {
    status: authStatus.authenticated,
    user: {
        uid: 'ABC',
        name:'Brandon'
    },
    errorMessage: undefined
}


export const notAuthenticatedState = {
    status: authStatus.notAuthenticated,
    user: {},
    errorMessage: undefined
}