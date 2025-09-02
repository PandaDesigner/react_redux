'use client';

import React, { useEffect } from 'react';
import { usePokemon, usePokemonEntity } from '../hooks/use-pokemon.hooks';
import { Pokemon } from '../types/pokemon.types';

/**
 * Componente individual de Pokemon
 */
interface PokemonItemProps {
    pokemon: Pokemon;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
    const { displayName, imageUrl, id, isValid } = usePokemonEntity(pokemon);

    if (!isValid) {
        return null;
    }

    return (
        <div className="border border-gray-300 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <img 
                src={imageUrl} 
                alt={displayName}
                className="w-20 h-20 mx-auto mb-2"
                loading="lazy"
            />
            <h3 className="text-lg font-semibold text-gray-800">{displayName}</h3>
            <p className="text-sm text-gray-600">ID: {id}</p>
        </div>
    );
};

/**
 * Componente de lista de Pokemon
 */
interface PokemonListProps {
    pokemonList: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonList }) => {
    if (pokemonList.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">No hay Pokemon para mostrar</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {pokemonList.map((pokemon) => (
                <PokemonItem key={pokemon.name} pokemon={pokemon} />
            ))}
        </div>
    );
};

/**
 * Componente de controles de navegación
 */
interface PokemonControlsProps {
    currentPage: number;
    canGoPrevious: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
    onPrevious: () => void;
    onReset: () => void;
}

const PokemonControls: React.FC<PokemonControlsProps> = ({
    currentPage,
    canGoPrevious,
    isLoading,
    onLoadMore,
    onPrevious,
    onReset
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex gap-2">
                <button
                    onClick={onPrevious}
                    disabled={!canGoPrevious || isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Anterior
                </button>
                
                <button
                    onClick={onLoadMore}
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Cargando...' : 'Cargar Más'}
                </button>
                
                <button
                    onClick={onReset}
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Reiniciar
                </button>
            </div>
            
            <div className="text-sm text-gray-600">
                Página: {currentPage + 1}
            </div>
        </div>
    );
};

/**
 * Componente de manejo de errores
 */
interface ErrorDisplayProps {
    error: string;
    onClearError: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onClearError }) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <div className="flex justify-between items-center">
                <span>{error}</span>
                <button
                    onClick={onClearError}
                    className="text-red-700 hover:text-red-900 font-bold"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

/**
 * Componente principal de Pokemon usando arquitectura hexagonal
 */
export const PokemonComponent: React.FC = () => {
    const {
        pokemonList,
        currentPage,
        isLoading,
        error,
        hasError,
        isEmpty,
        fetchPokemonPage,
        handleLoadMore,
        handlePrevious,
        handleReset,
        handleClearError,
        canGoPrevious,
        getPokemonStats
    } = usePokemon();

    // Cargar Pokemon inicial
    useEffect(() => {
        if (isEmpty && !isLoading) {
            fetchPokemonPage(0);
        }
    }, [isEmpty, isLoading, fetchPokemonPage]);

    const stats = getPokemonStats();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Explorador de Pokemon
                </h1>
                <p className="text-gray-600">
                    Descubre y explora el mundo Pokemon
                </p>
                {stats.total > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                        Mostrando {stats.validCount} Pokemon válidos de {stats.total} total
                    </p>
                )}
            </div>

            {hasError && (
                <ErrorDisplay 
                    error={error!} 
                    onClearError={handleClearError} 
                />
            )}

            {isLoading && pokemonList.length === 0 && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-gray-600">Cargando Pokemon...</p>
                </div>
            )}

            <PokemonList pokemonList={pokemonList} />

            {pokemonList.length > 0 && (
                <PokemonControls
                    currentPage={currentPage}
                    canGoPrevious={canGoPrevious()}
                    isLoading={isLoading}
                    onLoadMore={handleLoadMore}
                    onPrevious={handlePrevious}
                    onReset={handleReset}
                />
            )}
        </div>
    );
};

export default PokemonComponent;