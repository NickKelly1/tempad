import React, { FC, } from 'react';
import { Button } from '../Button/Button';
import { HotkeyText } from '../HotkeyText/HotkeyText';
import clsx from 'clsx';

import styles from './MenuItem.module.scss';
import { MenuItemProps } from './MenuItem.types';

export const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    onClick,
    disabled,
    text,
  } = props;

  return (
    <>
      <li className={clsx(styles.menuItem, disabled && 'disabled')}>
        <Button
          disabled={disabled}
          onClick={onClick}>
          <HotkeyText text={text} />
        </Button>
      </li>
    </>
  );
};

MenuItem.displayName = 'MenuItem';