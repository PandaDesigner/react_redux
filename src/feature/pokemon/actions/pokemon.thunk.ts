import { createAsyncThunk } from '@reduxjs/toolkit';
import { PokemonService } from '../core/pokemon.service';
import { FetchPokemonPayload } from '../types/pokemon.types';
import { loadingPokemon, fetchPokemon, failedPokemon } from './pokemon.slice';

// Instancia del servicio de dominio
const pokemonService = new PokemonService();

/**
 * Thunk asíncrono para obtener Pokemon
 * Actúa como adaptador entre Redux y el servicio de dominio
 */
export const getPokemon = createAsyncThunk<
    FetchPokemonPayload,
    number,
    {
        rejectValue: string;
    }
>(
    'pokemon/getPokemon',
    async (page: number, { dispatch, rejectWithValue }) => {
        try {
            // Dispatch de la acción de loading
            dispatch(loadingPokemon());

            // Llamar al servicio de dominio
            const result = await pokemonService.fetchPokemonPage(page);

            // Dispatch de la acción de éxito
            dispatch(fetchPokemon(result));

            return result;
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : 'Error desconocido al obtener Pokemon';

            // Dispatch de la acción de error
            dispatch(failedPokemon({ error: errorMessage }));

            return rejectWithValue(errorMessage);
        }
    }
);

/**
 * Thunk para ir a la página siguiente
 */
export const goToNextPage = createAsyncThunk<
    FetchPokemonPayload,
    number,
    {
        rejectValue: string;
    }
>(
    'pokemon/goToNextPage',
    async (currentPage: number, { dispatch, rejectWithValue }) => {
        try {
            const nextPage = pokemonService.getNextPage(currentPage);
            return await dispatch(getPokemon(nextPage)).unwrap();
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : 'Error al ir a la página siguiente';
            return rejectWithValue(errorMessage);
        }
    }
);

/**
 * Thunk para ir a la página anterior
 */
export const goToPreviousPage = createAsyncThunk<
    FetchPokemonPayload,
    number,
    {
        rejectValue: string;
    }
>(
    'pokemon/goToPreviousPage',
    async (currentPage: number, { dispatch, rejectWithValue }) => {
        try {
            if (!pokemonService.canGoPrevious(currentPage)) {
                return rejectWithValue('Ya estás en la primera página');
            }

            const previousPage = pokemonService.getPreviousPage(currentPage);
            return await dispatch(getPokemon(previousPage)).unwrap();
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : 'Error al ir a la página anterior';
            return rejectWithValue(errorMessage);
        }
    }
);

/**
 * Thunk para resetear a la primera página
 */
export const resetToFirstPage = createAsyncThunk<
    FetchPokemonPayload,
    void,
    {
        rejectValue: string;
    }
>(
    'pokemon/resetToFirstPage',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const firstPage = pokemonService.getFirstPage();
            return await dispatch(getPokemon(firstPage)).unwrap();
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : 'Error al resetear a la primera página';
            return rejectWithValue(errorMessage);
        }
    }
);