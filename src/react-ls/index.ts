import { useState, useCallback, useMemo } from "react";

const DEFAULT_NAMESPACE = "react-ls";

type Value<T> = T;

type HandleStateValue<T> = (state: T) => T;
type HandleState<T> = (value: HandleStateValue<T>) => void;

type Reset = () => void;

type ReturnValue<T> = [Value<T>, HandleState<T>, Reset];

type Options = {
  namespace: string;
};

type Params<T> = { key: string; defaultState: T; options?: Options };

const setupNamespace = (namespace: string) =>
  localStorage.setItem(namespace, JSON.stringify({}));

const initialState = <T>(namespace: string, key: string, defaultState: T) => {
  const value = localStorage.getItem(namespace);

  if (!value) {
    setupNamespace(namespace);

    return defaultState;
  }

  const item = JSON.parse(value)[namespace];

  return (item && item[key]) ?? defaultState;
};

const updateValue = <T>(namespace: string, key: string, value: T) => {
  const existValue = JSON.parse(localStorage.getItem(namespace)!);

  const serializedValue = JSON.stringify({
    [namespace]: {
      ...existValue[namespace],
      [key]: value
    }
  });

  localStorage.setItem(namespace, serializedValue);
};

export const useLSState = <T>(params: Params<T>): ReturnValue<T> => {
  const { key, defaultState, options } = params;
  const namespace = useMemo(
    () => options?.namespace || DEFAULT_NAMESPACE,
    [options]
  );

  const [state, setState] = useState<T>(() =>
    initialState(namespace, key, defaultState)
  );

  const handleState = useCallback(
    (value: HandleStateValue<T>) => {
      const parsedValue = value(state);

      updateValue(namespace, key, parsedValue);
      setState(parsedValue);
    },
    [key, state, namespace]
  );

  const reset = () => {
    updateValue(namespace, key, defaultState);
    setState(defaultState);
  };

  return [state, handleState, reset];
};
