
import { createAction } from "@reduxjs/toolkit";
import { PlainRect, ProgramId } from "../state";

export const handleStartProgram = createAction<{
  programId: ProgramId,
}>('MainMenuView:HandleStartProgram');


export const handleSetTargetProgram = createAction<{
  programId: ProgramId,
}>('MainMenuView:HandleSetTargetProgram');

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

export const setProgramCommandState = createAction<{
  programId: ProgramId,
  index: number,
}>('MainMenuView:HandleExecuteProgramCommand');