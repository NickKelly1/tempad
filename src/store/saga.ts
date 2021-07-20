import { all, call, fork, spawn } from 'redux-saga/effects';
import { $Saga } from '.';
import * as Sagas from './sagas';

export function * rootSaga() {
  // https://redux-saga.js.org/docs/advanced/RootSaga
  yield all([
    $Saga.Watchers.MainMenuView.watchers,
    Sagas.Watchers.ProgramView.watchers,
    Sagas.Watchers.Ui.watchers,
    Sagas.Watchers.Core.watchers,
  ].map(watcher => fork(watcher)));
}
