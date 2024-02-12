import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 1
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        increment: (state) => { state.value += 1 }
    }
})

export const { increment } = appSlice.actions;
export default appSlice.reducer;