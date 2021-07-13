import { select, SelectEffect, Tail } from "redux-saga/effects";

export function * $select<Fn extends (state: any, ...args: any[]) => any>(
  selector: Fn,
  ...args: Tail<Parameters<Fn>>
): Generator<SelectEffect, ReturnType<Fn>, ReturnType<Fn>> {
  // unsafe
  const result: ReturnType<Fn> = yield select(selector, ...args);
  return result;
}
