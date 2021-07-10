import { select, put, delay, takeEvery } from "redux-saga/effects";
import { Actions } from "../action";
import { Selectors } from "../selector";
import { Opcode, ProgramId, ProgramStateId, ViewId } from "../state";
import { Utils } from "../util";

/**
 * Fired wheen a program is single-clicked
 * 
 * @param action
 */
function * handleProgramClicked(action: Actions.Views.MainMenu.Events.ProgramClicked) {
  const { payload } = action;
  const { programId } = payload;

  let s: Selectors.State = yield select(Selectors.state);
  const prevTarget: Selectors.Views.MainMenu.Target = yield select(Selectors.Views.MainMenu.target);
  const isChangingTarget = prevTarget?.programId !== programId;

  // must not be frozen
  if (Utils.Views.MainMenu.isFrozen(s)) return;
  // must not already be target
  if (Utils.Views.MainMenu.isTarget(s, programId)) return;
  // must not already be selected
  if (Utils.Views.MainMenu.isSelected(s, programId)) return;
  // must not already be activated
  if (Utils.Views.MainMenu.isActivated(s, programId)) return;

  // switch target
  if (isChangingTarget) {
    yield put(Actions.Views.MainMenu.Commands.setTarget({ programId }));
    // disable all commands
    const commands: Selectors.Views.MainMenu.TargetCommands = yield select(Selectors.Views.MainMenu.targetCommands);
    if (commands) {
      for (let index = 0; index < commands.length ?? 0; index += 1) {
        yield put(Actions.Views.MainMenu.Commands.enableCommand({ index, value: false }));
      }
    }
  }

  // set selected
  yield put(Actions.Views.MainMenu.Commands.setTargetState({ programStateId: ProgramStateId.Selected }));
}

/**
 * Fired when a program is double-clicked
 *
 * @param action
 */
function * handleDoubleClickProgram(action: Actions.Views.MainMenu.Events.ProgramDoubleClicked) {
  const { payload } = action;
  const { programId } = payload;

  let s: Selectors.State = yield select(Selectors.state);
  const prevTarget: Selectors.Views.MainMenu.Target = yield select(Selectors.Views.MainMenu.target);
  const isChangingTarget = prevTarget?.programId !== programId;

  // must not be frozen
  if (Utils.Views.MainMenu.isFrozen(s)) return;
  // must already be target
  if (!Utils.Views.MainMenu.isTarget(s, programId)) return;
  // must not already be activated
  if (Utils.Views.MainMenu.isActivated(s, programId)) return;

  // freeze before update
  yield put(Actions.Commands.setFrozen({ value: true }));

  // switch target if necessary
  if (isChangingTarget) {
    yield put(Actions.Views.MainMenu.Commands.setTarget({ programId }));
    // disable all commands
    const commands: Selectors.Views.MainMenu.TargetCommands = yield select(Selectors.Views.MainMenu.targetCommands);
    if (commands) {
      for (let index = 0; index < commands.length; index += 1) {
        yield put(Actions.Views.MainMenu.Commands.enableCommand({ index, value: false }));
      }
    }
  }

  // set activated
  yield put(Actions.Views.MainMenu.Commands.setTargetState({ programStateId: ProgramStateId.Activated }));

  // enable commands one-by-one
  const commands: Selectors.Views.MainMenu.TargetCommands = yield select(Selectors.Views.MainMenu.targetCommands);
  if (commands) {
    for (let index = 0; index < commands.length; index += 1) {
      if (commands[index].disabled) {
        const latency: Selectors.Latency = yield select(Selectors.latency);
        yield delay(latency);
        yield put(Actions.Views.MainMenu.Commands.enableCommand({ index, value: true }));
      }
    }
  }

  // unfreeze after update
  yield put(Actions.Commands.setFrozen({ value: false }));
}

/**
 * Fired when an opcode is fired
 *
 * @param action
 */
function * handleFireOpcode(action: Actions.Commands.FireOpcode) {
  const { payload } = action;
  const { opcode } = payload;

  // must be on MainMenu
  const targetView: Selectors.Views.Target = yield select(Selectors.Views.target);
  if (targetView?.viewId !== ViewId.MainMenu) return;

  // get target program
  const targetProgram: Selectors.Views.MainMenu.TargetProgram = yield select(Selectors.Views.MainMenu.targetProgram);
  if (targetProgram === null) return;

  switch (opcode) {
    case Opcode.ExecuteProgramOptions: {
      // view the programs options
      break;
    }

    case Opcode.ExecuteRunProgram: {
      // execute the current program
      switch (targetProgram.programId) {
        case ProgramId.Timedoor: {
          // TODO slowly transition view
          yield put(Actions.Commands.setView({ viewId: ViewId.TimedoorProgram }));
          break;
        }
        case ProgramId.Settings: {
          yield put(Actions.Commands.setView({ viewId: ViewId.SettingsProgram }));
          break;
        }
        case ProgramId.Directory: {
          yield put(Actions.Commands.setView({ viewId: ViewId.DirectoryProgram }));
          break;
        }
        case ProgramId.MissMinutes: {
          yield put(Actions.Commands.setView({ viewId: ViewId.MissMinutesProgram }));
          break;
        }
      }
      break;
    }

    case Opcode.ExecuteClearProgramCache: {
      //
      break;
    }
  }
}

export function * watchers() {
  yield takeEvery(Actions.Views.MainMenu.Events.programClicked, handleProgramClicked);
  yield takeEvery(Actions.Views.MainMenu.Events.programDoubleClicked, handleDoubleClickProgram);
  yield takeEvery(Actions.Commands.fireOpcode, handleFireOpcode);
}