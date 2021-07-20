import { useRefEffect, useValueRef } from '@nkp/hooks';
import { FC, ReactElement, } from "react";
import { ResizeListenerProps } from "./ResizeListener.types";

function isNotProduction(): boolean {
  return typeof process !== 'undefined'
    && typeof process === 'object' && process !== null
    && typeof process.env === 'object' && process.env !== null
    && typeof process.env.NODE_ENV === 'string'
    && !(process.env.NODE_ENV.toLowerCase().startsWith('prod'));
}

export const ResizeListener: FC<ResizeListenerProps> = (props): ReactElement => {
  const {
    onResize,
    children,
    selector,
  } = props;

  const handleResize = useValueRef(onResize);

  const [ref] = useRefEffect<HTMLElement>((_node) => {
    if (!_node) return;
    const node = _node;

    const robserver = new ResizeObserver(cb);

    let listenTo: Element | null;
    if (selector) listenTo = document.querySelector(selector);
    else listenTo = node;

    if (listenTo) robserver.observe(listenTo);
    else if (isNotProduction()) {
      console.warn(`WARNING: ResizeListener no node to observe (selector: "${selector}")`);
    }

    return () => robserver.disconnect();

    function cb() {
      const changeHandler = handleResize.current;
      if (!changeHandler) return;
      changeHandler(node);
    }
  });

  return children({ ref, })
}

ResizeListener.displayName = 'Filler';
