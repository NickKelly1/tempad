import { createAction } from "@reduxjs/toolkit";
import { ProgramId, ProgramStateId } from "../state";

// Handlers

export const handleExecuteProgramCommand = createAction<{
  programId: ProgramId,
  index: number,
}>('Core:HandleExecuteProgramCommand');

export const handleUnloadProgram = createAction<{
  programId: ProgramId,
}>('Core:HandleUnloadProgram');


export const handleBootProgram = createAction<{
  programId: ProgramId,
}>('Core:HandleBootProgram');


// Setters

export const setProgramState = createAction<{
  programId: ProgramId,
  stateId: ProgramStateId,
}>('Core:SetProgramState');


export const setCommandEnabled = createAction<{
  programId: ProgramId,
  index: number,
  value: boolean,
}>('Core:SetCommandEnabled');


export const setCommandActive = createAction<{
  programId: ProgramId,
  index: number,
  value: boolean,
}>('Core:SetCommandState');

export const startProgram = createAction<{
  programId: ProgramId,
}>('Core:startProgram');