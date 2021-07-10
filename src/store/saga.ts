import * as Sagas from './sagas';


// /**
//  * Fired when a program is requested to be run
//  */
// function * handleRequestRunProgram(action: Actions.Requests.RunProgram) {
//   const { payload } = action;
//   const { programId } = payload;

//   switch (programId) {
//     case ProgramId.Timedoor:
//       yield put(Actions.Commands.setView({ viewId: ViewId.TimedoorProgram }));
//       break;
//     case ProgramId.Settings:
//       yield put(Actions.Commands.setView({ viewId: ViewId.SettingsProgram }));
//       break;
//     case ProgramId.Directory:
//       yield put(Actions.Commands.setView({ viewId: ViewId.DirectoryProgram }));
//       break;
//     case ProgramId.MissMinutes:
//       yield put(Actions.Commands.setView({ viewId: ViewId.MissMinutesProgram }));
//       break;
//   }
// }

export function * rootSaga() {
  yield * Sagas.watchers();
}