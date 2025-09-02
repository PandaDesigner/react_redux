
"use client";

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';

export default function CounterComponent() {
    const count = useSelector((state: RootState) => state.count);
    const dispatch = useDispatch<AppDispatch>();

    const handleIncrement = () => {
        dispatch({ type: 'INCREMENT' });
    };

    const handleDecrement = () => {
        dispatch({ type: 'DECREMENT' });
    };

    const handleReset = () => {
        dispatch({ type: 'RESET' });
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <h1 className="text-2xl font-bold">Contador: {count.count}</h1>
            <div className="flex gap-2">
                <button
                    onClick={handleIncrement}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    aria-label="Incrementar contador"
                >
                    Incrementar
                </button>
                <button
                    onClick={handleDecrement}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    aria-label="Decrementar contador"
                >
                    Decrementar
                </button>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    aria-label="Resetear contador"
                >
                    Resetear
                </button>
            </div>
        </div>
    );
}