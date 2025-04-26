import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    email: string;
    password: string;
    role: string; // for demo only
}

export type AuthState = {
    user: User | null;
    rememberMe: boolean;
}

const initialState: AuthState = {
    user: null,
    rememberMe: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: () => {
        return initialState;
    },
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setRememberMe: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload;
        }
    }
})

export const { setUser, setRememberMe } = authSlice.actions;
export default authSlice.reducer;
