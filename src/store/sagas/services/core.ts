import { call, delay, put, race, take } from "redux-saga/effects";
import { $Action } from "../..";
import { $select } from "../../effects";
import { $Selector } from "../../selector";
import { Opcode, ProgramId, ProgramStateId, ProgramViewStateId, ViewId } from "../../state";

/**
 * Boot up the program
 *
 * @param programId
 */
export function * bootProgram(programId: ProgramId) {
  // unload the program if not already
  const state = yield * $select($Selector.self);
  if (state.core.programs.byId[programId].instance.stateId !== ProgramStateId.Unloaded) {
    yield * unloadProgram(programId);
  }

  // boot state
  if (state.core.programs.byId[programId].instance.stateId !== ProgramStateId.Booting) {
    yield put($Action.Core.setProgramState({ programId, stateId: ProgramStateId.Booting }));
  }

  // bot commands
  const commands = state.core.commands.byProgramId[programId].instances;
  for (let i = 0; i < commands.length; i += 1) {
    yield delay(yield * $select($Selector.Ui.latency));
    yield put($Action.Core.setCommandEnabled({
      programId,
      index: i,
      value: true,
    }))
  }

  // finished
  yield put($Action.Core.setProgramState({ programId, stateId: ProgramStateId.Booted }));
}


/**
 * Set a program as the target program
 *
 * @param programId
 */
export function * unloadProgram(programId: ProgramId) {
  const state = yield * $select($Selector.self);
  const commands = state.core.commands.byProgramId[programId].instances;

  // state unloading
  yield put($Action.Core.setProgramState({ programId, stateId: ProgramStateId.Unloading }));

  // unload commands
  for (let index = 0; index < commands.length; index += 1) {
    if (!commands[index].disabled) {
      yield put($Action.Core.setCommandEnabled({ programId, index, value: false, }));
    }
    if (commands[index].active) {
      yield put($Action.Core.setCommandActive({ programId, index, value: false, }));
    }
  }

  // finished
  yield put($Action.Core.setProgramState({ programId, stateId: ProgramStateId.Unloaded }));
}


/**
 * Execute a programs command
 *
 * @param programId
 */
export function * executeProgramCommand(programId: ProgramId, index: number) {
  const coreCommands = yield * $select($Selector.Core.commandsByProgramId);
  const commands = coreCommands[programId];
  if (index >= commands.instances.length) return;

  for (let i = 0; i < commands.instances.length; i += 1) {
    if (i === index) continue;
    if (commands.instances[i].active) {
      yield put($Action.Core.setCommandActive({ programId, index: i, value: false }));
    }
  }

  switch(commands.instances[index].opcode) {
    case Opcode.ExecuteProgramOptions: {
      yield put($Action.Core.setCommandActive({ programId, index, value: true }));
      break;
    }
    case Opcode.ExecuteRunProgram: {
      yield put($Action.Core.setCommandActive({ programId, index, value: true }));
      yield put($Action.MainMenuView.handleStartProgram({ programId }));
      break;
    }
    case Opcode.ExecuteClearProgramCache: {
      yield put($Action.Core.setCommandActive({ programId, index, value: true }));
      break;
    }
  }
}

/**
 * Start a program
 *
 * @param programId
 */
export function * startProgram(programId: ProgramId) {
  // change program state
  // switch view
  // 

  yield put($Action.Core.setProgramState({ programId, stateId: ProgramStateId.Starting }));
  yield put($Action.Ui.setViewFading({ viewId: ViewId.MainMenu }));
  yield put($Action.Ui.setView({ viewId: ViewId.Program }));
  yield put($Action.MainMenuView.setProgramIconVisible({ programId, value: false }));
  const iconRect = (yield * $select($Selector.MainMenuView.self)).programs.byId[programId]?.svgRect;
  if (!iconRect) throw new ReferenceError();
  yield put($Action.ProgramView.resetState({
    value: {
      percentage: 0,
      stateId: ProgramViewStateId.Uninitialised,
      programId,
      iconRect: iconRect,
    },
  }));
  yield put($Action.ProgramView.updateState({
    value: {
      stateId: ProgramViewStateId.Loading,
    },
  }))
  yield put($Action.Core.setProgramState({ programId, stateId: ProgramStateId.Ready }));
}
