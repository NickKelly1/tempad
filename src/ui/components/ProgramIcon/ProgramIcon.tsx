import clsx from "clsx";
import React, { FC, } from "react";
import { ProgramIconProps } from "./ProgramIcon.types";
import { Button } from "../Button/Button";

import styles from './ProgramIcon.module.scss';
import { getSvgIcon } from "../../../util/svg-icon";
import { useDOMRect } from '@nkp/hooks';
import { toPlainRect } from "../../../util/to-plain-rect";

export const ProgramIcon: FC<ProgramIconProps> = React.memo((props) => {
  const {
    className,
    onClick,
    onIconRectChange,
    iconSvg,
    visible,
    label,
    style,
    activated,
  } = props;

  const IconSvg = getSvgIcon(iconSvg)

  const containerRef = useDOMRect<HTMLDivElement>(
    'body',
    (rect) => {
      onIconRectChange?.(toPlainRect(rect));
    },
  );

  return (
    <div
      style={style}
      ref={containerRef}
      className={clsx(
        className,
        styles.program_icon_container,
        !visible && 'hidden',
      )}
      >
      <Button
        className={clsx(activated && styles.activated)}
        onClick={onClick}
        >
        <IconSvg className={styles.icon} />
        <div><span className={styles.label}>{label}</span></div>
      </Button>
    </div>
  );
});

ProgramIcon.displayName = 'ProgramIcon';
