import { createAction } from "@reduxjs/toolkit";
import { ProgramId } from "../../../state";

export interface ProgramClickedPayload { programId: ProgramId }
export const programClicked = createAction<ProgramClickedPayload>('Views:MainMenu:Events:ProgramClicked');
export type ProgramClicked = ReturnType<typeof programClicked>;

export interface ProgramDoubleClickedPayload { programId: ProgramId };
export const programDoubleClicked = createAction<ProgramDoubleClickedPayload>('Views:MainMenu:Events:ProgramDoubleClicked');
export type ProgramDoubleClicked = ReturnType<typeof programDoubleClicked>;
