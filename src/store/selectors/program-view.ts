import { createDraftSafeSelector } from "@reduxjs/toolkit"
import { ProgramCommandInstance, ProgramId, ProgramInstance, State, ViewId } from "../state";

const root = (state: State): State => state;

export type Self = State['views'][ViewId.Program];
export const self = createDraftSafeSelector(
  root,
  (_root): Self => _root.views[ViewId.Program],
);

/**
 * The target program
 */
export type targetProgramId = null | ProgramId;
export const targetProgramId = createDraftSafeSelector(
  self,
  (_view): targetProgramId => _view.targetId);


/**
 * Commands of the target program
 */
export type targetProgram = null | ProgramInstance;
export const targetProgram = createDraftSafeSelector(
  root,
  targetProgramId,
  (_root, _targetProgramId): targetProgram => {
    if (_targetProgramId === null) return null;
    return _root.programs.byId[_targetProgramId];
});

/**
 * Commands of the target program
 */
export type targetProgramCommands = null | ProgramCommandInstance[];
export const targetProgramCommands = createDraftSafeSelector(
  targetProgram,
  (_targetProgram): targetProgramCommands => {
    return _targetProgram?.commands ?? null;
});
