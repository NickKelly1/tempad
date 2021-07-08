import {
  Action,
  ActionCreator,
  createAction,
  Dispatch,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
// import {} from '@reduxjs/toolkit/dist/createAction';
import { FocusedProgram, MenuItemId, ProgramId, ProgramStateId, State } from "./state";

interface ThunkApiConfig {
  state: State;
  dispatch: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
}

export namespace actions {
  export const setFrozen = createAction<{ value: boolean }>('SetFrozen');
  export type SetFrozen = ReturnType<typeof setFrozen>;

  export const setCurrentProgram = createAction<FocusedProgram>('SetCurrentProgram');
  export type SetCurrentProgram = ReturnType<typeof setCurrentProgram>;

  export const singleClickProgram = createAction<{ programId: ProgramId }>('SingleClickedProgram');
  export type SingleClickProgram = ReturnType<typeof singleClickProgram>;

  export const doubleClickProgram = createAction<{ programId: ProgramId }>('DoubleClickedProgram');
  export type DoubleClickProgram = ReturnType<typeof doubleClickProgram>;

  export const requestActivateProgram = createAction<{ programId: ProgramId }>('RequestActivateProgram');
  export type RequestActivateProgram = ReturnType<typeof requestActivateProgram>;

  export const setMenuOptionEnabled = createAction<{ menuItemId: MenuItemId, value: boolean }>('SetMenuOptionEnabled');
  export type SetMenuOptionEnabled = ReturnType<typeof setMenuOptionEnabled>;

  export const resize = createAction<{ height: number, width: number, }>('Resize');
  export type Resize = ReturnType<typeof resize>;
}



    // activate: createAsyncThunk<void, { programId: ProgramId }, ThunkApiConfig>(
    //   'programs:activate',
    //   async (payload, thunk) => {
    //     // do not continue if frozen
    //     if (selector.isFrozen(thunk.getState())) return;

    //     const { programId } = payload;
    //     switch (programId) {
    //       case ProgramId.Timedoor:
    //       case ProgramId.Settings:
    //       case ProgramId.Directory:
    //       case ProgramId.MissMinutes:

    //         thunk.dispatch(actions.interraction.freeze());
    //         // another program to deactivate?

    //         thunk.dispatch(actions.programs.setState({ programId, stateId: ProgramStateId.Activated }));
    //         await wait(500);
    //         thunk.dispatch(actions.menu.setCallToAction(programId));
    //         await wait(1000);
    //         thunk.dispatch(actions.menu.items.options.setDisabled(false));
    //         await wait(1000);
    //         thunk.dispatch(actions.menu.items.runProgram.setDisabled(false));
    //         await wait(1000);
    //         thunk.dispatch(actions.menu.items.clearCache.setDisabled(false));
    //         thunk.dispatch(actions.interraction.unfreeze());
    //         break;
    //     }
    //   }),
