const setupNamespace = (namespace: string) =>
  localStorage.setItem(namespace, JSON.stringify({}));

export const initState = <T>(
  namespace: string,
  lsKey: string,
  defaultState: T
): T => {
  const lsState = localStorage.getItem(namespace);
  if (!lsState) {
    setupNamespace(namespace);

    return defaultState;
  }

  const namespaceValue = JSON.parse(lsState)[namespace];
  if (!namespaceValue) {
    return defaultState;
  }

  return namespaceValue[lsKey] ?? defaultState;
};

export const updateValue = <T>(namespace: string, key: string, value: T) => {
  const existValue = JSON.parse(localStorage.getItem(namespace)!)[namespace];

  const serializedValue = JSON.stringify({
    [namespace]: {
      ...existValue,
      [key]: value
    }
  });

  localStorage.setItem(namespace, serializedValue);
};
