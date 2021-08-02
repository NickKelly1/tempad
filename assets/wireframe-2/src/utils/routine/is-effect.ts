import { Effect } from "./effect.types";

export function isEffect(unk: unknown): unk is Effect<unknown> {
  if (!unk) return false;
  if (!(typeof unk === 'object')) return false;
  if (!((typeof (unk as any).type) === 'string')) return false;
  return true;
}