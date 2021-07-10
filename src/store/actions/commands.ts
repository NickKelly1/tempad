import { createAction } from "@reduxjs/toolkit";
import { Opcode, ViewId } from "../state";

export interface SetFrozenPayload { value: boolean };
export const setFrozen = createAction<SetFrozenPayload>('Commands:SetFrozen');
export type SetFrozen = ReturnType<typeof setFrozen>;

export interface SetViewPayload { viewId: ViewId, };
export const setView = createAction<SetViewPayload>('Commands:SetView');
export type SetView = ReturnType<typeof setView>;

export interface FireOpcodePayload { opcode: Opcode, };
export const fireOpcode = createAction<FireOpcodePayload>('Commands:FireOpcode');
export type FireOpcode = ReturnType<typeof fireOpcode>;