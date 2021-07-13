import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { State, ViewId } from "../state";

const root = (state: State) => state;


export type self = State['ui'];
export const self = createDraftSafeSelector(
  root,
  (_root): self => _root.ui,
);


export type latency = number;
export const latency = createDraftSafeSelector(
  self,
  (_self): latency => _self.latency);


export type targetViewId = ViewId;
export const targetViewId = createDraftSafeSelector(
  self,
  (_self): targetViewId => _self.targetViewId);
