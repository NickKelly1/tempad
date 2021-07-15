import { MutableRefObject, useEffect, useRef } from "react";

/**
 * Reference to a value
 */
export function useValueRef<T>(fn: T): MutableRefObject<T> {
  // reference singleClick
  const _fnRef = useRef(fn);
  useEffect(() => void (_fnRef.current = fn), [fn]);
  return _fnRef;
}