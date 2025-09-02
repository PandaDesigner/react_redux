'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getPokemon } from '@/lib/thunk/pokemon.thunk';
import type { Pokemon } from '@/lib/reducers/pokemon.slice';

export default function PokemonComponents() {
    const { pokemonList, isLoading, error, page } = useAppSelector((state) => state.pokemon);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPokemon(0));
    }, [dispatch]);

    const handleLoadMore = () => {
        dispatch(getPokemon(page));
    };

    const handleReset = () => {
        dispatch(getPokemon(0));
    };

    if (isLoading && pokemonList.length === 0) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-lg">Cargando Pokemon...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center gap-4 p-8">
                <div className="text-red-500 text-lg">Error: {error}</div>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    aria-label="Reintentar carga de Pokemon"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-2xl font-bold text-center">Lista de Pokemon</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pokemonList.map((pokemon: Pokemon, index: number) => (
                    <div
                        key={`${pokemon.name}-${index}`}
                        className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
                    >
                        <h3 className="text-lg font-semibold capitalize">
                            {pokemon.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                            URL: {pokemon.url}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    aria-label="Cargar más Pokemon"
                >
                    {isLoading ? 'Cargando...' : 'Cargar Más'}
                </button>

                <button
                    onClick={handleReset}
                    disabled={isLoading}
                    className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    aria-label="Resetear lista de Pokemon"
                >
                    Resetear
                </button>
            </div>

            <div className="text-center text-sm text-gray-600">
                Página actual: {page} | Pokemon cargados: {pokemonList.length}
            </div>
        </div>
    );
}
