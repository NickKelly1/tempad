import { DependencyList, MutableRefObject, RefCallback, RefObject, useCallback, useEffect, useRef } from "react";

interface Destructor { (): void }

type UseRefReturn<T> = [cb: RefCallback<T>, node: RefObject<T>];

export function useRefEffect<T>(
  effect: (instance: T) => (void | Destructor),
  deps: DependencyList
): UseRefReturn<T> {
  const lastDestructor = useRef<null | Destructor>(null);

  const mutRef: MutableRefObject<T | null> = useRef<T>(null);

  // @note: callback refs are destructed (called with node = null)
  // EVERY time before they're re-bound by the element
  // so we can guarantee that, if called with null, we can call the
  // last destructor
  const cbRef: RefCallback<T> = useCallback((node) => {
    mutRef.current = node;
    if (lastDestructor.current) lastDestructor.current();
    if (!node) return;
    const nextDestructor = effect(node);
    if (nextDestructor) lastDestructor.current = nextDestructor;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [cbRef, mutRef];
}