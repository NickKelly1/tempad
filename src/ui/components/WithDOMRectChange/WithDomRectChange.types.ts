import { DOMRectOnResize } from "@nkp/hooks";

export interface WithDOMRectChangeProps<T> {
  selector?: string,
  domRectOnResize?: DOMRectOnResize,
  children: (ref: React.Ref<T>) => JSX.Element,
}
