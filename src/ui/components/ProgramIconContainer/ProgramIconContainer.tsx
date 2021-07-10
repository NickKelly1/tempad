import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../../../store/selector";
import { useUnfrozenCb } from "../../hooks/use-unfrozen-cb";
import { ProgramIconContainerProps } from "./ProgramIconContainer.types";
import { Actions } from "../../../store/action";
import { ClickHandler } from "../Button/Button.types";
import { ProgramIcon } from "../ProgramIcon/ProgramIcon";

export const ProgramIconContainer: FC<ProgramIconContainerProps> = (props) => {
  const {
    className,
    programId,
  } = props;

  const dispatch = useDispatch();
  const mainMenu = useSelector(Selectors.Views.MainMenu.self);
  const isSelected = useSelector(Selectors.Views.MainMenu.selected) === programId;
  const isActivated = useSelector(Selectors.Views.MainMenu.activated) === programId;
  const item = mainMenu.programs.byId[programId];

  const handleClick: ClickHandler = useUnfrozenCb((evt, { isDoubleClick }) => {
    if (isDoubleClick) {
      dispatch(Actions
        .Views
        .MainMenu
        .Events
        .programDoubleClicked({ programId }));
    }
    else {
      dispatch(Actions
        .Views
        .MainMenu
        .Events
        .programClicked({ programId }));
    }
  }, [dispatch, programId]);

  return (
    <ProgramIcon
      item={item}
      onClick={handleClick}
      isActivated={isActivated}
      isSelected={isSelected}
      className={className}
    />
  )
}
