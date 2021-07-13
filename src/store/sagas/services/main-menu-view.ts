import { delay, put } from "redux-saga/effects";
import { $Action } from "../..";
import { $select } from "../../effects";
import { $Selector } from "../../selector";
import { ProgramId } from "../../state";

/**
 * Reset a program to its original state
 * @internal
 */
function * resetProgramState(programId: ProgramId) {
  const state = yield * $select($Selector.self);
  const commands = state.programs.byId[programId].commands;
  for (let i = 0; i < commands.length; i += 1) {
    if (commands[i].disabled) {
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
  const commands = state.programs.byId[programId].commands;
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
  // unset the previous target
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
 * Execute the program
 *
 * @param programId
 */
export function * executeProgram(programId: ProgramId) {
  // TODO

  // // unset the previous target
  // const previousProgramId = yield * $select($Selector.MainMenu.targetProgramId);
  // if (previousProgramId != null) {
  //   // reset the state of the previous program
  //   yield * resetProgramState(previousProgramId);
  // }
  // // target the new program
  // yield put($Action.MainMenuView.setTargetProgram({ programId }));
  // yield * enableProgramCommands(programId);
}

