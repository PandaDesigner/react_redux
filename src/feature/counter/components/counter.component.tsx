'use client';

import React, { memo } from 'react';
import { useCounter } from '../hooks/use-counter.hooks';
import type { CounterOperation } from '../types/counter.types';

/**
 * Counter component with increment, decrement, reset, and advanced operations.
 * All user-visible text must be Spanish.
 */
export const CounterComponent: React.FC = memo(() => {
  const {
    // State selectors
    value,
    step,
    history,
    limits,
    canUndo,
    isAtMin,
    isAtMax,
    derivedState,
    stats,
    
    // Actions
    increment,
    decrement,
    reset,
    setValue,
    setStep,
    setLimits,
    clearHistory,
    undo,
    incrementMultiple,
    decrementMultiple,
    
    // Utilities
    canIncrement,
    canDecrement
  } = useCounter();

  const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  const handleSetStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = parseInt(event.target.value, 10);
    if (!isNaN(newStep) && newStep > 0) {
      setStep(newStep);
    }
  };

  const handleSetMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(event.target.value, 10);
    if (!isNaN(newMin)) {
      setLimits(limits.max, newMin);
    }
  };

  const handleSetMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(event.target.value, 10);
    if (!isNaN(newMax)) {
      setLimits(newMax, limits.min);
    }
  };

  const handleAddMultiple = () => {
    incrementMultiple(5, step);
  };

  const handleRemoveMultiple = () => {
    decrementMultiple(5, step);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Contador Avanzado
      </h1>
      
      {/* Main Counter Display */}
      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-blue-600 mb-4">
          {value}
        </div>
        
        {/* Status Indicators */}
        <div className="flex justify-center gap-4 mb-4">
          {isAtMin && (
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
              Valor Mínimo
            </span>
          )}
          {isAtMax && (
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
              Valor Máximo
            </span>
          )}
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {derivedState.percentage.toFixed(1)}% del rango
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${derivedState.percentage}%` }}
          />
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => decrement()}
          disabled={!canDecrement()}
          className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
          aria-label="Decrementar contador"
        >
          - {step}
        </button>
        
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          aria-label="Reiniciar contador"
        >
          Reiniciar
        </button>
        
        <button
          onClick={() => increment()}
          disabled={!canIncrement()}
          className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
          aria-label="Incrementar contador"
        >
          + {step}
        </button>
      </div>

      {/* Advanced Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Configuration Panel */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Configuración
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor Actual:
              </label>
              <input
                type="number"
                value={value}
                onChange={handleSetValue}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Valor actual del contador"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Paso (incremento/decremento):
              </label>
              <input
                type="number"
                value={step}
                onChange={handleSetStep}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Paso de incremento y decremento"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mínimo:
                </label>
                <input
                  type="number"
                  value={limits.min || 0}
                  onChange={handleSetMin}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Valor mínimo del contador"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Máximo:
                </label>
                <input
                  type="number"
                  value={limits.max || 100}
                  onChange={handleSetMax}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Valor máximo del contador"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Operations Panel */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Operaciones Avanzadas
          </h3>
          
          <div className="space-y-3">
            <button
              onClick={handleAddMultiple}
              disabled={!canIncrement()}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              Agregar {step * 5}
            </button>
            
            <button
              onClick={handleRemoveMultiple}
              disabled={!canDecrement()}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
            >
              Quitar {step * 5}
            </button>
            
            <button
              onClick={undo}
              disabled={!canUndo}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
            >
              Deshacer
            </button>
            
            <button
              onClick={clearHistory}
              disabled={history.length === 0}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              Limpiar Historial
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Información del Contador
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {value}
            </div>
            <div className="text-sm text-gray-600">
              Valor Actual
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-green-600">
              {step}
            </div>
            <div className="text-sm text-gray-600">
              Paso
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-red-600">
              {limits.min ?? 'Sin límite'}
            </div>
            <div className="text-sm text-gray-600">
              Mínimo
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {limits.max ?? 'Sin límite'}
            </div>
            <div className="text-sm text-gray-600">
              Máximo
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Historial de Operaciones
          </h3>
          
          <div className="max-h-32 overflow-y-auto">
            <div className="space-y-1">
              {history.slice(-10).reverse().map((value, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    Valor: {value}
                  </span>
                  <span className="text-gray-500">
                    Operación #{history.length - index}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

CounterComponent.displayName = 'CounterComponent';

export default CounterComponent;