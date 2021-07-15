import { PlainRect } from "../store/state";

export function toPlainRect(dom: DOMRect | DOMRectReadOnly) {
  const plain: PlainRect = {
    bottom: dom.bottom,
    height: dom.height,
    left: dom.left,
    right: dom.right,
    top: dom.top,
    width: dom.width,
    x: dom.x,
    y: dom.y,
  };
  return plain;
}