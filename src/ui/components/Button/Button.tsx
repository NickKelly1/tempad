import React, {
  ForwardedRef,
  forwardRef,
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { ButtonProps } from './Button.types';
import { useMergeRefs, useValueRef } from '@nkp/hooks';

const DOUBLE_CLICK_THRESHOLD = 200;

/**
 * Double-clickable Button
 */
export const Button = memo(forwardRef((
  props: ButtonProps,
  outerRef: ForwardedRef<HTMLButtonElement>
) => {
  const {
    onClick: discard1,
    _onDoubleClick: discard2,
    _onSingleClick: discard3,

    children,
    ...otherProps
  } = props;

  // reference singleClick
  const _onDoubleClick = useValueRef(props._onDoubleClick);
  const _onSingleClick = useValueRef(props._onSingleClick);
  const _onClick = useValueRef(props.onClick);

  const innerRef = useMergeRefs(outerRef);

  interface LastClick { at: number; timer: ReturnType<typeof setTimeout>; }
  const lastClick = useRef<null | LastClick>(null);

  const handleClick = useCallback((evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const now = Date.now();
    if (lastClick.current === null) {
      // not clicked
      evt.persist();
      lastClick.current = { at: now, timer: setTimeout(() => {
        // single click successful - clear pending
        lastClick.current = null;
        _onSingleClick.current?.(evt);
      }, DOUBLE_CLICK_THRESHOLD)};
      _onClick.current?.(evt, { isDoubleClick: false });
    } else {
      // has been clicked already
      clearTimeout(lastClick.current.timer);
      lastClick.current = null;
      _onDoubleClick.current?.(evt);
      _onClick.current?.(evt, { isDoubleClick: true });
    }
  }, [_onClick, _onSingleClick, _onDoubleClick]);


  return (
    <button ref={innerRef} onClick={handleClick} {...otherProps}>
      {children}
    </button>
  );
}));

Button.displayName = 'Button';