import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selector } from '../../../store/selector';
import { ProgramId } from '../../../store/state';
import { Button } from '../Button/Button';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuProps } from './Menu.types';
import { HotkeyText } from '../HotkeyText/HotkeyText';

import styles from './Menu.module.scss';

export const Menu: FC<MenuProps> = (props) => {
  const ui = useSelector(selector.ui);

  const programId: undefined | ProgramId = ui.focused?.programId;
  const headline = (programId === undefined)
    ? undefined
    : ui.programs.byId[programId].headline;

  return (
    <div className={styles.menu}>
      <span>Action List<span className="ml-8">{'////'}</span></span>
      <br />
      <Button>
        <HotkeyText text={headline}></HotkeyText>
      </Button>
      <ol className={styles.menuList}>
        {ui.menu.ids.map(itemId => (
          <MenuItem key={itemId} itemId={itemId} />
        ))}
      </ol>
    </div>
  );
}