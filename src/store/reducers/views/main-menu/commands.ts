import { ActionReducerMapBuilder, createAction } from "@reduxjs/toolkit";
import { Actions } from "../../../action";
import { Selectors } from "../../../selector";
import { ProgramStateId, State, ViewId } from "../../../state";

export function reducer(builder: ActionReducerMapBuilder<State>) {
  builder.addCase(Actions.Views.MainMenu.Commands.enableCommand, (state, action) => {
    const { payload } = action;
    const { index, value } = payload;
    // const mainMenu = Selectors.Views.MainMenu.self(state);
    // const target = Selectors.Views.MainMenu.target(state);
    // if(!target) return;
    // const program = mainMenu.programs.byId[target.programId];
    // if (!program) return;
    // if (index >= program.menu.commands.length) return;
    // program.menu.commands[index].disabled = value;

    // const mainMenu = Selectors.Views.MainMenu.self(state);
    // const target = Selectors.Views.MainMenu.target(state);
    const programId = state.ui.views.byId[ViewId.MainMenu].programs.target?.programId;
    if(programId == null) return;
    if (index >= state.ui.views.byId[ViewId.MainMenu].programs.byId[programId].menu.commands.length) return;
    state.ui.views.byId[ViewId.MainMenu].programs.byId[programId].menu.commands[index].disabled = !value;
  });

  builder.addCase(Actions.Views.MainMenu.Commands.setTarget, (state, action) => {
    const { payload } = action;
    const { programId } = payload;
    const currentTarget = Selectors.Views.MainMenu.target(state);
    if (currentTarget?.programId === programId) return;
    // set the program as target
    state.ui.views.byId[ViewId.MainMenu].programs.target = {
      isLoading: false,
      programId,
      state: ProgramStateId.None,
    }
  });


  builder.addCase(Actions.Views.MainMenu.Commands.setTargetState, (state, action) => {
    const { payload } = action;
    const { programStateId } = payload;
    const target = state.ui.views.byId[ViewId.MainMenu].programs.target;
    if (target) {
      target.state = programStateId;
    }
  });
}
