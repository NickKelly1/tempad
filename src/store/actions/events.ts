import { createAction } from "@reduxjs/toolkit";

export interface ResizePayload { height: number, width: number, };
export const resize = createAction<ResizePayload>('Events:Resize');
export type Resize = ReturnType<typeof resize>;