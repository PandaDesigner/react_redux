// Tipos específicos del dominio Counter

export interface CounterState {
    value: number;
    step: number;
    history: number[];
    maxValue?: number;
    minValue?: number;
}

export interface CounterOperation {
    type: 'add' | 'subtract' | 'reset' | 'set';
    value: number;
    timestamp: Date;
}

export interface CounterConfig {
    initialValue?: number;
    step?: number;
    maxValue?: number;
    minValue?: number;
    enableHistory?: boolean;
}

// Tipos para el servicio de dominio
export interface CounterServiceInterface {
    add(currentValue: number, step?: number): number;
    subtract(currentValue: number, step?: number): number;
    reset(): number;
    setValue(value: number): number;
    validateValue(value: number): boolean;
    canIncrement(currentValue: number): boolean;
    canDecrement(currentValue: number): boolean;
}

// Tipos para operaciones del contador
export interface CounterActions {
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    setValue: (value: number) => void;
    setStep: (step: number) => void;
}

// Tipos para el estado derivado
export interface CounterDerivedState {
    isAtMax: boolean;
    isAtMin: boolean;
    canIncrement: boolean;
    canDecrement: boolean;
    percentage: number;
    isPositive: boolean;
    isNegative: boolean;
    isZero: boolean;
}