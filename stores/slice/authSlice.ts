import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    role?: string; //for demo only
}

export type AuthState = {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: () => {
        return initialState;
    },
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
