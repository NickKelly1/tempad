import { createAction } from "@reduxjs/toolkit";
import { Opcode, ViewId } from "../state";

export const fire = createAction<{ opcode: Opcode, }>('Opcode:fire');
export type fire = ReturnType<typeof fire>;