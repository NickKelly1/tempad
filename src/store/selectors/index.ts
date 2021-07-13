import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { State, State as _State, ViewId } from "../state";

export * as Ui from './ui';
export * as Core from './core';
export * as MainMenuView from './main-menu-view';
export * as ProgramView from './program-view';

const root = (state: _State) => state;

export type self = State;
export const self = createDraftSafeSelector(
  root,
  (_root): self => _root,
);
