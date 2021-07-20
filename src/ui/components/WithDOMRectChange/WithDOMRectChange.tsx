import { useDOMRect } from "@nkp/hooks";
import { WithDOMRectChangeProps } from "./WithDomRectChange.types";

export const WithDOMRectChange = function <T extends HTMLElement = HTMLElement>(props: WithDOMRectChangeProps<T>) {
  const { selector, domRectOnResize: onDOMRectResize, children } = props;
  const ref = useDOMRect<T>(selector, onDOMRectResize);
  return children(ref);
}
