import React, { FC } from "react";
import { MainMenuViewProps } from "./MainMenuView.types";
import { Button } from "../../components/Button/Button";
import { HotkeyText } from "../../components/HotkeyText/HotkeyText";
import { ProgramCommand } from "../../components/ProgramCommand/ProgramCommand";

import styles from './MainMenuView.module.scss';
import { ProgramIcon } from "../../components/ProgramIcon/ProgramIcon";

export const MainMenuView: FC<MainMenuViewProps> = React.memo((props) => {
  const {
    programs,
    commands,
    commandsLabel,
    handleCommandClick,
  } = props;

  return (
    <div className={styles.main_menu_view}>
      <section className={styles.program_icons}>
        {programs.map((program) => (
          <ProgramIcon
            className={styles.program_icon}
            key={program.programId}
            activated={false}
            label={program.instance.iconLabel}
            visible={program.mainMenu.visible}
            iconSvg={program.instance.iconSvg}
          />
        ))}
      </section>
      <section className={styles.program_command_menu}>
        <h1>
          <span>Action List<span className="ml-8">{'////'}</span></span>
        </h1>
        <Button>
          <h2><HotkeyText text={commandsLabel}></HotkeyText></h2>
        </Button>
        <ol className={styles.program_command_list}>
          {commands.map((command, index) => (
            <ProgramCommand
              className={styles.program_command}
              onClick={handleCommandClick(index)}
              key={index} // TODO: use better key
              disabled={command.disabled}
              text={command.label}
              activated={command.active}
            />
          ))}
        </ol>
      </section>
    </div>
  );
})

MainMenuView.displayName = 'MainMenuView';