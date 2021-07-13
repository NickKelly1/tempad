
import { createAction } from "@reduxjs/toolkit";
import { PlainRect, ProgramId } from "../state";

export const handleSetTargetProgram = createAction<{
  programId: ProgramId,
}>('MainMenuView:HandleSetTargetProgram');

export const handleRunProgramCommand = createAction<{
  programId: ProgramId,
  index: number,
}>('MainMenuView:HandleRunProgramCommand');

export const handleExecuteProgram = createAction<{
  programId: ProgramId,
}>('MainMenuView:HandleExecuteProgram');

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