import { all, takeEvery, takeLatest } from "redux-saga/effects";
import { $Action, $Saga } from "../..";

export function * watchers() {
  yield all([
    takeLatest(
      $Action.MainMenuView.handleSetTargetProgram,
      ({ payload: { programId }}) => $Saga
          .Services
          .MainMenuView
          .setTargetProgram(programId)
    ),
  ]);
}