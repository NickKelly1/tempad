import clsx from "clsx";
import React, { FC, MouseEventHandler, useCallback, useState } from "react";
import { ProgramIconProps } from "./ProgramIcon.types";
import { Button } from "../Button/Button";

import styles from './ProgramIcon.module.scss';
import { getSvgIcon } from "../../../util/svg-icon";
import { useRefEffect } from "../../hooks/use-ref-effect";
import { PlainRect, ProgramId } from "../../../store/state";

function getSvgNode(btn: HTMLButtonElement) {
  const svgNode = btn.querySelector(`svg.${styles.icon}`);
  if (!svgNode) {
    console.error('failed to find svgNode');
    return null;
  }
  return svgNode;
}

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

  const [containerRef] = useRefEffect<HTMLDivElement>((containerNode) => {
    if (!onIconRectChange) return;
    const robserver = new ResizeObserver((resizes) => {
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
        onIconRectChange(rect);
      })
    });
    robserver.observe(containerNode);
    return () => robserver.disconnect();
  }, [onIconRectChange]);

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
})

ProgramIcon.displayName = 'ProgramIcon';
