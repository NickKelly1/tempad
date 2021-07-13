import { ActionReducerMapBuilder as Core } from "@reduxjs/toolkit";
import { $Action } from "..";
import { State } from "../state";

export const reduce = (builder: Core<State>) => {
  builder.addCase($Action.Program.setCommandEnabled, (state, action) => {
    const { payload } = action;
    const { programId, index, value, } = payload;
    state.core.commands.byId[programId].instances[index].disabled = !value;
  });

  builder.addCase($Action.Program.setCommandState, (state, action) => {
    const { payload } = action;
    const { programId, index, value, } = payload;
    state.core.commands.byId[programId].instances[index].stateId = value;
  });
};
