import { Effect, EffectCreator } from "./effect.types";
import { isEffect } from "./is-effect";

export function createEffect<P = void>(type: string): EffectCreator<P> {
  const effect: EffectCreator<P> = function effect(payload: P) {
    return { type, payload };
  }
  effect._p = null as any;
  effect.type = type;
  effect.match = function match(unk: unknown): unk is Effect<P> {
    if (!isEffect(unk)) return false;
    return true;
  }
  return effect;
}