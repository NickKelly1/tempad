import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { $Action } from "..";
import { ProgramStateId, State, ViewId } from "../state";

export const reduce = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase($Action.MainMenuView.iconRectChanged, (state, action) => {
    const { payload } = action;
    const { programId, rect } = payload;
    const program = state.views[ViewId.MainMenu].programs.byId[programId];
    if (!program) return;
    program.svgRect = rect;
  });

  builder.addCase($Action.MainMenuView.setProgramIconVisible, (state, action) => {
    const { payload } = action;
    const { programId, value, } = payload;
    const program = state.views[ViewId.MainMenu].programs.byId[programId];
    if (!program) return;
    program.visible = value;
  });

  builder.addCase($Action.MainMenuView.setTargetProgram, (state, action) => {
    const { payload } = action;
    const { programId } = payload;
    state.views[ViewId.MainMenu].programs.targetId = programId;
  });

  builder.addCase($Action.MainMenuView.setRunningProgram, (state, action) => {
    const { payload } = action;
    const { programId } = payload;
    state.views[ViewId.MainMenu].programs.executing = {
      programId,
      stateId: ProgramStateId.Uninitialised,
    };
  });

  builder.addCase($Action.MainMenuView.setProgramInitialising, (state, action) => {
    const { payload } = action;
    const { programId, percentage } = payload;
    state.views[ViewId.MainMenu].programs.executing = {
      programId,
      stateId: ProgramStateId.Initialising,
      percentage,
    };
  });
};
