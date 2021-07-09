import React, { FC, MouseEventHandler, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selector } from '../../../store/selector';
import { useUnfrozenCb } from '../../hooks/use-unfrozen-cb';
import { Button } from '../Button/Button';
import { HotkeyText } from '../HotkeyText/HotkeyText';
import clsx from 'clsx';

import styles from './MenuItem.module.scss';
import { MenuitemProps } from './MenuItem.types';

export const MenuItem: FC<MenuitemProps> = (props) => {
  const {
    itemId,
  } = props;

  const ui = useSelector(selector.ui);
  const option = useMemo(() => ui.menu.byId[itemId], [ui.menu.byId, itemId]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useUnfrozenCb(() => {
    //
  }, [option, itemId]);

  return (
    <>
      <li key={itemId} className={clsx(styles.menuItem, option.disabled && 'disabled')}>
        <Button
          disabled={option.disabled}
          onClick={handleClick}>
          <HotkeyText text={option.text} />
        </Button>
      </li>
    </>
  );
}