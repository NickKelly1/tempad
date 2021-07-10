import { createAction } from "@reduxjs/toolkit";

export interface TodoPayload {};
export const todo = createAction<TodoPayload>('Views:Timedoor:Events:Todo');
export type Todo = ReturnType<typeof todo>;
