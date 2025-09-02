import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CounterState } from '../types/counter.types';

// Estado inicial
const initialState: CounterState = {
    value: 0,
    step: 1,
    history: []
};

/**
 * Slice de Redux para el feature Counter
 * Maneja el estado de la aplicación relacionado con el contador
 */
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // Acción para incrementar el contador
        add: (state, action: PayloadAction<number | undefined>) => {
            const increment = action.payload ?? state.step;
            const newValue = state.value + increment;
            
            // Validar límites si están definidos
            if (state.maxValue !== undefined && newValue > state.maxValue) {
                return; // No hacer nada si excede el máximo
            }
            
            state.history.push(state.value);
            state.value = newValue;
        },

        // Acción para decrementar el contador
        remove: (state, action: PayloadAction<number | undefined>) => {
            const decrement = action.payload ?? state.step;
            const newValue = state.value - decrement;
            
            // Validar límites si están definidos
            if (state.minValue !== undefined && newValue < state.minValue) {
                return; // No hacer nada si es menor al mínimo
            }
            
            state.history.push(state.value);
            state.value = newValue;
        },

        // Acción para resetear el contador
        reset: (state) => {
            state.history.push(state.value);
            state.value = 0;
        },

        // Acción para establecer un valor específico
        setValue: (state, action: PayloadAction<number>) => {
            const newValue = action.payload;
            
            // Validar límites
            if (state.maxValue !== undefined && newValue > state.maxValue) {
                return;
            }
            if (state.minValue !== undefined && newValue < state.minValue) {
                return;
            }
            
            state.history.push(state.value);
            state.value = newValue;
        },

        // Acción para cambiar el step
        setStep: (state, action: PayloadAction<number>) => {
            if (action.payload > 0) {
                state.step = action.payload;
            }
        },

        // Acción para establecer límites
        setLimits: (state, action: PayloadAction<{ max?: number; min?: number }>) => {
            if (action.payload.max !== undefined) {
                state.maxValue = action.payload.max;
            }
            if (action.payload.min !== undefined) {
                state.minValue = action.payload.min;
            }
        },

        // Acción para limpiar el historial
        clearHistory: (state) => {
            state.history = [];
        },

        // Acción para deshacer la última operación
        undo: (state) => {
            if (state.history.length > 0) {
                state.value = state.history.pop()!;
            }
        },

        // Acción para incrementar múltiples veces
        addMultiple: (state, action: PayloadAction<{ times: number; step?: number }>) => {
            const { times, step } = action.payload;
            const increment = step ?? state.step;
            const totalIncrement = times * increment;
            const newValue = state.value + totalIncrement;
            
            if (state.maxValue !== undefined && newValue > state.maxValue) {
                return;
            }
            
            state.history.push(state.value);
            state.value = newValue;
        },

        // Acción para decrementar múltiples veces
        removeMultiple: (state, action: PayloadAction<{ times: number; step?: number }>) => {
            const { times, step } = action.payload;
            const decrement = step ?? state.step;
            const totalDecrement = times * decrement;
            const newValue = state.value - totalDecrement;
            
            if (state.minValue !== undefined && newValue < state.minValue) {
                return;
            }
            
            state.history.push(state.value);
            state.value = newValue;
        }
    }
});

// Exportar las acciones
export const {
    add,
    remove,
    reset,
    setValue,
    setStep,
    setLimits,
    clearHistory,
    undo,
    addMultiple,
    removeMultiple
} = counterSlice.actions;

// Selectores
export const selectCounterState = (state: { counter: CounterState }) => state.counter;
export const selectCounterValue = (state: { counter: CounterState }) => state.counter.value;
export const selectCounterStep = (state: { counter: CounterState }) => state.counter.step;
export const selectCounterHistory = (state: { counter: CounterState }) => state.counter.history;
export const selectCounterLimits = (state: { counter: CounterState }) => ({
    max: state.counter.maxValue,
    min: state.counter.minValue
});

// Selectores derivados
export const selectCanUndo = (state: { counter: CounterState }) => state.counter.history.length > 0;
export const selectIsAtMax = (state: { counter: CounterState }) => 
    state.counter.maxValue !== undefined && state.counter.value >= state.counter.maxValue;
export const selectIsAtMin = (state: { counter: CounterState }) => 
    state.counter.minValue !== undefined && state.counter.value <= state.counter.minValue;

// Exportar el reducer
export default counterSlice.reducer;