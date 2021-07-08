import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selector } from '../../../store/selector';
import { ProgramId } from '../../../store/state';
import { Button } from '../Button/Button';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuProps } from './Menu.types';

import styles from './Menu.module.scss';

export const Menu: FC<MenuProps> = () => {
  const ui = useSelector(selector.ui);

  return (
    <div className={styles.menu}>
        <span>Action List<span className="ml-8">{'////'}</span></span>
        <br />
        {/* call to action */}
        <Button>
          {(() => {
            switch (ui.focused?.programId) {
              case undefined:
              case null:
                return <><u>S</u>elect Program</>
              case ProgramId.Timedoor:
                return <><u>T</u>ime Door</>
              default:
                return <><u>U</u>nknown</>
            }
          })()}
        </Button>
      <ol className={styles.menulist}>
        {ui.menu.ids.map(itemId => (
          <MenuItem key={itemId} itemId={itemId} />
        ))}
      </ol>
    </div>
  );
}