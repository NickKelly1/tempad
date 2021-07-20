import { useValueRef } from "@nkp/hooks";
import { useEffect } from "react";

export interface UseStepsFn { (i: number): boolean };
export type UseStepsArg = [fn: UseStepsFn, stepMs: number]
function getStepsFn(arg: UseStepsArg): UseStepsFn {
  return arg[0];
} 
function getStepsMs(arg: UseStepsArg): number {
  return arg[1];
} 
export function useSteps(...args: UseStepsArg): void {
  const _fn = useValueRef(getStepsFn(args));
  const _stepMs = useValueRef(getStepsMs(args));
  useEffect(() => {
    let i = 0;
    let timeout: null | ReturnType<typeof setTimeout> = null;
    function next() {
      timeout = setTimeout(() => {
        const _continue = _fn.current(i);
        i += 1;
        if (!_continue) {
          if (timeout != null) clearTimeout(timeout);
          return;
        };
        next()
      }, _stepMs.current);
    }

    next();

    return () => { if (timeout != null) clearTimeout(timeout); };
  }, [_fn, _stepMs]);
}
