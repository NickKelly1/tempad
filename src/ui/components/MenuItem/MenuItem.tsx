import React, { FC, useCallback, } from 'react';
import { Button } from '../Button/Button';
import { HotkeyText } from '../HotkeyText/HotkeyText';
import clsx from 'clsx';

import styles from './MenuItem.module.scss';
import { MenuItemProps } from './MenuItem.types';
import { useCallbackRef } from '../../hooks/use-callback-ref';
import { ClickHandler } from '../Button/Button.types';

export const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    onClick,
    disabled,
    text,
    selected,
    activated,
  } = props;

  return (
    <>
      <li
        className={clsx(
          styles.program_command,
          disabled && 'disabled',
          selected && styles.selected,
          activated && styles.activated,
        )}
        >
        <Button
          disabled={disabled}
          onClick={onClick}
          >
          <HotkeyText text={text} />
        </Button>
      </li>
    </>
  );
};

MenuItem.displayName = 'MenuItem';