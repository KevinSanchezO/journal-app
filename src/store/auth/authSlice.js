import { createSlice } from '@reduxjs/toolkit';

/**
 * payload: is a non-official, community accepted naming convention for the
 *          property that holds the actual data in a Redux action object.
 *          payload: {user: "Test User", age: 25}
 * 
 * action: parameter received in a reducer
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // checking, not-authenticated, authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, action) => {

        },
        logout: (state, payload) => {

        },
        checkingCredentials: (state) => {
            state.status = "checking";
        },
    }
});


export const { login, logout, checkingCredentials } = authSlice.actions;