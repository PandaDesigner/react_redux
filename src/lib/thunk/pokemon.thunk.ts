import { failedPokemon, fetchPokemon, loadingPokemon } from '../reducers/pokemon.slice';
import { AppDispatch } from '../store/store';
import type { Pokemon } from '../reducers/pokemon.slice';

interface PokemonApiResponse {
    results: Pokemon[];
    count: number;
    next: string | null;
    previous: string | null;
}

export const getPokemon = (page = 0) => {
    return async (dispatch: AppDispatch) => {
        dispatch(loadingPokemon());
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?offset=${page * 10}&limit=10`
            );

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data: PokemonApiResponse = await response.json();

            dispatch(fetchPokemon({
                pokemonList: data.results,
                page: page + 1,
            }));
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Error desconocido al obtener Pokemon';
            dispatch(failedPokemon({ error: errorMessage }));
        }
    };
};