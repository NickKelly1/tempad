import { createAction } from "@reduxjs/toolkit";
import { ProgramId } from "../state";

export interface RunProgramPayload { programId: ProgramId };
export const runProgram = createAction<RunProgramPayload>('Requests:RunProgram');
export type RunProgram = ReturnType<typeof runProgram>;