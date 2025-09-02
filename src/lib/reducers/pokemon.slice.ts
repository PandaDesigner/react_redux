import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces para tipado
export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonState {
    page: number;
    pokemonList: Pokemon[];
    isLoading: boolean;
    error: string | null;
}

export interface FetchPokemonPayload {
    pokemonList: Pokemon[];
    page: number;
}

export interface ErrorPayload {
    error: string;
}

const initialState: PokemonState = {
    page: 0,
    pokemonList: [],
    isLoading: false,
    error: null
};

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        loadingPokemon: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchPokemon: (state, action: PayloadAction<FetchPokemonPayload>) => {
            state.isLoading = false;
            state.page = action.payload.page;
            state.pokemonList = action.payload.pokemonList;
            state.error = null;
        },
        failedPokemon: (state, action: PayloadAction<ErrorPayload>) => {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
});

export const { loadingPokemon, fetchPokemon, failedPokemon } = pokemonSlice.actions;
export default pokemonSlice;