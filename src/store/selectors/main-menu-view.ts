import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { MainMenuProgram, OptionStateId, OptionText, ProgramCommandInstance, ProgramId, ProgramInstance, State, ViewId } from "../state";

const root = (state: State): State => state;

/**
 * Main menu
 */
export type self = State['views'][ViewId.MainMenu];
export const self = createDraftSafeSelector(
  root,
  (_root: State): self => _root.views[ViewId.MainMenu]);


/**
 * Aggregated information about a program
 */
export type programAggregates = {
  ids: ProgramId[],
  byId: {
    [ID in ProgramId]?: {
      programId: ProgramId,
      instance: ProgramInstance,
      mainMenu: MainMenuProgram,
    }
  }
}
export const programAggregates = createDraftSafeSelector(
  root,
  self,
  (_root, _self): programAggregates => {
    let result: programAggregates = { byId: {}, ids: [] };
    _self.programs.ids.forEach(programId => {
      result.ids.push(programId);
      result.byId[programId] = {
        programId,
        instance: _root.programs.byId[programId],
        mainMenu: _self.programs.byId[programId]!,
      };
    });
    return result;
  });


/**
 * The target program
 */
export type targetProgramId = null | ProgramId;
export const targetProgramId = createDraftSafeSelector(
  self,
  (_view): targetProgramId => _view.programs.targetId);


// /**
//  * Commands of the target program
//  */
// export type targetProgram = null | ProgramInstance;
// export const targetProgram = createDraftSafeSelector(
//   root,
//   targetProgramId,
//   (_root, _targetProgramId): targetProgram => {
//     if (_targetProgramId === null) return null;
//     return _root.programs.byId[_targetProgramId];
// });


/**
 * Aggregate of the target program
 */
export type targetProgramAggregate = null | {
  programId: ProgramId,
  instance: ProgramInstance,
  mainMenu: MainMenuProgram,
}
export const targetProgramAggregate = createDraftSafeSelector(
  targetProgramId,
  programAggregates,
  (_targetProgramId, _programAggregates): targetProgramAggregate => {
    if (_targetProgramId == null) return null;
    return _programAggregates.byId[_targetProgramId] ?? null;
});


// /**
//  * Commands of the target program
//  */
// export type targetProgramCommands = null | ProgramCommandInstance[];
// export const targetProgramCommands = createDraftSafeSelector(
//   targetProgram,
//   (_targetProgram): targetProgramCommands => {
//     return _targetProgram?.commands ?? null;
// });


// /**
//  * Aggregated commands of the target program
//  */
// export type targetProgramCommandAggregate = null | {
//   label: OptionText,
//   commands: ProgramCommandInstance[],
// };
// export const targetProgramCommandAggregate = createDraftSafeSelector(
//   targetProgram,
//   targetProgramCommands,
//   (_targetProgram, _commands): targetProgramCommandAggregate => {
//     if (!_commands || !_targetProgram) return null;
//     return {
//       commands: _commands,
//       label: _targetProgram.commandLabel,
//     }
// });


// /**
//  * Commands of the target program
//  */
// export type defaultProgramCommands = ProgramCommandInstance[];
// export const defaultProgramCommands = createDraftSafeSelector(
//   self,
//   (_self): defaultProgramCommands => {
//     return _self.defaultCommands;
// });


// /**
//  * Aggregated commands of the target program
//  */
// export type defaultProgramCommandAggregate = {
//   label: OptionText,
//   commands: ProgramCommandInstance[],
// };
// export const defaultProgramCommandAggregate = createDraftSafeSelector(
//   self,
//   defaultProgramCommands,
//   (_self, _defaultCommands): defaultProgramCommandAggregate => {
//     return {
//       commands: _defaultCommands,
//       label: _self.defaultCommandsLabel,
//     }
// });


// /**
//  * Aggregated commands
//  */
// export type programCommandAggregate = {
//   target: null | targetProgramCommandAggregate,
//   _default: defaultProgramCommandAggregate,
// };
// export const programCommandAggregate = createDraftSafeSelector(
//   targetProgramCommandAggregate,
//   defaultProgramCommandAggregate,
//   (_target, _default): programCommandAggregate => {
//     return {
//       target: _target,
//       _default: _default,
//     }
// });