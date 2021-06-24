import React, { useCallback } from "react";

import { useLSState } from "../react-ls";

export const ExampleComponent: React.FC = () => {
  const [count, setCount, resetCount] = useLSState({
    key: "count",
    defaultState: 0
  });
  const [input, setInput] = useLSState({
    key: "input",
    defaultState: ""
  });

  const handleSetCount = useCallback(
    () => setCount(state => state + 1),
    [setCount]
  );

  const handleChange = useCallback(
    ({ target: { value } }) => setInput(() => value),
    [setInput]
  );

  return (
    <>
      <button onClick={handleSetCount}>{count}</button>
      <button onClick={resetCount}>Reset count</button>
      <input value={input} onChange={handleChange} />
    </>
  );
};
