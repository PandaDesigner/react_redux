import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux.hooks';
import {
    add,
    remove,
    reset,
    setValue,
    setStep,
    setLimits,
    clearHistory,
    undo,
    addMultiple,
    removeMultiple,
    selectCounterState,
    selectCounterValue,
    selectCounterStep,
    selectCounterHistory,
    selectCounterLimits,
    selectCanUndo,
    selectIsAtMax,
    selectIsAtMin
} from '../actions/counter.slice';
import { CounterService } from '../core/counter.service';
import { CounterConfig } from '../types/counter.types';

/**
 * Hook personalizado para el feature Counter
 * Actúa como puente entre los componentes UI y las acciones Redux
 */
export const useCounter = (config?: CounterConfig) => {
    const dispatch = useAppDispatch();
    
    // Crear instancia del servicio con configuración
    const counterService = new CounterService(config);
    
    // Selectores
    const counterState = useAppSelector(selectCounterState);
    const value = useAppSelector(selectCounterValue);
    const step = useAppSelector(selectCounterStep);
    const history = useAppSelector(selectCounterHistory);
    const limits = useAppSelector(selectCounterLimits);
    const canUndo = useAppSelector(selectCanUndo);
    const isAtMax = useAppSelector(selectIsAtMax);
    const isAtMin = useAppSelector(selectIsAtMin);

    // Acciones básicas
    const increment = useCallback((customStep?: number) => {
        try {
            if (counterService.canIncrement(value, customStep)) {
                dispatch(add(customStep));
            }
        } catch (error) {
            console.warn('No se puede incrementar:', error);
        }
    }, [dispatch, value, counterService]);

    const decrement = useCallback((customStep?: number) => {
        try {
            if (counterService.canDecrement(value, customStep)) {
                dispatch(remove(customStep));
            }
        } catch (error) {
            console.warn('No se puede decrementar:', error);
        }
    }, [dispatch, value, counterService]);

    const resetCounter = useCallback(() => {
        dispatch(reset());
    }, [dispatch]);

    const setCounterValue = useCallback((newValue: number) => {
        if (counterService.validateValue(newValue)) {
            dispatch(setValue(newValue));
        }
    }, [dispatch, counterService]);

    const changeStep = useCallback((newStep: number) => {
        if (newStep > 0) {
            dispatch(setStep(newStep));
        }
    }, [dispatch]);

    const setCounterLimits = useCallback((max?: number, min?: number) => {
        dispatch(setLimits({ max, min }));
    }, [dispatch]);

    const clearCounterHistory = useCallback(() => {
        dispatch(clearHistory());
    }, [dispatch]);

    const undoLastAction = useCallback(() => {
        if (canUndo) {
            dispatch(undo());
        }
    }, [dispatch, canUndo]);

    // Acciones avanzadas
    const incrementMultiple = useCallback((times: number, customStep?: number) => {
        if (times > 0) {
            dispatch(addMultiple({ times, step: customStep }));
        }
    }, [dispatch]);

    const decrementMultiple = useCallback((times: number, customStep?: number) => {
        if (times > 0) {
            dispatch(removeMultiple({ times, step: customStep }));
        }
    }, [dispatch]);

    // Funciones de utilidad del servicio
    const canIncrement = useCallback((customStep?: number) => {
        return counterService.canIncrement(value, customStep);
    }, [value, counterService]);

    const canDecrement = useCallback((customStep?: number) => {
        return counterService.canDecrement(value, customStep);
    }, [value, counterService]);

    const getDerivedState = useCallback(() => {
        return counterService.getDerivedState(value);
    }, [value, counterService]);

    const getCounterStats = useCallback(() => {
        return counterService.getCounterStats(value);
    }, [value, counterService]);

    const getNextValidIncrement = useCallback(() => {
        return counterService.getNextValidIncrement(value);
    }, [value, counterService]);

    const getNextValidDecrement = useCallback(() => {
        return counterService.getNextValidDecrement(value);
    }, [value, counterService]);

    // Estado derivado
    const derivedState = getDerivedState();
    const stats = getCounterStats();

    return {
        // Estado
        counterState,
        value,
        step,
        history,
        limits,
        canUndo,
        isAtMax,
        isAtMin,
        derivedState,
        stats,
        
        // Acciones básicas
        increment,
        decrement,
        reset: resetCounter,
        setValue: setCounterValue,
        setStep: changeStep,
        setLimits: setCounterLimits,
        clearHistory: clearCounterHistory,
        undo: undoLastAction,
        
        // Acciones avanzadas
        incrementMultiple,
        decrementMultiple,
        
        // Utilidades
        canIncrement,
        canDecrement,
        getDerivedState,
        getCounterStats,
        getNextValidIncrement,
        getNextValidDecrement
    };
};

/**
 * Hook simplificado para casos básicos
 */
export const useSimpleCounter = () => {
    const {
        value,
        increment,
        decrement,
        reset,
        canIncrement,
        canDecrement,
        isAtMax,
        isAtMin
    } = useCounter();

    return {
        value,
        increment,
        decrement,
        reset,
        canIncrement,
        canDecrement,
        isAtMax,
        isAtMin
    };
};

/**
 * Hook para contador con límites
 */
export const useBoundedCounter = (min: number, max: number, initialStep: number = 1) => {
    const config: CounterConfig = {
        minValue: min,
        maxValue: max,
        step: initialStep
    };

    return useCounter(config);
};

/**
 * Hook para contador con historial
 */
export const useCounterWithHistory = () => {
    const config: CounterConfig = {
        enableHistory: true
    };

    const counterHook = useCounter(config);

    return {
        ...counterHook,
        hasHistory: counterHook.history.length > 0,
        lastValue: counterHook.history[counterHook.history.length - 1]
    };
};