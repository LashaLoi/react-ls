const setupNamespace = (namespace: string) =>
  localStorage.setItem(namespace, JSON.stringify({}));

export const initState = <T>(
  namespace: string,
  key: string,
  defaultState: T
) => {
  const value = localStorage.getItem(namespace);

  if (!value) {
    setupNamespace(namespace);

    return defaultState;
  }

  const item = JSON.parse(value)[namespace];

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
