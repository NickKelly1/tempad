import { HTMLProps, Key } from "react";
import { OptionText } from "../../../store/state";

export enum RenderableType {
  Text = 'RenderType:Text',
  Hotkey = 'RenderType:Hotkey',
  Concatenate = 'RenderType:Concatenate',
}

export enum RenderableConcatenateJoinType {
  div = 'RenderableConcatenateJoinType:div',
  span = 'RenderableConcatenateJoinType:span',
}

export enum RenderableTextComponentType {
  p = 'RenderableTextComponentType:p',
  div = 'RenderableTextComponentType:div',
  span = 'RenderableTextComponentType:span',
}

export interface BaseRenderable<T> { type: T; }


// enum RenderableDelayMergeMode {
//   Merge = 'RenderableDelayMergeMode:Merge',
// }

export interface RenderableHotkeyData extends BaseRenderable<RenderableType.Hotkey> {
  payload: {
    text: OptionText,
  },
}

export interface RenderableConcatenateData extends BaseRenderable<RenderableType.Concatenate> {
  payload: {
    values: {
      innerProps?: HTMLProps<any>,
      key?: Key,
      renderable: RenderableData,
    }[],
    joinType: RenderableConcatenateJoinType,
  },
}

export interface RenderableTextData extends BaseRenderable<RenderableType.Text> {
  payload: {
    componentType: RenderableTextComponentType,
    innerProps: HTMLProps<HTMLElement>,
    text: string,
  },
} 

export type RenderableData =
  | RenderableConcatenateData
  | RenderableHotkeyData
  | RenderableTextData
;
