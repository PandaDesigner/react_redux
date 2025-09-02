import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux.hooks';
import { 
    getPokemon, 
    goToNextPage, 
    goToPreviousPage, 
    resetToFirstPage 
} from '../actions/pokemon.thunk';
import {
    selectPokemonState,
    selectPokemonList,
    selectPokemonPage,
    selectPokemonLoading,
    selectPokemonError,
    clearError,
    resetPokemon
} from '../actions/pokemon.slice';
import { PokemonService } from '../core/pokemon.service';
import { Pokemon } from '../types/pokemon.types';

// Instancia del servicio para validaciones locales
const pokemonService = new PokemonService();

/**
 * Hook personalizado para el feature Pokemon
 * Actúa como puente entre los componentes UI y las acciones Redux
 */
export const usePokemon = () => {
    const dispatch = useAppDispatch();
    
    // Selectores
    const pokemonState = useAppSelector(selectPokemonState);
    const pokemonList = useAppSelector(selectPokemonList);
    const currentPage = useAppSelector(selectPokemonPage);
    const isLoading = useAppSelector(selectPokemonLoading);
    const error = useAppSelector(selectPokemonError);

    // Acciones
    const fetchPokemonPage = useCallback((page: number) => {
        if (pokemonService.validatePage(page)) {
            dispatch(getPokemon(page));
        }
    }, [dispatch]);

    const handleLoadMore = useCallback(() => {
        dispatch(goToNextPage(currentPage));
    }, [dispatch, currentPage]);

    const handlePrevious = useCallback(() => {
        if (pokemonService.canGoPrevious(currentPage)) {
            dispatch(goToPreviousPage(currentPage));
        }
    }, [dispatch, currentPage]);

    const handleReset = useCallback(() => {
        dispatch(resetToFirstPage());
    }, [dispatch]);

    const handleClearError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleResetState = useCallback(() => {
        dispatch(resetPokemon());
    }, [dispatch]);

    // Funciones de utilidad
    const canGoPrevious = useCallback(() => {
        return pokemonService.canGoPrevious(currentPage);
    }, [currentPage]);

    const getNextPageNumber = useCallback(() => {
        return pokemonService.getNextPage(currentPage);
    }, [currentPage]);

    const getPreviousPageNumber = useCallback(() => {
        return pokemonService.getPreviousPage(currentPage);
    }, [currentPage]);

    const getPokemonStats = useCallback(() => {
        return pokemonService.getPokemonStats(pokemonList);
    }, [pokemonList]);

    // Estado derivado
    const hasError = error !== null;
    const hasPokemon = pokemonList.length > 0;
    const isEmpty = !isLoading && !hasError && !hasPokemon;

    return {
        // Estado
        pokemonState,
        pokemonList,
        currentPage,
        isLoading,
        error,
        hasError,
        hasPokemon,
        isEmpty,
        
        // Acciones
        fetchPokemonPage,
        handleLoadMore,
        handlePrevious,
        handleReset,
        handleClearError,
        handleResetState,
        
        // Utilidades
        canGoPrevious,
        getNextPageNumber,
        getPreviousPageNumber,
        getPokemonStats
    };
};

/**
 * Hook para obtener información específica de un Pokemon
 */
export const usePokemonEntity = (pokemon: Pokemon) => {
    const pokemonEntity = pokemonService.processPokemonList([pokemon])[0];
    
    return {
        displayName: pokemonEntity ? new (require('../core/pokemon.entity').PokemonEntity)(pokemonEntity).getDisplayName() : '',
        imageUrl: pokemonEntity ? new (require('../core/pokemon.entity').PokemonEntity)(pokemonEntity).getImageUrl() : '',
        id: pokemonEntity ? new (require('../core/pokemon.entity').PokemonEntity)(pokemonEntity).getId() : 0,
        isValid: pokemonEntity ? new (require('../core/pokemon.entity').PokemonEntity)(pokemonEntity).isValid() : false
    };
};