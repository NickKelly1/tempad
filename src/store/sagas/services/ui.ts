import { put } from "redux-saga/effects";
import { $Action } from "../..";

export function * resizeTempac(dims: { height: number, width: number }) {
  const { height, width } = dims;
  yield put($Action.Ui.resizeTempac({ height, width }));
}
