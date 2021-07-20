import { all, takeEvery, takeLatest } from "redux-saga/effects";
import { $Action, $Saga } from "../..";

export function * watchers() {
  yield all([
    takeLatest(
      $Action.Ui.handleResize,
      ({ payload: { height, width } }) => $Saga
        .Services
        .Ui
        .resizeTempad({ height, width })
    ),

    takeLatest(
      $Action.Ui.handleFocus,
      ({ payload: { height, width } }) => $Saga
        .Services
        .Ui
        .resizeTempad({ height, width })
    ),

  //   takeEvery(
  //     $Action.Core.handleProgramStarting,
  //     ({ payload: { programId } }) => $Saga
  //       .Services
  //       .Ui
  //       .handleProgramStarting(programId)
  //   )
  ]);
};