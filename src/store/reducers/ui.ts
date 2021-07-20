import { Draft } from 'immer';
import { ActionReducerMapBuilder, AnyAction, createReducer } from '@reduxjs/toolkit';
import { Reducer } from 'react';
import { $Action } from '..';
import { State } from '../state';

type _State = Draft<State['ui']>;

function applyResize(state: _State, width: number, height: number) {
  state.tempad.height = height;
  state.tempad.width = width;
  // (width / 23 seems) to give a good, size
  // TODO: scale with height if orientation is flipped
  state.tempad.fontSize = Math.round(width / 23);
}

export const reduce = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase($Action.Ui.resizeTempad, (state, action) => {
    const { payload } = action;
    const { height, width } = payload;
    state.ui.tempad.height = height;
    state.ui.tempad.width = width;
    state.ui.tempad.fontSize = Math.round(width / 23);
  });

  builder.addCase($Action.Ui.setViewFading, (state, action) => {
    const { payload } = action;
    const { viewId } = payload;
    if (state.ui.fadingViewIds.includes(viewId)) return;
    state.ui.fadingViewIds.push(viewId);
  });

  builder.addCase($Action.Ui.clearViewFading, (state, action) => {
    const { payload } = action;
    const { viewId } = payload;
    if (!state.ui.fadingViewIds.includes(viewId)) return;
    state.ui.fadingViewIds.filter(vid => vid !== viewId);
  });

  builder.addCase($Action.Ui.setView, (state, action) => {
    const { payload } = action;
    const { viewId } = payload;
    state.ui.targetViewId = viewId;
  });
};
