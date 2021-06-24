export type Value<T> = T;

export type HandleStateValue<T> = (state: T) => T;
export type HandleState<T> = (value: HandleStateValue<T>) => void;

export type Reset = () => void;

export type ReturnValue<T> = [Value<T>, HandleState<T>, Reset];

export type Options = {
  namespace: string;
};

export type Params<T> = { key: string; defaultState: T; options?: Options };
