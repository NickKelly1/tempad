import { DependencyList, LegacyRef, MutableRefObject, Ref, RefCallback, useCallback, useEffect, useRef } from "react";
import { setRef } from "../../util/set-ref";

interface MergeRef<T> extends React.RefCallback<T> {
  // use _current instead of current in-case
  // React searchs for _current property
  _current: T | null;
}

/**
 * Combine refs
 *
 * @param refs
 * @returns
 */
export function useRefs<T>(...refs: Ref<T>[]): MergeRef<T | null> {
  const rememberRef = useRef<T | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const innerRef: MergeRef<T> = useCallback(((node) => {
    // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
    rememberRef.current = node;
    refs.forEach(setRef(node));
    innerRef._current = node;
  }) as MergeRef<T>, refs);

  // initialise current to null
  if (innerRef._current === undefined) {
    innerRef._current = rememberRef.current;
  }

  return innerRef;
}