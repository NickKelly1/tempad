import React, { FC } from 'react';
import { Button } from '../Button/Button';
import { HotkeyText } from '../HotkeyText/HotkeyText';

import styles from './ProgramCommandList.module.scss';
import { ProgramCommandListProps } from './ProgramCommandList.types';
import { ProgramCommand } from '../ProgramCommand/ProgramCommand';

export const ProgramCommandList: FC<ProgramCommandListProps> = React.memo((props) => {
  const {
    programId,
    commands,
    onMenuItemClick,
    headline,
  } = props;

  return (
    <section className={styles.program_command_menu}>
      <h1>
        <span>Action List<span className="ml-8">{'////'}</span></span>
      </h1>
      <Button>
        <h2>
          <HotkeyText text={headline}></HotkeyText>
        </h2>
      </Button>
      <ol className={styles.program_command_list}>
        {commands.map((command, index) => (
          <ProgramCommand
            onClick={onMenuItemClick(index)}
            key={`${programId}:${index}`}
            disabled={command.disabled}
            text={command.label}
            activated={command.active}
          />
        ))}
      </ol>
    </section>
  );
});

ProgramCommandList.displayName = 'Menu';