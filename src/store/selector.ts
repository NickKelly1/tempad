import { createDraftSafeSelector, createSelector, createSlice } from "@reduxjs/toolkit";
import { State } from "./state";

export namespace selector {
  const self = (state: State) => state;

  export type Ui = State['ui'];
  export const ui = createDraftSafeSelector(self, (state: State): Ui => state.ui);

  export type IsFrozen = State['ui']['isFrozen'];
  export const isFrozen = createDraftSafeSelector(self, (state: State): IsFrozen => state.ui.isFrozen);
}


