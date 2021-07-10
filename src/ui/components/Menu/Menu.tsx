import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Selectors } from '../../../store/selector';
import { ProgramId } from '../../../store/state';
import { Button } from '../Button/Button';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuProps } from './Menu.types';
import { HotkeyText } from '../HotkeyText/HotkeyText';

import styles from './Menu.module.scss';

export const Menu: FC<MenuProps> = (props) => {
  const {
    programId,
    commands,
    onMenuItemClick,
    headline,
  } = props;

  return (
    <section className={styles.menu}>
      <h1>
        <span>Action List<span className="ml-8">{'////'}</span></span>
      </h1>
      <Button>
        <h2>
          <HotkeyText text={headline}></HotkeyText>
        </h2>
      </Button>
      <ol className={styles.menuList}>
        {commands.map((command, index) => (
          <MenuItem
            onClick={onMenuItemClick(index)}
            key={`${programId}:${index}`}
            disabled={command.disabled}
            text={command.text}
          />
        ))}
      </ol>
    </section>
  );
};

Menu.displayName = 'Menu';