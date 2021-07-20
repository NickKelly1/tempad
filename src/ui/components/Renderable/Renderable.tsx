import React, { FC } from "react";
import { RenderableData, RenderableType } from "./Renderable.types";
import { RenderableConcatenate } from "./RenderableConcatenate";
import { RenderableText } from "./RenderableText";
import { RenderableHotkey } from './RenderableHotkey';


export interface RenderableProps {
  renderable: RenderableData,
}

export const Renderable: FC<RenderableProps> = (props) => {
  const {
    renderable,
  } = props;

  switch (renderable.type) {
    case RenderableType.Hotkey: return <RenderableHotkey renderable={renderable} />
    case RenderableType.Concatenate: return <RenderableConcatenate renderable={renderable} />
    case RenderableType.Text: return <RenderableText renderable={renderable} />
  }

  return null;
}
