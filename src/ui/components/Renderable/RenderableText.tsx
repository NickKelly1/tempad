import React, { FC, HTMLProps } from "react";
import { RenderableTextData, RenderableTextComponentType } from "./Renderable.types";

export interface RenderableTextProps { renderable: RenderableTextData }
export const RenderableText: FC<RenderableTextProps> = (props) => {
  const { renderable } = props;
  const { payload } = renderable;
  const { text, componentType, innerProps } = payload;

  switch (componentType) {
    case RenderableTextComponentType.div:
      return (
        <div {...innerProps as HTMLProps<HTMLDivElement>}>
          {text}
        </div>
      );
    case RenderableTextComponentType.span:
      return (
        <span {...innerProps as HTMLProps<HTMLSpanElement>}>
          {text}
        </span>
      );
    case RenderableTextComponentType.p:
      return (
        <p {...innerProps as HTMLProps<HTMLParagraphElement>}>
          {text}
        </p>
      );
  }

  return null;
}