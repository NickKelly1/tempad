import { takeEvery } from "redux-saga/effects";
import { $Action, $Saga } from "../..";

export function * watchers() {
  yield takeEvery($Action.ProgramView.handleSetTargetProgram, function * (action) {
    const { payload } = action;
    const { programId } = payload;
    return $Saga.Services.ProgramView.setTargetProgram(programId);
  });
}