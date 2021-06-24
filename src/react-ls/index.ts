import { useState, useCallback, useMemo } from "react";

import { initState, updateValue } from "./helpers";
import { DEFAULT_NAMESPACE } from "./constants";
import { HandleStateValue, ReturnValue, Params } from "./types";

export function useLSState<T>(params: Params<T>): ReturnValue<T> {
  const { key, defaultState, options } = params;
  const namespace = useMemo(
    () => options?.namespace || DEFAULT_NAMESPACE,
    [options]
  );

  const [state, setState] = useState<T>(() =>
    initState(namespace, key, defaultState)
  );

  const handleState = useCallback(
    (cb: HandleStateValue<T>) => {
      const parsedValue = cb(state);

      updateValue(namespace, key, parsedValue);
      setState(parsedValue);
    },
    [key, state, namespace]
  );

  const reset = useCallback(() => {
    updateValue(namespace, key, defaultState);
    setState(defaultState);
  }, [defaultState, key, namespace]);

  return [state, handleState, reset];
}
