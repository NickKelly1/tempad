import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { $Selector } from '../../../store/selector';
import { MenuContainerProps } from './MenuContainer.types';
import { ClickHandler } from '../Button/Button.types';
import { Menu } from '../Menu/Menu';

export const MenuContainer: FC<MenuContainerProps> = (props) => {
  const ui = useSelector($Selector.ui);

  const dispatch = useDispatch();
  const mainMenu = useSelector($Selector.Views.MainMenu.self);
  const program = useSelector($Selector.Views.MainMenu.targetProgram);
  const commands = useSelector($Selector.Views.MainMenu.targetCommands);

  const handleMenuItemClick = (index: number): ClickHandler => (evt) => {
    dispatch(Actions.Views.MainMenu.Events.menuItemClicked({ index }));
  };

  return (
    <Menu
      commands={commands ?? mainMenu.defaultCommands.commands}
      onMenuItemClick={handleMenuItemClick}
      programId={program?.programId ?? null}
      headline={program?.menu.headline ?? mainMenu.defaultCommands.headline}
    />
  );
}