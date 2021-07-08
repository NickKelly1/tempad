import { createReducer } from "@reduxjs/toolkit";
import { actions } from "./action";
import { FocusedProgram, initialState, ProgramId, ProgramStateId, State } from "./state";

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.setFrozen, (state, action) => {
    const { payload } = action;
    const { value } = payload;
    state.ui.isFrozen = value;
  });

  builder.addCase(actions.setCurrentProgram, (state, action) => {
    const { payload } = action;
    const { programId, stateId } = payload;

    // TODO un-set the previous program

    // set the new program
    state.ui.focused = { programId, stateId };
  });

  builder.addCase(actions.setMenuOptionEnabled, (state, action) => {
    const { payload } = action;
    const { menuItemId, value } = payload;
    state.ui.menu.byId[menuItemId].disabled = !value;
  });

});
