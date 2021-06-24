import { useState, useCallback } from "react";

type HandleState<T> = (state: T) => T;

type ReturnValue<T> = [T, (value: HandleState<T>) => void];

// type Options = {
//   namespace: string;
// };

export function useLSState<T>(
  key: string,
  defaultState: T
  // options?: Options
): ReturnValue<T> {
  const initialState = () => {
    const value = localStorage.getItem(key);
    const deserializedValue = value ? JSON.parse(value) : defaultState;

    return deserializedValue;
  };

  const [state, setState] = useState<T>(initialState);

  const handleState = useCallback(
    (value: HandleState<T>) => {
      const parsedValue = typeof value === "function" ? value(state) : value;

      const serializedValue = JSON.stringify(parsedValue);
      localStorage.setItem(key, serializedValue);

      setState(parsedValue);
    },
    [key, state]
  );

  return [state, handleState];
}

// export function getLSState(key) {}

// export function setLSState(key) {}
