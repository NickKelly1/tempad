import { Routine } from "./effect.types";
import { effects } from "./effects";
import { isEffect } from "./is-effect";
import { coerceError } from '@nkp/error';

export interface Execute {
  (options?: ExecuteOptions): DoExecute;
}

interface ExecutionResult {
  aborted: boolean;
  error: null | Error;
}

export interface DoExecute {
  (createRoutine: () => Routine): Promise<ExecutionResult>
}

export interface ExecuteOptions {
  aborter?: AbortController
}

export const execute: Execute = (options) => {
  const aborter = options?.aborter;
  function isAborted() { return aborter?.signal.aborted; }
  const doExecute: DoExecute = async (createRoutine): Promise<ExecutionResult> => {
    const routine = createRoutine();
    let yielded: IteratorResult<unknown>;
    let giveback = undefined;
    try {
      while ((yielded = await routine.next(giveback)).done === false) {
        if (isAborted()) return { aborted: true, error: null };
        // unset
        giveback = undefined;
        const effect = yielded.value;

        // not an effect
        if (!isEffect(effect)) {
          console.warn(`WARNING: expected effect. Received: ${effect}`);
        }

        // delay
        else if (effects.delay.match(effect)) {
          let _to: ReturnType<typeof setTimeout>;
          let _res: (() => void);
          let waiting = new Promise<void>((res) => {
            _res = res;
            _to = setTimeout(res, effect.payload);
          });
          const handleEarlyAbort = () => {
            // clear timeout and resolve promise
            clearTimeout(_to);
            _res();
          }
          aborter?.signal.addEventListener('abort', handleEarlyAbort);
          await waiting;
          aborter?.signal.removeEventListener('abort', handleEarlyAbort);
        }

        // parallel
        else if (effects.parallel.match(effect)) {
          const results = await Promise.all(effect
            .payload
            .map(routineCreator => doExecute(routineCreator)));
        }

        // unknown effect
        else {
          console.warn(`WARNING: unknown effect. Received: ${effect}`);
        }
      }
      // success
      return {
        aborted: false,
        error: null,
      };
    } catch (error) {
      return {
        aborted: false,
        error: coerceError(error),
      };
    }
  }
  return doExecute;
}
