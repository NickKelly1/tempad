import { FC, ReactElement, } from "react";
import { ResizeListenerProps } from "./ResizeListener.types";
import { useRefEffect } from "../../hooks/use-ref-effect";
import { useValueRef } from "../../hooks/use-value-ref";

export const ResizeListener: FC<ResizeListenerProps> = (props): ReactElement => {
  const {
    onResize,
    children,
    selector,
  } = props;

  const handleResize = useValueRef(onResize);

  const [ref] = useRefEffect<HTMLElement>((node) => {
    const robserver = new ResizeObserver(cb);

    let listenTo: Element | null;
    if (selector) listenTo = document.querySelector(selector);
    else listenTo = node;

    if (listenTo) robserver.observe(node);
    else if (
      // warn if not in
      typeof process !== 'undefined'
      && typeof process === 'object'
      && process !== null
      && typeof process.env === 'string'
      && !((process.env as string).toLowerCase().startsWith('prod')) 
    ) {
      console.warn(`WARNING: ResizeListener no node to observe (selector: "${selector}")`);
    }

    return () => robserver.disconnect();

    function cb() {
      const changeHandler = handleResize.current;
      if (!changeHandler) return;
      changeHandler(node);
    }
  }, [selector, handleResize]);

  return children({ ref, })
}

ResizeListener.displayName = 'Filler';
