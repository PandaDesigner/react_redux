import { actionTypes } from '../constants/contador';

export const add = (payload?: number) => ({
    type: actionTypes.INCREMENT,
    payload: payload ?? 1
});

export const remove = (payload?: number) => ({
    type: actionTypes.DECREMENT,
    payload: payload ?? 1
});

export const reset = () => ({
    type: actionTypes.RESET,
});