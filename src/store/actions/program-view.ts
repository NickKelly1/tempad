import { createAction } from "@reduxjs/toolkit";
import { PlainRect, ProgramId, ProgramViewState, ProgramViewStateId } from "../state";

export const handleSetTargetProgram = createAction<{
  programId: ProgramId,
}>('ProgramView:HandleSetTargetProgram');

export const setIconRect = createAction<{ value: PlainRect }>('ProgramView:SetIconRect');
export const clearState = createAction<void>('ProgramView:ClearState');
export const resetState = createAction<{ value: null | ProgramViewState }>('ProgramView:ResetState');
export const updateState = createAction<{ value: Partial<ProgramViewState> }>('ProgramView:UpdateState');

export const setViewStateId = createAction<{
  stateId: ProgramViewStateId,
}>('ProgramView:SetViewStateId');
