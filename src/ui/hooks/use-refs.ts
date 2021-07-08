import { MutableRefObject, Ref, useEffect, useRef } from "react";

/**
 * Combine refs
 *
 * @param refs
 * @returns
 */
export function useRefs<T>(...refs: Ref<T>[]): MutableRefObject<T | null> {
  const innerRef = useRef<null | T>(null);

  // keep the forwarded ref up-to-date
  useEffect(() => {
    if (!innerRef.current) return;
    refs.forEach(ref => {
      if (!ref) return;
      switch (typeof ref) {
        case 'function': {
          ref(innerRef.current);
          break;
        }
        case 'object': {
          innerRef.current = ref.current;
          break;
        }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerRef, ...refs]);

  return innerRef;
}