import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../../feature/pokemon/actions/pokemon.slice';
import counterReducer from '../../feature/counter/actions/counter.slice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            pokemon: pokemonReducer,
            counter: counterReducer,
        }
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
