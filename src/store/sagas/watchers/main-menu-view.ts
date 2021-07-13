// /**
//  * Fired when an opcode is fired
//  *
//  * @param action
//  */
// function * handleFireOpcode(action: Actions.Commands.fireOpcode) {
//   const { payload } = action;
//   const { opcode } = payload;

import { call, select, takeLatest } from "redux-saga/effects";
import { $Action, $Saga } from "../..";
import { $select } from "../../effects";
import { $Selector } from "../../selector";

//   // must be on MainMenu
//   const targetView: $Selector.Views.Target = yield select($Selector.Views.target);
//   if (targetView?.viewId !== ViewId.MainMenu) return;

//   // get target program
//   const targetProgram: $Selector.Views.MainMenu.TargetProgram = yield select($Selector.Views.MainMenu.targetProgram);
//   if (targetProgram === null) return;
//   const { programId } = targetProgram;

//   switch (opcode) {
//     case Opcode.ExecuteProgramOptions: {
//       // view the programs options
//       break;
//     }

//     case Opcode.ExecuteRunProgram: {
//       // execute the current program
//       yield put(Actions.Commands.setViewFading({ viewId: ViewId.MainMenu }));
//       yield put(Actions.Commands.setView({ viewId: ViewId.Program }));
//       yield put(Actions.Views.Program.Commands.setProgram({ programId }));
//       yield put(Actions.Views.MainMenu.Commands.setProgramIconVisible({ programId, value: false }))
//       yield delay(2000);
//       yield put(Actions.Commands.clearViewFading({ viewId: ViewId.MainMenu }));
//       break;
//     }

//     case Opcode.ExecuteClearProgramCache: {
//       //
//       break;
//     }
//   }
// }

export function * watchers() {
  yield takeLatest(
    $Action.MainMenuView.handleExecuteProgramCommand,
    (action) => {
      const { payload } = action;
      const { programId, index } = payload;
      return $Saga
        .Services
        .MainMenuView
        .executeProgramCommand(programId, index)
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
    (action) => {
      const { payload } = action;
      const { programId } = payload;
      return $Saga
        .Services
        .MainMenuView
        .runProgram(programId)
    });
}