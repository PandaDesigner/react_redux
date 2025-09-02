"use client";

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';
import { add, remove, reset } from '@/lib/actions/contador-action';

export default function CounterComponent() {
    const count = useSelector((state: RootState) => state.count);
    const dispatch = useDispatch<AppDispatch>();

    const handleIncrement = () => {
        dispatch(add(1));
    };

    const handleDecrement = () => {
        dispatch(remove(1));
    };

    const handleReset = () => {
        dispatch(reset());
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
                    Increment
                </button>
                <button
                    onClick={handleDecrement}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    aria-label="Decrementar contador"
                >
                    Decrement
                </button>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    aria-label="Resetear contador"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

