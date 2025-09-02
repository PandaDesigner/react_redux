import { PokemonApiResponse, PokemonRepositoryInterface } from '../types/pokemon.types';

/**
 * Repositorio para el acceso a datos de Pokemon
 * Implementa la interfaz del puerto de salida para datos
 */
export class PokemonRepository implements PokemonRepositoryInterface {
    private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';
    private readonly itemsPerPage = 10;

    /**
     * Obtiene una página de Pokemon desde la API externa
     */
    async getPokemonByPage(page: number): Promise<PokemonApiResponse> {
        const offset = page * this.itemsPerPage;
        const url = `${this.baseUrl}?offset=${offset}&limit=${this.itemsPerPage}`;

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }

            const data: PokemonApiResponse = await response.json();
            
            // Validar que la respuesta tenga la estructura esperada
            if (!data.results || !Array.isArray(data.results)) {
                throw new Error('Respuesta de API inválida: falta el array de resultados');
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al obtener Pokemon: ${error.message}`);
            }
            throw new Error('Error desconocido al obtener Pokemon');
        }
    }

    /**
     * Obtiene información detallada de un Pokemon específico
     */
    async getPokemonDetails(pokemonUrl: string): Promise<any> {
        try {
            const response = await fetch(pokemonUrl);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al obtener detalles del Pokemon: ${error.message}`);
            }
            throw new Error('Error desconocido al obtener detalles del Pokemon');
        }
    }

    /**
     * Verifica si la API está disponible
     */
    async checkApiHealth(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}?limit=1`);
            return response.ok;
        } catch {
            return false;
        }
    }
}