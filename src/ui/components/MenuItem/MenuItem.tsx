import { select } from '@redux-saga/core/effects';
import React, { FC, MouseEventHandler, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selector } from '../../../store/selector';
import { MenuItemId } from '../../../store/state';
import { useUnfrozenCb } from '../../hooks/use-unfrozen-cb';
import { Button } from '../Button/Button';

import styles from './MenuItem.module.scss';
import { MenuitemProps } from './MenuItem.types';

export const MenuItem: FC<MenuitemProps> = (props) => {
  const {
    itemId,
  } = props;

  const ui = useSelector(selector.ui);
  const options = useMemo(() => ui.menu.byId[itemId], [ui.menu.byId, itemId]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useUnfrozenCb(() => {
    switch (itemId) {
      case MenuItemId.RunProgram: return null;
      case MenuItemId.Options: return null;
      case MenuItemId.ClearCache: return null;
      default: return null;
    }
  }, [itemId]);

  const Content = useMemo(() => {
    switch (itemId) {
      case MenuItemId.RunProgram: return (
        <Button
          disabled={options.disabled}
          onClick={handleClick}>
          <div><li className={styles.menuitem}><u>R</u>un Program</li></div>
        </Button>
      )
      case MenuItemId.Options: return (
        <Button
          disabled={options.disabled}
          onClick={handleClick}>
          <div><li className={styles.menuitem}><u>O</u>ptions</li></div>
        </Button>
      );
        break;
      case MenuItemId.ClearCache: return (
        <Button
          disabled={options.disabled}
          onClick={handleClick}>
          <div><li className={styles.menuitem}><u>C</u>lear Cache</li></div>
        </Button>
      );
      default: return null
    }
  }, [handleClick, options, itemId]);


  return <>{Content}</>;
  // return (
  //   <li>
  //     {Content}
  //   </li>
  // );
}