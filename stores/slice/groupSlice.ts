import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TelegramGroup {
    id: number;
    chatId: string;
    chatTitle: string;
    chatType: number;
    avatar?: string;
    userId: string;
    isAdmin: boolean;
    isSuperGroup: boolean;
    createdDate: string;      // ISO date string
    createdUser?: string;
    updatedDate: string;      // ISO date string
    updatedUser?: string;
    deletedDate?: string;
    deletedUser?: string;
}

type GroupState = {
    groups: TelegramGroup[]
}

const initialState: GroupState = {
    groups: []
}

export const groupSlice = createSlice({
    name: 'group',
    initialState: () => {
        return initialState
    },
    reducers: {
        setGroups: (state, action: PayloadAction<TelegramGroup[]>) => {
            state.groups = action.payload ?? []
        },
        clearGroups: (state) => {
            state.groups = []
        }
    }
})

export const { setGroups, clearGroups } = groupSlice.actions;
export default groupSlice.reducer;
