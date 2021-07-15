import clsx from "clsx";
import React, { FC, MouseEventHandler, useCallback, useState } from "react";
import { ProgramIconProps } from "./ProgramIcon.types";
import { Button } from "../Button/Button";

import styles from './ProgramIcon.module.scss';
import { getSvgIcon } from "../../../util/svg-icon";
import { useRefEffect } from "../../hooks/use-ref-effect";
import { PlainRect, ProgramId } from "../../../store/state";
import { useValueRef } from "../../hooks/use-value-ref";

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

  const handleIconRectChange = useValueRef(onIconRectChange);

  const [containerRef] = useRefEffect<HTMLDivElement>((containerNode) => {
    const robserver = new ResizeObserver((resizes) => {
      const changeHandler = handleIconRectChange.current;
      if (!changeHandler) return;
      resizes.forEach(resize => {
        if (resize.target != containerNode) return;
        const _rect = containerNode.getBoundingClientRect();
        const rect: PlainRect = {
          bottom: _rect.bottom,
          height: _rect.height,
          left: _rect.left,
          right: _rect.right,
          top: _rect.top,
          width: _rect.width,
          x: _rect.x,
          y: _rect.y,
        };
        changeHandler(rect);
      })
    });
    robserver.observe(containerNode);
    return () => robserver.disconnect();
  }, [handleIconRectChange]);

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
