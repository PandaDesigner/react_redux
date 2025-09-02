/**
 * Counter Feature - Main Entry Point
 * Hexagonal Architecture Implementation
 */

// Components
export { CounterComponent, CounterComponent as Counter } from './components/counter.component';

// Hooks
export { useCounter, useSimpleCounter, useBoundedCounter, useCounterWithHistory } from './hooks/use-counter.hooks';

// Types
export type {
    CounterState,
    CounterOperation,
    CounterConfig,
    CounterServiceInterface,
    CounterActions,
    CounterDerivedState
} from './types/counter.types';

// Core Domain
export { CounterEntity } from './core/counter.entity';
export { CounterService } from './core/counter.service';

// Actions and Selectors
export {
    // Actions
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
    
    // Selectors
    selectCounterState,
    selectCounterValue,
    selectCounterStep,
    selectCounterHistory,
    selectCounterLimits,
    selectCanUndo,
    selectIsAtMax,
    selectIsAtMin
} from './actions/counter.slice';

// Default export
export { CounterComponent as default } from './components/counter.component';