import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Actions } from '../action';
import { State } from '../state';

export function reducer(builder: ActionReducerMapBuilder<State>) {
  builder.addCase(Actions.Commands.setFrozen, (state, action) => {
    const { payload } = action;
    const { value } = payload;
    state.ui.isFrozen = value;
  });

  builder.addCase(Actions.Commands.setView, (state, action) => {
    const { payload } = action;
    const { viewId } = payload;
    state.ui.views.targetId = viewId;
  });
}