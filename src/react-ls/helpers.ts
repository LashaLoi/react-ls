const setupNamespace = (namespace: string) =>
  localStorage.setItem(namespace, "");

export const initState = <T>(
  namespace: string,
  key: string,
  defaultState: T
) => {
  const lsState = localStorage.getItem(namespace);

  if (!lsState) {
    setupNamespace(namespace);

    return defaultState;
  }

  const item = JSON.parse(lsState)[namespace];

  return (item && item[key]) ?? defaultState;
};

export const updateValue = <T>(namespace: string, key: string, value: T) => {
  const existValue = JSON.parse(localStorage.getItem(namespace)!);

  const serializedValue = JSON.stringify({
    [namespace]: {
      ...existValue[namespace],
      [key]: value
    }
  });

  localStorage.setItem(namespace, serializedValue);
};
