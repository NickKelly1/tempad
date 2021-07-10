import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Actions } from '../action';
import { State } from '../state';

export function reducer(builder: ActionReducerMapBuilder<State>) {
  builder.addCase(Actions.Events.resize, (state, action) => {
    const { payload } = action;
    const { height, width } = payload;
    state.ui.tempac.height = height;
    state.ui.tempac.width = width;
    // (width / 23 seems) to give a good, size
    // TODO: scale with height if orientation is flipped
    state.ui.tempac.fontSize = Math.round(width / 23);
  });
}
