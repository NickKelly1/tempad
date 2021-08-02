import { createEffect } from "../create-effect";
import { Routine } from "../effect.types";

export const parallel = createEffect<(() => Routine)[]>('parallel');
