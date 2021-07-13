import { createAction } from "@reduxjs/toolkit";
import { OptionStateId, ProgramId, ProgramStateId } from "../state";

export const setState = createAction<{
  programId: ProgramId,
  stateId: ProgramStateId,
}>('Program:SetState');


export const setCommandEnabled = createAction<{
  programId: ProgramId,
  index: number,
  value: boolean,
}>('Program:SetCommandEnabled');


export const setCommandState = createAction<{
  programId: ProgramId,
  index: number,
  value: OptionStateId,
}>('Program:SetCommandState');
