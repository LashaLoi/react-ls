import { useState, useCallback, useMemo } from "react";
import { initState, updateValue } from "./helpers";
import { DEFAULT_NAMESPACE } from "./constants";
import { SetStateValue, ReturnValue, Params } from "./types";

export function useLSState<T>(params: Params<T>): ReturnValue<T> {
  const { key, defaultState, options } = params;
  const namespace = useMemo(
    () => options?.namespace || DEFAULT_NAMESPACE,
    [options]
  );

  const [state, setState] = useState<T>(() =>
    initState(namespace, key, defaultState)
  );

  const handleUpdate = useCallback(
    (value: T) => {
      updateValue(namespace, key, value);
      setState(value);
    },
    [key, namespace]
  );

  const handleState = useCallback(
    (fn: SetStateValue<T>) => {
      const newState = fn(state);

      handleUpdate(newState);
    },
    [handleUpdate, state]
  );

  const reset = useCallback(
    () => handleUpdate(defaultState),
    [handleUpdate, defaultState]
  );

  return [state, handleState, reset];
}
