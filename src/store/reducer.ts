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

  builder.addCase(actions.resize, (state, action) => {
    const { payload } = action;
    const { height, width } = payload;
    state.ui.tempac.height = height;
    state.ui.tempac.width = width;
    // (width / 23 seems) to give a good, size
    // TODO: scale with height if orientation is flipped
    state.ui.tempac.fontSize = Math.round(width / 23);
  });

});
