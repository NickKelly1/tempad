import clsx from "clsx";
import React, { FC, MouseEventHandler, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selector } from "../../../store/selector";
import { ProgramStateId, ProgramId } from "../../../store/state";
import { useUnfrozenCb } from "../../hooks/use-unfrozen-cb";
import { ProgramOptionProps } from "./ProgramOption.types";

import { Button } from "../Button/Button";
import { actions } from "../../../store/action";

// import styles from './ProgramOption.module.scss';
import styles from './ProgramOption.module.scss';
import { GetSvg } from "../../../util/svg";


export const ProgramOption: FC<ProgramOptionProps> = (props) => {
  const {
    programId,
  } = props;

  const ui = useSelector(selector.ui);
  const program = ui.programs.byId[programId];
  const focused = ui.focused;

  const dispatch = useDispatch();

  const handleSingleClick: MouseEventHandler<HTMLButtonElement> = useUnfrozenCb((evt) => {
    dispatch(actions.singleClickProgram({ programId }));
  }, [programId]);

  const handleDoubleClick: MouseEventHandler<HTMLButtonElement> = useUnfrozenCb((evt) => {
    dispatch(actions.doubleClickProgram({ programId }));
  }, [programId]);

  const focusClass = useMemo(() => {
    if (focused?.programId !== programId) return null;
    if (focused.stateId === ProgramStateId.Selected) return styles.selected;
    if (focused.stateId === ProgramStateId.Activated) return styles.active;
    return null;
  }, [programId, focused]);

  const Svg = useMemo(() => GetSvg(program.svg), [program.svg]);

  return (
    <div className={clsx(styles.programOption, focusClass)} >
      <Button
        className={styles.btn}
        _onSingleClick={handleSingleClick}
        _onDoubleClick={handleDoubleClick}
        >
        <Svg className={styles.icon} />
        <div>{program.label}</div>
      </Button>
    </div>
  );
}
