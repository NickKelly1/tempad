import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { ProgramCommandLabel, ProgramCommandMenu, ProgramId, ProgramItem, ProgramStateId, State, ViewId } from "../../../state";

const root = (state: State): State => state;

/**
 * Main menu
 */
export type Self = State['ui']['views']['byId'][ViewId.MainMenu];
export const self = createDraftSafeSelector(
  root,
  (state: State): Self => state.ui.views.byId[ViewId.MainMenu]);


/**
 * The target program
 */
export type Target = State['ui']['views']['byId'][ViewId.MainMenu]['programs']['target'];
export const target = createDraftSafeSelector(
  self,
  (_menu): Target => _menu.programs.target);


/**
 * Is the target program loading?
 */
export type IsLoading = boolean;
export const isLoading = createDraftSafeSelector(
  self,
  (_menu): IsLoading => (_menu.programs.target?.isLoading === true));


/**
 * The selected program
 */
export type Selected = null | ProgramId;
export const selected = createDraftSafeSelector(
  target,
  (_target): Selected => (_target?.state === ProgramStateId.Selected) ? _target.programId : null);


/**
 * The activated program
 */
export type Activated = null | ProgramId;
export const activated = createDraftSafeSelector(
  target,
  (_target): Activated => (_target?.state === ProgramStateId.Activated) ? _target.programId : null);

/**
 * Commands of the target program
 */
export type TargetProgram = null | ProgramItem;
export const targetProgram = createDraftSafeSelector(
  self,
  target,
  (_menu, _target): TargetProgram => {
    if (_target === null) return null;
    return _menu.programs.byId[_target.programId];
});

/**
 * Commands of the target program
 */
export type TargetProgramMenu = null | ProgramCommandMenu;
export const targetProgramMenu = createDraftSafeSelector(
  targetProgram,
  (_targetProgram): TargetProgramMenu => {
    return _targetProgram?.menu ?? null;
});

/**
 * Commands of the target program
 */
export type TargetCommands = null | ProgramCommandLabel[];
export const targetCommands = createDraftSafeSelector(
  targetProgramMenu,
  (_targetProgramMenu): TargetCommands => {
    return _targetProgramMenu?.commands ?? null;
});

export type IsFrozen = boolean;
export const isFrozen = createDraftSafeSelector(
  root,
  (state: State): IsFrozen => state.ui.isFrozen);