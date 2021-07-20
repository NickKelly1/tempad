import { call, fork, put } from "redux-saga/effects";
import { $Action } from "../..";
import { $select } from "../../effects";
import { $Selector } from "../../selector";
import { ProgramId, ViewId } from "../../state";

export function * resizeTempad(dims: { height: number, width: number }) {
  const { height, width } = dims;
  yield put($Action.Ui.resizeTempad({ height, width }));
}

// export function * open(viewId: ViewId) {
//   //
// }

// export function * fade(viewId: ViewId) {
//   yield put($Action.Ui.setViewFading({ viewId }));
//   yield fork(function() {
//     //
//   });
// }

// export function * handleProgramStarting(programId: ProgramId) {
// }
