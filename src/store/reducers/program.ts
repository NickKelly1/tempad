import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { $Action } from "..";
import { State } from "../state";

export const reduce = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase($Action.Program.setCommandEnabled, (state, action) => {
    const { payload } = action;
    const { programId, index, value, } = payload;
    state.programs.byId[programId].commands[index].disabled = !value;
  });

  builder.addCase($Action.Program.setCommandState, (state, action) => {
    const { payload } = action;
    const { programId, index, value, } = payload;
    state.programs.byId[programId].commands[index].stateId = value;
  });
};
