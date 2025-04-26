import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GroupState = {
    groups: number[]
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
        setGroups: (state, action: PayloadAction<number[] | null>) => {
            state.groups = action.payload ?? []
        },
        clearGroups: (state) => {
            state.groups = []
        }
    }
})

export const { setGroups, clearGroups } = groupSlice.actions;
export default groupSlice.reducer;
