import { configureStore } from '@reduxjs/toolkit';
import countReducer from '../reducers/contador-reducer';
import { counterSlice } from '../reducers/contador.slice';
import pokemonSlice from '../reducers/pokemon.slice';
// Remover esta importación
// import thunk from 'redux-thunk';

export const makeStore = () => {
    return configureStore({
        reducer: {
            //count: countReducer
            count: counterSlice.reducer,
            pokemon: pokemonSlice.reducer
        }
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
