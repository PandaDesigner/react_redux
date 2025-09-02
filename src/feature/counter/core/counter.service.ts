import { CounterEntity } from './counter.entity';
import { 
    CounterServiceInterface, 
    CounterConfig, 
    CounterOperation,
    CounterDerivedState 
} from '../types/counter.types';

/**
 * Servicio de dominio para Counter
 * Contiene la lógica de negocio pura del feature
 */
export class CounterService implements CounterServiceInterface {
    private config: CounterConfig;

    constructor(config: CounterConfig = {}) {
        this.config = {
            initialValue: 0,
            step: 1,
            maxValue: undefined,
            minValue: undefined,
            enableHistory: false,
            ...config
        };
    }

    /**
     * Crea una nueva instancia del contador
     */
    createCounter(customConfig?: CounterConfig): CounterEntity {
        const finalConfig = { ...this.config, ...customConfig };
        return new CounterEntity(finalConfig);
    }

    /**
     * Suma un valor al contador actual
     */
    add(currentValue: number, step?: number): number {
        const counter = new CounterEntity({ 
            initialValue: currentValue, 
            step: step ?? this.config.step,
            maxValue: this.config.maxValue,
            minValue: this.config.minValue
        });

        try {
            const newCounter = counter.increment(step);
            return newCounter.value;
        } catch (error) {
            throw new Error(`No se puede incrementar: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }

    /**
     * Resta un valor al contador actual
     */
    subtract(currentValue: number, step?: number): number {
        const counter = new CounterEntity({ 
            initialValue: currentValue, 
            step: step ?? this.config.step,
            maxValue: this.config.maxValue,
            minValue: this.config.minValue
        });

        try {
            const newCounter = counter.decrement(step);
            return newCounter.value;
        } catch (error) {
            throw new Error(`No se puede decrementar: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }

    /**
     * Resetea el contador
     */
    reset(): number {
        return this.config.initialValue ?? 0;
    }

    /**
     * Establece un valor específico
     */
    setValue(value: number): number {
        if (!this.validateValue(value)) {
            throw new Error(`El valor ${value} no es válido`);
        }
        return value;
    }

    /**
     * Valida si un valor es válido
     */
    validateValue(value: number): boolean {
        if (!Number.isFinite(value)) {
            return false;
        }

        if (this.config.maxValue !== undefined && value > this.config.maxValue) {
            return false;
        }

        if (this.config.minValue !== undefined && value < this.config.minValue) {
            return false;
        }

        return true;
    }

    /**
     * Verifica si se puede incrementar
     */
    canIncrement(currentValue: number, step?: number): boolean {
        const counter = new CounterEntity({ 
            initialValue: currentValue,
            step: step ?? this.config.step,
            maxValue: this.config.maxValue,
            minValue: this.config.minValue
        });
        
        return counter.canIncrement(step);
    }

    /**
     * Verifica si se puede decrementar
     */
    canDecrement(currentValue: number, step?: number): boolean {
        const counter = new CounterEntity({ 
            initialValue: currentValue,
            step: step ?? this.config.step,
            maxValue: this.config.maxValue,
            minValue: this.config.minValue
        });
        
        return counter.canDecrement(step);
    }

    /**
     * Obtiene el estado derivado del contador
     */
    getDerivedState(currentValue: number): CounterDerivedState {
        const counter = new CounterEntity({ 
            initialValue: currentValue,
            step: this.config.step,
            maxValue: this.config.maxValue,
            minValue: this.config.minValue
        });

        return {
            isAtMax: counter.isAtMax(),
            isAtMin: counter.isAtMin(),
            canIncrement: counter.canIncrement(),
            canDecrement: counter.canDecrement(),
            percentage: counter.getPercentage(),
            isPositive: counter.isPositive(),
            isNegative: counter.isNegative(),
            isZero: counter.isZero()
        };
    }

    /**
     * Valida una operación antes de ejecutarla
     */
    validateOperation(currentValue: number, operation: CounterOperation): boolean {
        switch (operation.type) {
            case 'add':
                return this.canIncrement(currentValue, operation.value);
            case 'subtract':
                return this.canDecrement(currentValue, operation.value);
            case 'set':
                return this.validateValue(operation.value);
            case 'reset':
                return true;
            default:
                return false;
        }
    }

    /**
     * Ejecuta una operación en el contador
     */
    executeOperation(currentValue: number, operation: CounterOperation): number {
        if (!this.validateOperation(currentValue, operation)) {
            throw new Error(`Operación ${operation.type} no válida`);
        }

        switch (operation.type) {
            case 'add':
                return this.add(currentValue, operation.value);
            case 'subtract':
                return this.subtract(currentValue, operation.value);
            case 'set':
                return this.setValue(operation.value);
            case 'reset':
                return this.reset();
            default:
                throw new Error(`Tipo de operación desconocido: ${operation.type}`);
        }
    }

    /**
     * Obtiene el siguiente valor válido para incrementar
     */
    getNextValidIncrement(currentValue: number): number | null {
        let step = this.config.step ?? 1;
        
        while (step > 0) {
            if (this.canIncrement(currentValue, step)) {
                return currentValue + step;
            }
            step--;
        }
        
        return null;
    }

    /**
     * Obtiene el siguiente valor válido para decrementar
     */
    getNextValidDecrement(currentValue: number): number | null {
        let step = this.config.step ?? 1;
        
        while (step > 0) {
            if (this.canDecrement(currentValue, step)) {
                return currentValue - step;
            }
            step--;
        }
        
        return null;
    }

    /**
     * Calcula estadísticas del contador
     */
    getCounterStats(currentValue: number) {
        const derivedState = this.getDerivedState(currentValue);
        
        return {
            currentValue,
            step: this.config.step ?? 1,
            maxValue: this.config.maxValue,
            minValue: this.config.minValue,
            ...derivedState,
            distanceToMax: this.config.maxValue !== undefined ? this.config.maxValue - currentValue : null,
            distanceToMin: this.config.minValue !== undefined ? currentValue - this.config.minValue : null
        };
    }
}