import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0
};

export const counterSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        add: (state, action) => {
            state.count += action.payload;
        },
        remove: (state, action) => {
            if (state.count - action.payload < 0) {
                state.count = 0;
                return;
            }
            state.count -= action.payload;
        },
        reset: (state) => {
            state.count = 0;
        }
    }
})

export const { add, remove, reset } = counterSlice.actions;
export default counterSlice;
