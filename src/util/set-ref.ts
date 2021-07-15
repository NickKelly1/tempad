import { LegacyRef, Ref } from "react";

export function setRef<T>(node: T | null) {
  return function doSetRef(ref: null | Ref<T>) {
    if (!ref) return;
    switch (typeof ref) {
      case 'function':
        ref(node);
        break;
      case 'object':
        (ref as { current: T | null }).current = node;
        break;
    }
  }
}