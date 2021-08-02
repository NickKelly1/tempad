import { AnyFn } from '../types';

export interface Comparitor<A extends any[]> { (prev: A, next: A): boolean }

const defaultComparitor = <A extends any[]>(prev: A, next: A) => {
  return prev.every((v, i) => next[i] === v);
};

/**
 * Memoize only the last input
 *
 * @param fn
 * @param comparitor
 * @returns
 */
export function memo1<T extends AnyFn>(
  fn: T,
  comparitor: Comparitor<Parameters<T>> = defaultComparitor,
): T {
  let prev: null | { args: Parameters<T>, ret: ReturnType<T> } = null;
  return function memoizer(...args: Parameters<T>): ReturnType<T> {
    if (prev && comparitor(prev.args, args)) return prev.ret;
    const ret: ReturnType<T> = fn(...args);
    prev = { args, ret };
    return ret;
  } as T;
}