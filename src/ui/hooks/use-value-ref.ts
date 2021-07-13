import { MutableRefObject, useEffect, useRef } from "react";

export function useValueRef<T>(fn: T): MutableRefObject<T> {
  // reference singleClick
  const _fnRef = useRef(fn);
  useEffect(() => void (_fnRef.current = fn), [fn]);
  return _fnRef;
}