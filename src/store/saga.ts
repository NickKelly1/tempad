import { Action } from '@reduxjs/toolkit';
import { takeEvery, put, delay, select } from 'redux-saga/effects';
import { actions } from './action';
import { selector } from './selector';
import { MenuItemId, ProgramStateId, State } from './state';

function * handleSingleClickProgram(action: actions.SingleClickProgram) {
  const { payload } = action;
  const { programId } = payload;

  // guard if ui is frozen
  const isFrozen: selector.IsFrozen = yield select(selector.isFrozen);
  if (isFrozen) return;

  // set the target program as selected
  yield put(actions.setFrozen({ value: true }));
  yield put(actions.setCurrentProgram({ programId, stateId: ProgramStateId.Selected, }));
  yield put(actions.setFrozen({ value: false }));
}

function * handleDoubleClickProgram(action: actions.DoubleClickProgram) {
  const { payload } = action;
  const { programId } = payload;

  // guard if ui is frozen
  const isFrozen: selector.IsFrozen = yield select(selector.isFrozen);
  if (isFrozen) return;

  // set the target program as activated
  yield put(actions.setFrozen({ value: true }));
  yield put(actions.setCurrentProgram({ programId, stateId: ProgramStateId.Activated, }));

  // enable options one-by-one
  yield delay(250);
  yield put(actions.setMenuOptionEnabled({ menuItemId: MenuItemId.Options, value: true }));
  yield delay(250);
  yield put(actions.setMenuOptionEnabled({ menuItemId: MenuItemId.RunProgram, value: true }));
  yield delay(250);
  yield put(actions.setMenuOptionEnabled({ menuItemId: MenuItemId.ClearCache, value: true }));

  yield put(actions.setFrozen({ value: false }));
}

export function * rootSaga() {
  yield takeEvery(actions.singleClickProgram, handleSingleClickProgram);
  yield takeEvery(actions.doubleClickProgram, handleDoubleClickProgram);
}