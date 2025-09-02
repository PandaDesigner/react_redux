import { actionTypes } from '../constants/contador';
import { UnknownAction } from '@reduxjs/toolkit';

const initialState = {
    count: 0
};

export interface State {
    count: number;
}

// Extiende UnknownAction para compatibilidad
export interface Action extends UnknownAction {
    type: (typeof actionTypes)[keyof typeof actionTypes];
    payload?: number;
}

// Type guard para verificar si la acción es válida
function isValidAction(action: UnknownAction): action is Action {
    return Object.values(actionTypes).includes(action.type as any);
}

export default function countReducer(state: State = initialState, action: UnknownAction): State {
    if (!isValidAction(action)) {
        return state;
    }

    switch (action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                count: state.count + (action.payload ?? 1)
            };
        case actionTypes.DECREMENT:
            return {
                ...state,
                count: state.count - (action.payload ?? 1)
            };
        case actionTypes.RESET:
            return {
                ...state,
                count: 0
            };
        default:
            return state;
    }
}