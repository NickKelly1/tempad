import { all, takeEvery } from "redux-saga/effects";
import { $Action, $Saga } from "../..";

export function * watchers () {
  yield all([
    takeEvery(
      $Action.Core.handleBootProgram,
      ({ payload: { programId }}) => $Saga
        .Services
        .Core
        .bootProgram(programId)
    ),

    takeEvery(
      $Action.Core.handleUnloadProgram,
      ({ payload: { programId } }) => $Saga
        .Services
        .Core
        .unloadProgram(programId)
    ),

    takeEvery(
      $Action.Core.handleExecuteProgramCommand,
      ({ payload: { programId, index }}) => $Saga
        .Services
        .Core
        .executeProgramCommand(programId, index),
    ),

    takeEvery(
      $Action.MainMenuView.handleStartProgram,
      ({ payload: { programId } }) => $Saga
        .Services
        .Core
        .startProgram(programId)
    ),
  ]);
};