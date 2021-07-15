import React, { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { $Selector } from "../../../store/selector";
import { MainMenuProgramIconContainerProps } from "./MainMenuProgramIconContainer.types";
import { ClickHandler } from "../Button/Button.types";
import { ProgramIcon } from "../ProgramIcon/ProgramIcon";
import { PlainRect, } from "../../../store/state";

import styles from "./MainMenuProgramIconContainer.module.scss";
import clsx from "clsx";
import { $Action } from "../../../store";

export const MainMenuProgramIconContainer: FC<MainMenuProgramIconContainerProps> = (props) => {
  const {
    className,
    programId,
  } = props;

  const dispatch = useDispatch();
  const programs = useSelector($Selector.MainMenuView.programAggregates);
  const program = programs.byId[programId];
  // const isSelected = useSelector($Selector.MainMenuView.targetProgram Views.MainMenu.selected) === programId;
  // const isActivated = useSelector($Selector.Views.MainMenu.activated) === programId;

  const handleClick: ClickHandler = useCallback((evt) => {
    dispatch($Action.MainMenuView.handleSetTargetProgram({ programId }));
  }, [dispatch, programId]);

  const handleIconRectChange = useCallback((rect: PlainRect) => {
    dispatch($Action.MainMenuView.iconRectChanged({ programId, rect }));
  }, [programId, dispatch]);

  if (!program) return null;

  const {
    instance: {
      commandLabel,
      commands,
      iconSvg,
      iconLabel,
      stateId,
    },
    mainMenu: {
      iconStateId,
      svgRect,
      visible,
    }
  } = program;

  return (
    <ProgramIcon
      label={iconLabel}
      iconSvg={iconSvg}
      visible={visible}
      onClick={handleClick}
      className={clsx(styles.mainMenuProgramIconContainer, className)}
      onIconRectChange={handleIconRectChange}
    />
  )
}
