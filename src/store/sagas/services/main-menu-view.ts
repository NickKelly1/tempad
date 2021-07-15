import { delay, put } from "redux-saga/effects";
import { $Action } from "../..";
import { $select } from "../../effects";
import { $Selector } from "../../selector";
import { Opcode, ProgramId } from "../../state";

/**
 * Reset a program to its original state
 * @internal
 */
function * resetProgramState(programId: ProgramId) {
  const state = yield * $select($Selector.self);
  const commands = state.core.commands.byId[programId].instances;
  for (let i = 0; i < commands.length; i += 1) {
    if (!commands[i].disabled) {
      yield put($Action.Program.setCommandEnabled({
        programId,
        index: i,
        value: false,
      }))
    }
  }
}


/**
 * Enable a programs commands
 * @internal
 */
function * enableProgramCommands(programId: ProgramId) {
  const state = yield * $select($Selector.self);
  const commands = state.core.commands.byId[programId].instances;
  for (let i = 0; i < commands.length; i += 1) {
    yield delay(yield * $select($Selector.Ui.latency));
    yield put($Action.Program.setCommandEnabled({
      programId,
      index: i,
      value: true,
    }))
  }
}


/**
 * Set a program as the target program
 *
 * @param programId
 */
export function * setTargetProgram(programId: ProgramId) {
  // @note: expects programId to not already be the target prorgam
  const previousProgramId = yield * $select($Selector.MainMenuView.targetProgramId);
  if (previousProgramId != null) {
    // reset the state of the previous program
    yield * resetProgramState(previousProgramId);
  }
  // target the new program
  yield put($Action.MainMenuView.setTargetProgram({ programId }));
  yield * enableProgramCommands(programId);
}


/**
 * Set a program as the target program
 *
 * @param programId
 */
export function * executeProgramCommand(programId: ProgramId, index: number) {
  const coreCommands = yield * $select($Selector.Core.commandsByProgramId);
  const commands = coreCommands[programId];
  if (index >= commands.instances.length) return;

  switch(commands.instances[index].opcode) {
    case Opcode.ExecuteProgramOptions: {
      break;
    }
    case Opcode.ExecuteRunProgram: {
      yield put($Action.MainMenuView.handleRunProgram({ programId }));
      break;
    }
    case Opcode.ExecuteClearProgramCache: {
      break;
    }
  }
}

export function * runProgram(programId: ProgramId) {
  yield put($Action.MainMenuView.setRunningProgram({ programId }));
}
