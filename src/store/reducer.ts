import { createReducer, } from "@reduxjs/toolkit";
import { $Reducer } from ".";
import { initialState, } from "./state";

export const rootReducer = createReducer(initialState, (builder) => {
  $Reducer.Ui.reduce(builder);
  $Reducer.MainMenuView.reduce(builder);
  $Reducer.Program.reduce(builder);
  $Reducer.ProgramView.reduce(builder);
});
