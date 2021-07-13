import React, { FC } from "react";
import { MainMenuViewProps } from "./MainMenuView.types";
import { Button } from "../../components/Button/Button";
import { HotkeyText } from "../../components/HotkeyText/HotkeyText";
import { ProgramCommand } from "../../components/ProgramCommand/ProgramCommand";
import { ProgramIcon } from "../../components/ProgramIcon/ProgramIcon";

import styles from './MainMenuView.module.scss';

export const MainMenuView: FC<MainMenuViewProps> = React.memo((props) => {
  const {
    targetProgramId,
    programs,
    commandLabel,
    commands,
  } = props;

  return (
    <div className={styles.main_menu_view}>
      <section className={styles.program_icons}>
        {programs.ids.map((programId) => {
          const program = programs.byId[programId]!;
          return (
            <ProgramIcon
              key={program.programId}
              className={styles.program_icon}
              onClick={program.onClick}
              activated={programId === targetProgramId}
              label={program.instance.iconLabel}
              visible={program.mainMenu.visible}
              iconSvg={program.instance.iconSvg}
            />
          )
        })}
      </section>
      <section className={styles.program_command_menu}>
        <h1>
          <span>Action List<span className="ml-8">{'////'}</span></span>
        </h1>
        <Button>
          <h2><HotkeyText text={commandLabel}></HotkeyText></h2>
        </Button>
        <ol className={styles.program_command_list}>
          {commands.map((command) => (
            <ProgramCommand
              key={command.key}
              className={styles.program_command}
              onClick={command.onClick}
              disabled={command.instance.disabled}
              text={command.instance.label}
              activated={command.instance.active}
            />
          ))}
        </ol>
      </section>
    </div>
  );
})

MainMenuView.displayName = 'MainMenuView';