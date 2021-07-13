interface AnyFn { (...args: any[]): any }
interface Noop { (): void }
const noop: Noop = function noop() {};

export function orNoop<T extends AnyFn>(fn: T): T;
export function orNoop<T extends AnyFn>(fn: T | undefined): T | Noop;
export function orNoop<T extends AnyFn>(fn: T | undefined): T | Noop {
  if (fn === undefined) return noop;
  return fn;
}