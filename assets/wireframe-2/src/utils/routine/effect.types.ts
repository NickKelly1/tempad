export interface Effect<P = unknown> { type: string, payload: P }
export interface EffectCreator<P> {
  _p: P,
  (payload: P): Effect<P>;
  type: string;
  match(unk: unknown): unk is Effect<P>;
}
export type EffectPayload<E extends EffectCreator<any>> = E['_p'];
export type Routine = Generator<Effect> | AsyncGenerator<Effect>;
