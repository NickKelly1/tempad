import clsx from "clsx";
import React, { FC } from "react";
import { ProgramIconProps } from "./ProgramIcon.types";
import { Button } from "../Button/Button";

import styles from './ProgramIcon.module.scss';
import { GetSvg } from "../../../util/svg";


export const ProgramIcon: FC<ProgramIconProps> = React.memo((props) => {
  const {
    item,
    isSelected,
    isActivated,
    onClick,
  } = props;

  const {
    label,
    programId,
    svg,
  } = item;

  const Svg = GetSvg(svg)
  let focusClass: string | null = null;
  if (isSelected) focusClass = styles.selected;
  else if (isActivated) focusClass = styles.activated;

  return (
    <div className={clsx(styles.programOption, focusClass)} >
      <Button className={styles.btn} onClick={onClick} >
        <Svg className={styles.icon} />
        <div><span className={styles.label}>{label}</span></div>
      </Button>
    </div>
  );
})

ProgramIcon.displayName = 'ProgramIcon';