import React, { HTMLAttributes, RefCallback } from "react";

export interface ResizeHandler<T extends HTMLElement = HTMLElement> { (element: T): void };
export interface ResizeListenerProps {
  selector?: null | string;
  onResize?: ResizeHandler;
  children: (
    props: HTMLAttributes<HTMLElement> & {
      ref: RefCallback<HTMLElement>
    }
  ) => React.ReactElement,
}
