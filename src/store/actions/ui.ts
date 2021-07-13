import { createAction } from "@reduxjs/toolkit";
import { ViewId } from "../state";

export const handleResize = createAction<{
  height: number,
  width: number,
}>('Ui:HandleResize');


export const handleFocus = createAction<{
  height: number,
  width: number,
}>('Ui:HandleFocus');


export const resizeTempac = createAction<{
  height: number,
  width: number,
}>('Ui:ResizeTempac');

export const setViewFading = createAction<{
  viewId: ViewId,
}>('Ui:SetViewFading');


export const clearViewFading = createAction<{
  viewId: ViewId,
}>('Ui:ClearViewFading');


export const setView = createAction<{
  viewId: ViewId,
}>('Ui:SetView');