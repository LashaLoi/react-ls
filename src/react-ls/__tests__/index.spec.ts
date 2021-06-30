import { renderHook, act } from "@testing-library/react-hooks";

import { useLSState } from "../";
import { DEFAULT_NAMESPACE } from "../constants";

describe("useLSState", () => {
  // Arrange

  global.Storage.prototype.getItem = jest.fn();
  global.Storage.prototype.setItem = jest.fn();

  JSON.parse = jest.fn();

  it("should return default value on initial render", () => {
    // Arrange
    const stringifyDefaultValue = "{}";
    const params = {
      key: "count",
      defaultState: 0
    };

    // Act
    const { result } = renderHook(() => useLSState(params));

    // Assert
    const [count] = result.current;

    expect(count).toBe(params.defaultState);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      DEFAULT_NAMESPACE,
      stringifyDefaultValue
    );
  });

  it("should call getItem on initial render", () => {
    // Arrange
    const params = {
      key: "count",
      defaultState: 0
    };

    // Act
    renderHook(() => useLSState(params));

    // Assert
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith(DEFAULT_NAMESPACE);
  });

  it("should call setupNamespace on initial render", () => {
    // Arrange
    const stringifyDefaultValue = "{}";
    const params = {
      key: "count",
      defaultState: 0
    };

    // Act
    renderHook(() => useLSState(params));

    // Assert

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      DEFAULT_NAMESPACE,
      stringifyDefaultValue
    );
  });

  it("should setup correct namespace", () => {
    // Arrange
    const customNamespace = "customNamespace";
    const stringifyDefaultValue = "{}";
    const params = {
      key: "count",
      defaultState: 0,
      options: {
        namespace: customNamespace
      }
    };

    // Act
    renderHook(() => useLSState(params));

    // Assert

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      customNamespace,
      stringifyDefaultValue
    );
  });

  // it("should update current state", () => {
  //   // Arrange
  //   const params = {
  //     key: "count",
  //     defaultState: 0
  //   };
  //   global.Storage.prototype.getItem = jest.fn().mockImplementation(() => ({
  //     [DEFAULT_NAMESPACE]: {
  //       [params.key]: JSON.stringify(params.defaultState)
  //     }
  //   }));
  //   const { result } = renderHook(() => useLSState(params));
  //   const [, updateCount] = result.current;

  //   // Act

  //   act(() => {
  //     updateCount(prevCount => prevCount + 1);
  //   });

  //   // Assert
  //   const [count] = result.current;

  //   expect(count).toEqual(1);
  // });
});
