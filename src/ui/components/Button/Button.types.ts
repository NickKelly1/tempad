import { DetailedHTMLProps, ButtonHTMLAttributes, SyntheticEvent, MouseEventHandler } from 'react';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  _onDoubleClick?: MouseEventHandler<HTMLButtonElement>;
  _onSingleClick?: MouseEventHandler<HTMLButtonElement>;
}