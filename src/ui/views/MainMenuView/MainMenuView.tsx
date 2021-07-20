import React, {
  CSSProperties,
  FC,
  Fragment,
  useMemo,
} from "react";
import { MainMenuViewProps } from "./MainMenuView.types";
import { Button } from "../../components/Button/Button";
import { HotkeyText } from "../../components/HotkeyText/HotkeyText";
import { ProgramCommand } from "../../components/ProgramCommand/ProgramCommand";
import { ProgramIcon } from "../../components/ProgramIcon/ProgramIcon";

import styles from './MainMenuView.module.scss';
import { ProgramId } from "../../../store/state";
import { Portal } from "../../components/Portal/Portal";
import clsx from "clsx";
import { WithDOMRectChange } from "../../components/WithDOMRectChange/WithDOMRectChange";

export const MainMenuView: FC<MainMenuViewProps> = React.memo((props) => {
  const {
    isFading,
    targetProgramId,
    programs,
    commandLabel,
    commands,
  } = props;

  type IconCss = { [ID in ProgramId]?: CSSProperties };
  const programIconCss = useMemo<IconCss>(() => {
    const result: IconCss = {};
    programs.ids.forEach(programId => {
      const program = programs.byId[programId]!;
      const iconRect = program.mainMenu.svgRect;
      const next: CSSProperties = {};
      next.position = 'absolute';
      next.visibility = program.mainMenu.visible ? 'visible' : 'hidden';
      if (iconRect) {
        next.top = `${iconRect.top}px`;
        next.left = `${iconRect.left}px`;
        next.width = `${iconRect.width}px`;
        next.height = `${iconRect.height}px`;
      }
      result[programId] = next;
    });
    return result;
  }, [programs.byId, programs.ids]);

  return (
    <div className={clsx(
      styles.main_menu_view,
      isFading && 'fading',
      isFading && 'pe-none',
      )}>
      <section className={clsx( styles.program_icons,)} >
        {programs.ids.map((programId) => {
          const program = programs.byId[programId]!;
          return (
            <Fragment key={program.programId}>
              <WithDOMRectChange<HTMLDivElement>
                selector='body'
                domRectOnResize={program.onIconRectChange}
                >
                {(ref) => (
                  <div
                    ref={ref}
                    className={clsx(
                      styles.program_icon,
                      styles.filler
                    )}
                  />
                )}
              </WithDOMRectChange>
              <Portal>
                <ProgramIcon
                  style={programIconCss[programId]}
                  className={clsx(
                    styles.program_icon,
                    styles.absolute_icon,
                    isFading && 'fading',
                    isFading && 'pe-none',
                  )}
                  onClick={program.onClick}
                  activated={programId === targetProgramId}
                  label={program.instance.iconLabel}
                  visible={program.mainMenu.visible}
                  iconSvg={program.instance.iconSvg}
                />
              </Portal>
            </Fragment>
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
});

MainMenuView.displayName = 'MainMenuView';
