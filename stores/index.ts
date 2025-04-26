import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './slice/pageSlice';
import authReducer from './slice/authSlice';
import groupReducer from './slice/groupSlice';

const store = configureStore({
    reducer: {
        page: pageReducer,
        auth: authReducer,
        groups: groupReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;
