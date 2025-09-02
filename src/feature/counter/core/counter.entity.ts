import { CounterConfig, CounterOperation } from '../types/counter.types';

/**
 * Entidad de dominio Counter
 * Encapsula la lógica de negocio relacionada con el contador
 */
export class CounterEntity {
    private _value: number;
    private _step: number;
    private _maxValue?: number;
    private _minValue?: number;
    private _history: number[];
    private _enableHistory: boolean;

    constructor(config: CounterConfig = {}) {
        this._value = config.initialValue ?? 0;
        this._step = config.step ?? 1;
        this._maxValue = config.maxValue;
        this._minValue = config.minValue;
        this._enableHistory = config.enableHistory ?? false;
        this._history = this._enableHistory ? [this._value] : [];
    }

    // Getters
    get value(): number {
        return this._value;
    }

    get step(): number {
        return this._step;
    }

    get maxValue(): number | undefined {
        return this._maxValue;
    }

    get minValue(): number | undefined {
        return this._minValue;
    }

    get history(): readonly number[] {
        return [...this._history];
    }

    /**
     * Incrementa el valor del contador
     */
    increment(customStep?: number): CounterEntity {
        const stepToUse = customStep ?? this._step;
        const newValue = this._value + stepToUse;
        
        if (this._maxValue !== undefined && newValue > this._maxValue) {
            throw new Error(`El valor ${newValue} excede el máximo permitido ${this._maxValue}`);
        }

        return this._createNewInstance(newValue);
    }

    /**
     * Decrementa el valor del contador
     */
    decrement(customStep?: number): CounterEntity {
        const stepToUse = customStep ?? this._step;
        const newValue = this._value - stepToUse;
        
        if (this._minValue !== undefined && newValue < this._minValue) {
            throw new Error(`El valor ${newValue} es menor al mínimo permitido ${this._minValue}`);
        }

        return this._createNewInstance(newValue);
    }

    /**
     * Establece un valor específico
     */
    setValue(value: number): CounterEntity {
        if (!this.isValidValue(value)) {
            throw new Error(`El valor ${value} no es válido`);
        }

        return this._createNewInstance(value);
    }

    /**
     * Resetea el contador al valor inicial
     */
    reset(): CounterEntity {
        return this._createNewInstance(0);
    }

    /**
     * Cambia el step del contador
     */
    setStep(step: number): CounterEntity {
        if (step <= 0) {
            throw new Error('El step debe ser mayor a 0');
        }

        const newInstance = this._createNewInstance(this._value);
        newInstance._step = step;
        return newInstance;
    }

    /**
     * Valida si un valor está dentro de los límites
     */
    isValidValue(value: number): boolean {
        if (!Number.isFinite(value)) {
            return false;
        }

        if (this._maxValue !== undefined && value > this._maxValue) {
            return false;
        }

        if (this._minValue !== undefined && value < this._minValue) {
            return false;
        }

        return true;
    }

    /**
     * Verifica si se puede incrementar
     */
    canIncrement(customStep?: number): boolean {
        const stepToUse = customStep ?? this._step;
        const newValue = this._value + stepToUse;
        return this.isValidValue(newValue);
    }

    /**
     * Verifica si se puede decrementar
     */
    canDecrement(customStep?: number): boolean {
        const stepToUse = customStep ?? this._step;
        const newValue = this._value - stepToUse;
        return this.isValidValue(newValue);
    }

    /**
     * Verifica si está en el valor máximo
     */
    isAtMax(): boolean {
        return this._maxValue !== undefined && this._value === this._maxValue;
    }

    /**
     * Verifica si está en el valor mínimo
     */
    isAtMin(): boolean {
        return this._minValue !== undefined && this._value === this._minValue;
    }

    /**
     * Obtiene el porcentaje del valor actual respecto al rango
     */
    getPercentage(): number {
        if (this._maxValue === undefined || this._minValue === undefined) {
            return 0;
        }

        const range = this._maxValue - this._minValue;
        if (range === 0) return 100;

        return ((this._value - this._minValue) / range) * 100;
    }

    /**
     * Verifica si el valor es positivo
     */
    isPositive(): boolean {
        return this._value > 0;
    }

    /**
     * Verifica si el valor es negativo
     */
    isNegative(): boolean {
        return this._value < 0;
    }

    /**
     * Verifica si el valor es cero
     */
    isZero(): boolean {
        return this._value === 0;
    }

    /**
     * Obtiene el último valor del historial
     */
    getLastValue(): number | undefined {
        return this._history.length > 1 ? this._history[this._history.length - 2] : undefined;
    }

    /**
     * Crea una nueva instancia con un valor actualizado
     */
    private _createNewInstance(newValue: number): CounterEntity {
        const newInstance = new CounterEntity({
            initialValue: newValue,
            step: this._step,
            maxValue: this._maxValue,
            minValue: this._minValue,
            enableHistory: this._enableHistory
        });

        // Copiar historial si está habilitado
        if (this._enableHistory) {
            newInstance._history = [...this._history, newValue];
        }

        return newInstance;
    }

    /**
     * Convierte la entidad a objeto plano
     */
    toPlainObject() {
        return {
            value: this._value,
            step: this._step,
            maxValue: this._maxValue,
            minValue: this._minValue,
            history: [...this._history]
        };
    }

    /**
     * Crea una entidad desde un objeto plano
     */
    static fromPlainObject(data: any): CounterEntity {
        const entity = new CounterEntity({
            initialValue: data.value,
            step: data.step,
            maxValue: data.maxValue,
            minValue: data.minValue,
            enableHistory: data.history && data.history.length > 0
        });

        if (data.history) {
            entity._history = [...data.history];
        }

        return entity;
    }
}