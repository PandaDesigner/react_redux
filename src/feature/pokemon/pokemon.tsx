'use client';

import React from 'react';
import { PokemonComponent } from './components/pokemon.component';

/**
 * Punto de entrada principal del feature Pokemon
 * Siguiendo la arquitectura hexagonal
 */
export const Pokemon: React.FC = () => {
    return <PokemonComponent />;
};

export default Pokemon;

// Exportaciones públicas del feature
export { usePokemon, usePokemonEntity } from './hooks/use-pokemon.hooks';
export { PokemonComponent } from './components/pokemon.component';
export type { 
    Pokemon as PokemonType, 
    PokemonState, 
    FetchPokemonPayload,
    ErrorPayload,
    PokemonServiceInterface,
    PokemonRepositoryInterface 
} from './types/pokemon.types';
export { PokemonEntity } from './core/pokemon.entity';
export { PokemonService } from './core/pokemon.service';
export { PokemonRepository } from './repository/pokemon.repository';
export { 
    selectPokemonState,
    selectPokemonList,
    selectPokemonPage,
    selectPokemonLoading,
    selectPokemonError 
} from './actions/pokemon.slice';