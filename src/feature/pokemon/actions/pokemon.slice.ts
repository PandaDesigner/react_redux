import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonState, FetchPokemonPayload, ErrorPayload } from '../types/pokemon.types';

// Estado inicial
const initialState: PokemonState = {
    page: 0,
    pokemonList: [],
    isLoading: false,
    error: null
};

/**
 * Slice de Redux para el feature Pokemon
 * Maneja el estado de la aplicación relacionado con Pokemon
 */
export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        // Acción para iniciar la carga de Pokemon
        loadingPokemon: (state) => {
            state.isLoading = true;
            state.error = null;
        },

        // Acción para cuando se obtienen Pokemon exitosamente
        fetchPokemon: (state, action: PayloadAction<FetchPokemonPayload>) => {
            state.isLoading = false;
            state.pokemonList = action.payload.pokemonList;
            state.page = action.payload.page;
            state.error = null;
        },

        // Acción para cuando ocurre un error
        failedPokemon: (state, action: PayloadAction<ErrorPayload>) => {
            state.isLoading = false;
            state.error = action.payload.error;
        },

        // Acción para resetear el estado
        resetPokemon: (state) => {
            state.page = 0;
            state.pokemonList = [];
            state.isLoading = false;
            state.error = null;
        },

        // Acción para limpiar errores
        clearError: (state) => {
            state.error = null;
        },

        // Acción para ir a la página siguiente
        nextPage: (state) => {
            state.page = state.page + 1;
        },

        // Acción para ir a la página anterior
        previousPage: (state) => {
            if (state.page > 0) {
                state.page = state.page - 1;
            }
        },

        // Acción para ir a una página específica
        goToPage: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.page = action.payload;
            }
        }
    }
});

// Exportar las acciones
export const {
    loadingPokemon,
    fetchPokemon,
    failedPokemon,
    resetPokemon,
    clearError,
    nextPage,
    previousPage,
    goToPage
} = pokemonSlice.actions;

// Selectores
export const selectPokemonState = (state: { pokemon: PokemonState }) => state.pokemon;
export const selectPokemonList = (state: { pokemon: PokemonState }) => state.pokemon.pokemonList;
export const selectPokemonPage = (state: { pokemon: PokemonState }) => state.pokemon.page;
export const selectPokemonLoading = (state: { pokemon: PokemonState }) => state.pokemon.isLoading;
export const selectPokemonError = (state: { pokemon: PokemonState }) => state.pokemon.error;

// Exportar el reducer
export default pokemonSlice.reducer;