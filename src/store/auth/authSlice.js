import { createSlice } from '@reduxjs/toolkit';

/**
 * payload: is a non-official, community accepted naming convention for the
 *          property that holds the actual data in a Redux action object.
 *          payload: {user: "Test User", age: 25}
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // checking, not-authenticated, authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated'; 
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated'; 
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = "checking";
        },
    }
});


export const { login, logout, checkingCredentials } = authSlice.actions;