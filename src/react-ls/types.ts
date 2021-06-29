export type SetStateValue<T> = (state: T) => T;
export type SetState<T> = (value: SetStateValue<T>) => void;

export type ResetState = () => void;

export type ReturnValue<T> = [T, SetState<T>, ResetState];

export type Options = {
  namespace: string;
};

export type Params<T> = { key: string; defaultState: T; options?: Options };
