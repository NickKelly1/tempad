import { ActionReducerMapBuilder as Core } from "@reduxjs/toolkit";
import { $Action } from "..";
import { State } from "../state";

export const reduce = (builder: Core<State>) => {
  builder.addCase($Action.Core.setCommandEnabled, (state, action) => {
    const { payload } = action;
    const { programId, index, value, } = payload;
    state.core.commands.byProgramId[programId].instances[index].disabled = !value;
  });

  builder.addCase($Action.Core.setCommandActive, (state, action) => {
    const { payload } = action;
    const { programId, index, value, } = payload;
    state.core.commands.byProgramId[programId].instances[index].active = value;
  });

  builder.addCase($Action.Core.setProgramState, (state, action) => {
    const { payload } = action;
    const { programId, stateId, } = payload;
    state.core.programs.byId[programId].instance.stateId = stateId;
  });
};
