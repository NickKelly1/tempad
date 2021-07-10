import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Selectors } from '../../../store/selector';
import { ProgramId } from '../../../store/state';
import { Button } from '../Button/Button';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuContainerProps } from './MenuContainer.types';
import { HotkeyText } from '../HotkeyText/HotkeyText';
import { ClickHandler } from '../Button/Button.types';
import { Menu } from '../Menu/Menu';
import { Actions } from '../../../store/action';

export const MenuContainer: FC<MenuContainerProps> = (props) => {
  const ui = useSelector(Selectors.ui);

  const dispatch = useDispatch();
  const mainMenu = useSelector(Selectors.Views.MainMenu.self);
  const program = useSelector(Selectors.Views.MainMenu.targetProgram);
  const commands = useSelector(Selectors.Views.MainMenu.targetCommands);

  // const handleMenuItemClick = useCallback((index: number): ClickHandler => (evt) => {
  //   const command = commands?.[index]
  //   if (command) {
  //     dispatch(Actions.Commands.fireOpcode({ opcode: command.opcode }));
  //   }
  // }, [dispatch, commands])
  const handleMenuItemClick = (index: number): ClickHandler => (evt) => {
    const command = commands?.[index]
    if (command) {
      dispatch(Actions.Commands.fireOpcode({ opcode: command.opcode }));
    }
  };

  return (
    <Menu
      commands={commands ?? mainMenu.defaultMenu.commands}
      onMenuItemClick={handleMenuItemClick}
      programId={program?.programId ?? null}
      headline={program?.menu.headline ?? mainMenu.defaultMenu.headline}
    />
  );
}