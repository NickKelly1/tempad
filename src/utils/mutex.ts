import { Noop } from "../types";

export interface Release { (): void }

const noopPromise = () => new Promise<void>(res => res());

// TODO: test
export class Mutex {
  private _lock: null | Promise<void> = null;

  lock(): Promise<Release> {
    const self = this;
    return new Promise(callerRes => {
      // create a promise, steal its resolve fn & give to the caller
      let _release: Noop;
      const lock = new Promise((res) => { res = _release; });
      const nextLock = (self._lock ?? noopPromise())
        .then(() => {
          // give the caller a release function
          callerRes(function release() {
            // if nobody is waiting for lock after the caller has released, null the lock
            // do this before actually resolving the lock so the caller caller can safely
            // immediately call Mutex.isLocked
            if (self._lock === nextLock) self._lock = null;
            _release();
          });
          // resolves when the caller releases
          return lock;
        });
    });
  }

  isLocked(): boolean {
    return this._lock !== null;
  }
}