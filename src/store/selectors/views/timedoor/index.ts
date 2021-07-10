import { createDraftSafeSelector } from "@reduxjs/toolkit"
import { ProgramId, State, ViewId } from "../../../state";

const root = (state: State): State => state;

export type Self = State['ui']['views']['byId'][ViewId.TimedoorProgram];
export const self = createDraftSafeSelector(
  root,
  (_state): Self => _state.ui.views.byId[ViewId.TimedoorProgram],
);