import React, {
  ForwardedRef,
  forwardRef,
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useRefs } from '../../hooks/use-refs';
import { ButtonProps } from './Button.types';

const DOUBLE_CLICK_THRESHOLD = 200;

/**
 * Double-clickable Button
 */
export const Button = memo(forwardRef((
  props: ButtonProps,
  outerRef: ForwardedRef<HTMLButtonElement>
) => {
  const {
    onClick,
    _onDoubleClick,
    _onSingleClick,
    children,
    ...otherProps
  } = props;

  // reference singleClick
  const _onSingleClickRef = useRef(_onSingleClick);
  useEffect(() => void (_onSingleClickRef.current = _onSingleClick), [_onSingleClick]);

  const innerRef = useRefs(outerRef);

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
        _onSingleClickRef.current?.(evt);
      }, DOUBLE_CLICK_THRESHOLD)};
      onClick?.(evt, { isDoubleClick: false });
    } else {
      // has been clicked already
      clearTimeout(lastClick.current.timer);
      lastClick.current = null;
      _onDoubleClick?.(evt);
      onClick?.(evt, { isDoubleClick: true });
    }
  }, [_onDoubleClick, onClick]);


  return (
    <button ref={innerRef} onClick={handleClick} {...otherProps}>
      {children}
    </button>
  );
}));

Button.displayName = 'Button';