import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './../features/login/login.js';


export const store = configureStore({
    reducer: {
        loginStatus: loginReducer
    }
});