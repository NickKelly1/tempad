import { createReducer, current } from "@reduxjs/toolkit";
import { Actions } from "./action";
import { Selectors } from "./selector";
import { initialState, ProgramId, ProgramStateId, State, ViewId } from "./state";

import * as Root from './reducers';

export const reducer = createReducer(initialState, (builder) => {
  Root.reducer(builder);
});
