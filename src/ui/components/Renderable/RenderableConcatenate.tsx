import React, { FC } from "react";
import { RenderableConcatenateData, RenderableConcatenateJoinType } from "./Renderable.types";
import { Renderable } from './Renderable';


export interface RenderableConcatenateProps { renderable: RenderableConcatenateData, }
export const RenderableConcatenate: FC<RenderableConcatenateProps> = (props) => {
  const { renderable } = props;
  const { payload } = renderable;

  switch (payload.joinType) {
    case RenderableConcatenateJoinType.div: {
      return (
        <>
          {payload.values.map((value, i) => (
            <div
              {...value.innerProps}
              key={value.key ?? value.innerProps?.key ?? i}
            >
              <Renderable renderable={value.renderable} />
            </div>
          ))}
        </>
      )
      break;
    }

    case RenderableConcatenateJoinType.span: {
      return (
        <>
          {payload.values.map((value, i) => (
            <span
              {...value.innerProps}
              key={value.key ?? value.innerProps?.key ?? i}
            >
              <Renderable renderable={value.renderable} />
            </span>
          ))}
        </>
      );
      break;
    }
  }

  return null;
}