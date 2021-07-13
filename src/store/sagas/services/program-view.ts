import { put } from "redux-saga/effects";
import { $Action } from "../..";
import { ProgramId } from "../../state";

export function * setTargetProgram(programId: ProgramId) {
  yield put($Action.ProgramView.setTargetProgram({ programId }));
}

export function * execute(programId: ProgramId) {
  //
}