// Tipos específicos del dominio Pokemon

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

export interface PokemonApiResponse {
    results: Pokemon[];
    count: number;
    next: string | null;
    previous: string | null;
}

// Tipos para el servicio de dominio
export interface PokemonServiceInterface {
    fetchPokemonPage(page: number): Promise<FetchPokemonPayload>;
    validatePage(page: number): boolean;
}

// Tipos para el repositorio
export interface PokemonRepositoryInterface {
    getPokemonByPage(page: number): Promise<PokemonApiResponse>;
}