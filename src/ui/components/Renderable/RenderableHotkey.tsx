import React, { FC } from "react";
import { HotkeyText } from "../HotkeyText/HotkeyText";
import { RenderableHotkeyData } from "./Renderable.types";

export interface RenderableHotkeyProps { renderable: RenderableHotkeyData }
export const RenderableHotkey: FC<RenderableHotkeyProps> = (props) => {
  const { renderable } = props;
  const { payload } = renderable;
  const { text, } = payload;

  return (
    <HotkeyText
      text={text}
    />
  )
}
