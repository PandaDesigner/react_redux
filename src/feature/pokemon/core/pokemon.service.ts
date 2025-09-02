import { PokemonEntity } from './pokemon.entity';
import { PokemonRepository } from '../repository/pokemon.repository';
import { 
    FetchPokemonPayload, 
    PokemonServiceInterface,
    Pokemon 
} from '../types/pokemon.types';

/**
 * Servicio de dominio para Pokemon
 * Contiene la lógica de negocio pura del feature
 */
export class PokemonService implements PokemonServiceInterface {
    private repository: PokemonRepository;

    constructor(repository?: PokemonRepository) {
        this.repository = repository || new PokemonRepository();
    }

    /**
     * Valida si una página es válida
     */
    validatePage(page: number): boolean {
        return page >= 0 && Number.isInteger(page);
    }

    /**
     * Obtiene una página de Pokemon aplicando lógica de negocio
     */
    async fetchPokemonPage(page: number): Promise<FetchPokemonPayload> {
        // Validación de entrada
        if (!this.validatePage(page)) {
            throw new Error('Número de página inválido. Debe ser un entero mayor o igual a 0.');
        }

        try {
            // Obtener datos del repositorio
            const apiResponse = await this.repository.getPokemonByPage(page);
            
            // Aplicar lógica de negocio: convertir a entidades y validar
            const pokemonEntities = apiResponse.results
                .map(pokemon => PokemonEntity.fromPlainObject(pokemon))
                .filter(entity => entity.isValid());

            // Convertir de vuelta a objetos planos para el estado
            const validPokemonList: Pokemon[] = pokemonEntities
                .map(entity => entity.toPlainObject());

            // Validar que tengamos al menos algunos Pokemon válidos
            if (validPokemonList.length === 0) {
                throw new Error('No se encontraron Pokemon válidos en esta página.');
            }

            return {
                pokemonList: validPokemonList,
                page: page
            };
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error en el servicio Pokemon: ${error.message}`);
            }
            throw new Error('Error desconocido en el servicio Pokemon');
        }
    }

    /**
     * Obtiene el siguiente número de página válido
     */
    getNextPage(currentPage: number): number {
        return Math.max(0, currentPage + 1);
    }

    /**
     * Obtiene el número de página anterior válido
     */
    getPreviousPage(currentPage: number): number {
        return Math.max(0, currentPage - 1);
    }

    /**
     * Resetea a la primera página
     */
    getFirstPage(): number {
        return 0;
    }

    /**
     * Valida si se puede ir a la página anterior
     */
    canGoPrevious(currentPage: number): boolean {
        return currentPage > 0;
    }

    /**
     * Procesa una lista de Pokemon aplicando reglas de negocio
     */
    processPokemonList(pokemonList: Pokemon[]): Pokemon[] {
        return pokemonList
            .map(pokemon => PokemonEntity.fromPlainObject(pokemon))
            .filter(entity => entity.isValid())
            .sort((a, b) => a.getId() - b.getId()) // Ordenar por ID
            .map(entity => entity.toPlainObject());
    }

    /**
     * Obtiene estadísticas de una lista de Pokemon
     */
    getPokemonStats(pokemonList: Pokemon[]): {
        total: number;
        validCount: number;
        invalidCount: number;
    } {
        const entities = pokemonList.map(pokemon => PokemonEntity.fromPlainObject(pokemon));
        const validEntities = entities.filter(entity => entity.isValid());
        
        return {
            total: entities.length,
            validCount: validEntities.length,
            invalidCount: entities.length - validEntities.length
        };
    }
}