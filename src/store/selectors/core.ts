import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { ProgramContainer, State, ViewId } from "../state";


const root = (state: State): State => state;

/**
 * Main menu
 */
export type self = State['core'];
export const self = createDraftSafeSelector(
  root,
  (_root: State): self => _root.core);


/**
 * Programs
 */
export type programs = ProgramContainer[];
export const programs = createDraftSafeSelector(
  self,
  (_self): programs => _self
    .programs
    .ids
    .map(programId => _self
      .programs
      .byId[programId]));

/**
 * Programs By Id
 */
export type programsById = State['core']['programs']['byId'];
export const programsById = createDraftSafeSelector(
  self,
  (_self): programsById => _self.programs.byId)

/**
 * Commands By Program Id
 */
export type commandsByProgramId = State['core']['commands']['byProgramId'];
export const commandsByProgramId = createDraftSafeSelector(
  self,
  (_self): commandsByProgramId => _self.commands.byProgramId)