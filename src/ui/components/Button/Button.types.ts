import { DetailedHTMLProps, ButtonHTMLAttributes, SyntheticEvent, MouseEventHandler } from 'react';

export interface ClickHandler {
  (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, options: { isDoubleClick: boolean }): unknown;
}

export interface ButtonProps extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'onClick'> {
  _onDoubleClick?: MouseEventHandler<HTMLButtonElement>;
  _onSingleClick?: MouseEventHandler<HTMLButtonElement>;
  onClick?: ClickHandler;
}