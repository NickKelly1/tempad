import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { State as _State } from "../state";

export * as Views from './views';

const root = (state: _State) => state;

export type State = _State;
export const state = createDraftSafeSelector(root, (state): State => state);

export type Ui = _State['ui'];
export const ui = createDraftSafeSelector(state, (_state: _State): Ui => _state.ui);

export type Latency = _State['ui']['latency'];
export const latency = createDraftSafeSelector(state, (_state: _State): Latency => _state.ui.latency);