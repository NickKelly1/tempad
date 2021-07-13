import { $Saga } from '.';
import * as Sagas from './sagas';

export function * rootSaga() {
  yield * $Saga.Watchers.MainMenuView.watchers();
  yield * Sagas.Watchers.ProgramView.watchers();
  yield * Sagas.Watchers.Ui.watchers();
}
