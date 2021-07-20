import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { $Action } from "..";
import { State, ViewId } from "../state";

export const reduce = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase($Action.ProgramView.resetState, (state, action) => {
    const { payload } = action;
    const { value } = payload;
    state.views[ViewId.Program].state = value;
  });

  builder.addCase($Action.ProgramView.updateState, (state, action) => {
    const { payload } = action;
    const { value } = payload;
    const prev = state.views[ViewId.Program].state;
    if (!prev) return;
    state.views[ViewId.Program].state = {
      ...prev,
      ...value,
    }
  });

  builder.addCase($Action.ProgramView.setIconRect, (state, action) => {
    const { payload } = action;
    const { value } = payload;
    const program = state.views[ViewId.Program].state;
    if (!program) return;
    program.iconRect = value;
  });
}
