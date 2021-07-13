import React, { FC, MouseEventHandler, useCallback, useState } from 'react';
import { Button } from '../Button/Button';
import { HotkeyText } from '../HotkeyText/HotkeyText';
import clsx from 'clsx';

import styles from './ProgramCommand.module.scss';
import { ProgramCommandProps } from './ProgramCommand.types';

export const ProgramCommand: FC<ProgramCommandProps> = React.memo((props) => {
  const {
    className,
    onClick,
    disabled,
    activated,
    text,
  } = props;

  return (
    <>
      <li className={clsx(
        styles.program_command,
        className,
        disabled && 'disabled',
      )}
      >
        <Button
          disabled={disabled}
          onClick={onClick}
          className={clsx(activated && styles.activated)}
          >
          <HotkeyText text={text} />
        </Button>
      </li>
    </>
  );
});

ProgramCommand.displayName = 'ProgramCommand';