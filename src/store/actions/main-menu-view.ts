
import { createAction } from "@reduxjs/toolkit";
import { PlainRect, ProgramId, ProgramStateId } from "../state";

export const handleSetTargetProgram = createAction<{
  programId: ProgramId,
}>('MainMenuView:HandleSetTargetProgram');

export const handleExecuteProgramCommand = createAction<{
  programId: ProgramId,
  index: number,
}>('MainMenuView:HandleExecuteProgramCommand');

export const handleRunProgram = createAction<{
  programId: ProgramId,
}>('MainMenuView:HandleRunProgram');

// export const runProgram = createAction<{
//   programId: ProgramId,
// }>('MainMenuView:RunProgram');

export const loadingTargetProgram = createAction<{
  percentage: number,
}>('MainMenuView:LoadingProgram');

export const iconRectChanged = createAction<{
  programId: ProgramId,
  rect: PlainRect,
}>('MainMenuView:IconRectChanged');

export const setProgramIconVisible = createAction<{
  programId: ProgramId,
  value: boolean,
}>('MainMenuView:SetProgramIconVisible');

export const setTargetProgram = createAction<{
  programId: ProgramId,
}>('MainMenuView:setTargetProgram');

export const setRunningProgram = createAction<{
  programId: ProgramId,
}>('MainMenuView:SetExecuingProgram');

export const setProgramInitialising = createAction<{
  programId: ProgramId,
  percentage: number,
}>('MainMenuView:SetProgramInitialising');