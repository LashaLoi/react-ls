import { useState, useCallback, useMemo } from "react";
import { initState, updateValue } from "./helpers";
import { DEFAULT_NAMESPACE } from "./constants";
import { SetState, ResetState, ReturnValue, Params } from "./types";

export function useLSState<T>(params: Params<T>): ReturnValue<T> {
  const { key, defaultState, options } = params;
  const namespace = useMemo(
    () => options?.namespace ?? DEFAULT_NAMESPACE,
    [options]
  );

  const [state, setState] = useState<T>(() =>
    initState(namespace, key, defaultState)
  );

  const handleUpdate = useCallback<(value: T) => void>(
    value => {
      updateValue(namespace, key, value);
      setState(value);
    },
    [key, namespace]
  );

  const handleState = useCallback<SetState<T>>(
    fn => {
      const newState = fn(state);

      handleUpdate(newState);
    },
    [handleUpdate, state]
  );

  const reset = useCallback<ResetState>(
    () => handleUpdate(defaultState),
    [handleUpdate, defaultState]
  );

  return [state, handleState, reset];
}
