import { delay, put } from "redux-saga/effects";
import { $Action } from "../..";
import { $select } from "../../effects";
import { $Selector } from "../../selector";
import { Opcode, ProgramId } from "../../state";

/**
 * Set a program as the target program
 *
 * @param programId
 */
export function * setTargetProgram(programId: ProgramId) {
  const previousProgramId = yield * $select($Selector.MainMenuView.targetProgramId);
  if (previousProgramId === programId) return;
  yield put($Action.Core.handleBootProgram({ programId }));
  yield put($Action.MainMenuView.setTargetProgram({ programId }));
}


export function * runProgram(programId: ProgramId) {
  yield put($Action.MainMenuView.setRunningProgram({ programId }));
}
