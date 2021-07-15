import { call, select, takeLatest } from "redux-saga/effects";
import { $Action, $Saga } from "../..";
import { $select } from "../../effects";
import { $Selector } from "../../selector";

export function * watchers() {
  yield takeLatest(
    $Action.MainMenuView.handleExecuteProgramCommand,
    function * (action) {
      const { payload } = action;
      const { programId, index } = payload;
      yield call($Saga
        .Services
        .MainMenuView
        .executeProgramCommand, programId, index);
    });

  yield takeLatest(
    $Action.MainMenuView.handleSetTargetProgram,
    function * (action) {
      const { payload } = action;
      const { programId } = payload;
      const prevProgramId = yield * $select($Selector.MainMenuView.targetProgramId);
      if (prevProgramId === programId) return;
      yield call($Saga
        .Services
        .MainMenuView
        .setTargetProgram, programId);
    });

  yield takeLatest(
    $Action.MainMenuView.handleRunProgram,
    function * (action) {
      const { payload } = action;
      const { programId } = payload;
      yield call($Saga
        .Services
        .MainMenuView
        .runProgram, programId);
    });
}