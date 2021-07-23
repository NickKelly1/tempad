
/**
 * Is the object a HTML element?
 *
 * @param unk
 * @returns
 */
export function isElement(unk: unknown): unk is HTMLElement {
  // must be defined
  if (!unk) return false;

  // must be typeof object
  if (!(typeof unk === 'object')) return false;

  // check HTMLeLement
  if ((typeof HTMLElement !== 'undefined')
    && unk instanceof HTMLElement
  ) {
    return true;
  }

  // check Node & Element-like
  if ((typeof Node !== 'undefined')
    && unk instanceof Node
    && (unk.nodeType === 1)
  ) {
    return true;
  }

  // check Node-like & Element-like
  if (((unk as Node).nodeType === 1)
      && ((typeof (unk as Node).ownerDocument) === 'object')
      // element-like
      && ((typeof (unk as HTMLElement).style) === 'object')
  ) {
    return true;
  }

  // some unknown object
  return false;
}