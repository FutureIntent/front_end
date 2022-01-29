import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    admin: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        status: (state, action) => {
            state.loggedIn = action.payload
        },
        adminStatus: (state, action) => {
            state.admin = action.payload
        }
    }
});

export const { status,adminStatus } = loginSlice.actions;

export default loginSlice.reducer;