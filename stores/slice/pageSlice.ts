import { createSlice } from '@reduxjs/toolkit';

type PageState = {
    isLoading: boolean
}

const initialState: PageState = {
    isLoading: false
}

export const pageSlice = createSlice({
    name: 'page',
    initialState: () => {
        return initialState
    },
    reducers: {
        showLoading: (state) => {
            state.isLoading = true
        },
        hideLoading: (state) => {
            state.isLoading = false
        }
    }
})

export const { showLoading, hideLoading } = pageSlice.actions;
export default pageSlice.reducer;
