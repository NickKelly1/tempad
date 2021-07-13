import { createAction } from "@reduxjs/toolkit";
import { ProgramId } from "../state";

export const handleSetTargetProgram = createAction<{
  programId: ProgramId,
}>('ProgramView:HandleSetTargetProgram');


export const setTargetProgram = createAction<{
  programId: ProgramId,
}>('ProgramView:SetTargetProgram');
