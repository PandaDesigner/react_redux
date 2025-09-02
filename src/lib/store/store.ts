import { configureStore } from '@reduxjs/toolkit';
import countReducer from '../reducers/contador-reducer';

export const makeStore = () => {
    return configureStore({
        reducer: {
            count: countReducer
        }
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
