import { call, takeEvery } from "redux-saga/effects";
import { $Action, $Saga } from "../..";

export function * watchers() {
  yield takeEvery(
    $Action.Ui.handleResize,
    function * (action) {
      const { payload } = action;
      const { height, width } = payload;
      yield call($Saga
        .Services
        .Ui
        .resizeTempac, { height, width });
    }
  );

  yield takeEvery(
    $Action.Ui.handleFocus,
    function * (action) {
      const { payload } = action;
      const { height, width } = payload;
      yield call($Saga
        .Services
        .Ui
        .resizeTempac, { height, width });
    }
  );
}