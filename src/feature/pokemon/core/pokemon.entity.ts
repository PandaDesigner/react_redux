import { Pokemon } from '../types/pokemon.types';

/**
 * Entidad de dominio Pokemon
 * Encapsula la lógica de negocio relacionada con un Pokemon individual
 */
export class PokemonEntity {
    private readonly _name: string;
    private readonly _url: string;

    constructor(pokemon: Pokemon) {
        this._name = pokemon.name;
        this._url = pokemon.url;
    }

    get name(): string {
        return this._name;
    }

    get url(): string {
        return this._url;
    }

    /**
     * Obtiene el nombre formateado para mostrar
     */
    getDisplayName(): string {
        return this._name.charAt(0).toUpperCase() + this._name.slice(1);
    }

    /**
     * Extrae el ID del Pokemon desde la URL
     */
    getId(): number {
        const matches = this._url.match(/\/pokemon\/(\d+)\//); 
        return matches ? parseInt(matches[1], 10) : 0;
    }

    /**
     * Genera la URL de la imagen del Pokemon
     */
    getImageUrl(): string {
        const id = this.getId();
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }

    /**
     * Valida si el Pokemon es válido
     */
    isValid(): boolean {
        return this._name.length > 0 && this._url.length > 0 && this.getId() > 0;
    }

    /**
     * Convierte la entidad a objeto plano
     */
    toPlainObject(): Pokemon {
        return {
            name: this._name,
            url: this._url
        };
    }

    /**
     * Crea una entidad desde un objeto plano
     */
    static fromPlainObject(pokemon: Pokemon): PokemonEntity {
        return new PokemonEntity(pokemon);
    }
}