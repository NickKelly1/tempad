import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { $Action } from "..";
import { State, ViewId } from "../state";

export const reduce = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase($Action.ProgramView.setTargetProgram, (state, action) => {
    const { payload } = action;
    const { programId } = payload;
    state.views[ViewId.Program].targetId = programId;
  });
}
