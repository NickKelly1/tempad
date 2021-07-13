import { createAction } from "@reduxjs/toolkit";
import { ViewId } from "../state";

export const resize = createAction<{
  height: number,
  width: number,
}>('Ui:Resize');


export const focus = createAction<{
  height: number,
  width: number,
}>('Ui:Focus');


export const setViewFading = createAction<{
  viewId: ViewId,
}>('Ui:SetViewFading');


export const clearViewFading = createAction<{
  viewId: ViewId,
}>('Ui:ClearViewFading');


export const setView = createAction<{
  viewId: ViewId,
}>('Ui:SetView');