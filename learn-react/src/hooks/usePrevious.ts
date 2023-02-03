import { useRef } from "react";

type Configuration<T> = { equalityFn?: (a: T, b: T) => boolean };

/**
 * Function to check reference equality of a and b
 * @param a Leftside input
 * @param b Rightside input
 */
const refEquality = (a: unknown, b: unknown) => a === b;

/**
 * Generic hook to store and retrieve the previous value of the given reference.
 *
 * @param value Reference to a value / property that will be watched so that the previous value will always be updated
 * with the old value when the current value changes.
 * @param initialPreviousValue The initial value this hook should return as the default previous value as long as
 * the watched property was not updated.
 * @param config Optinal configuration containing a function called equalityFn that will be used to determine equality
 */
const usePrevious = <T>(
  value: T,
  initialPreviousValue?: T,
  config?: Configuration<T>
) => {
  const { current } = useRef({ target: value, value: initialPreviousValue });

  const fn = config?.equalityFn || refEquality;
  if (!fn(current.target, value)) {
    current.value = current.target;
    current.target = value;
  }

  return current.value;
};

export default usePrevious;
