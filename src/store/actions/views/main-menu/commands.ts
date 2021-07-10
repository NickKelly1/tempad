import { createAction } from "@reduxjs/toolkit";
import { ProgramId, ProgramStateId } from "../../../state";

export interface EnableCommandPayload { index: number, value: boolean };
export const enableCommand = createAction<EnableCommandPayload>('Views:MainMenu:Commands:EnableCommand');
export type EnableCommand = ReturnType<typeof enableCommand>;

export interface SetTargetPayload { programId: ProgramId };
export const setTarget = createAction<SetTargetPayload>('Views:MainMenu:Commands:SetTarget');
export type SetTarget = ReturnType<typeof setTarget>;

export interface SetTargetStatePayload { programStateId: ProgramStateId };
export const setTargetState = createAction<SetTargetStatePayload>('Views:MainMenu:Commands:SetTargetState');
export type SetTargetState = ReturnType<typeof setTargetState>;