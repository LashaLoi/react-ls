import React, { useCallback } from "react";

import { useLSState } from "../react-ls";

export const ExampleComponent: React.FC = () => {
  const [count, setCount] = useLSState("count", 0);
  const [input, setInput] = useLSState("input", "");

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
      <input value={input} onChange={handleChange} />
    </>
  );
};
