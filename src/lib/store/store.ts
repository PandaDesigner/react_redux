import { configureStore } from '@reduxjs/toolkit';
import countReducer from '../reducers/contador-reducer';
import { counterSlice } from '../reducers/contador.slice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            //count: countReducer
            count: counterSlice.reducer
        }
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
