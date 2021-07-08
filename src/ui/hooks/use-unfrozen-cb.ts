import { DependencyList, useCallback } from "react";
import { useSelector } from "react-redux";
import { selector } from "../../store/selector";

export const useUnfrozenCb = <F extends (...args: any[]) => void>(cb: F, deps: DependencyList): F => {
  const isFrozen = useSelector(selector.isFrozen);

  const fn = useCallback((...args: Parameters<F>) => {
    if (!isFrozen) return cb(...args);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFrozen, ...deps]) as F;

  return fn;
}
