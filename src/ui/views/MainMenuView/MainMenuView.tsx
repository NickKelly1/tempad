import React, { CSSProperties, FC, Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MainMenuViewProps } from "./MainMenuView.types";
import { Button } from "../../components/Button/Button";
import { HotkeyText } from "../../components/HotkeyText/HotkeyText";
import { ProgramCommand } from "../../components/ProgramCommand/ProgramCommand";
import { ProgramIcon } from "../../components/ProgramIcon/ProgramIcon";

import styles from './MainMenuView.module.scss';
import { PlainRect, ProgramId } from "../../../store/state";
import { Portal } from "../../components/Portal/Portal";
import { ResizeListener } from "../../components/ResizeListener/ResizeListener";
import { ResizeHandler } from "../../components/ResizeListener/ResizeListener.types";
import clsx from "clsx";
import { toPlainRect } from "../../../util/to-plain-rect";

export const MainMenuView: FC<MainMenuViewProps> = React.memo((props) => {
  const {
    executing,
    targetProgramId,
    programs,
    commandLabel,
    commands,
  } = props;


  // executing?.programId
  const executingProgramId = executing?.programId ?? null;
  const [isExecuting, setIsExecuting] = useState(false);
  useEffect(() => setIsExecuting(executing?.programId != null), [executing]);

  const [iconsSectionRect, setIconsSectionRect] = useState<null | PlainRect>(null);

  const iconsResizeHandler: ResizeHandler = useCallback((elem) => {
    setIconsSectionRect(toPlainRect(elem.getBoundingClientRect()));
  }, [setIconsSectionRect]);

  type IconRects = { [ID in ProgramId]?: PlainRect };
  const [programIconRects, setRects] = useState<IconRects>(() => {
    const result: IconRects = {};
    programs.ids.forEach(programId => result[programId] = undefined);
    return result;
  });

  type IconCss = { [ID in ProgramId]?: CSSProperties };
  const programIconCss = useMemo<IconCss>(() => {
    const result: IconCss = {};
    programs.ids.forEach(programId => {
      // const iconGroupRect = //;
      const iconRect = programIconRects[programId];
      result[programId] = { position: 'absolute', };
      // transitioning
      if (isExecuting) {
        // transitioning & is the target
        if (programId === executingProgramId) {
          if (iconsSectionRect) {
            result[programId]!.transition = 'all 400ms';
            result[programId]!.top = `${iconsSectionRect.top}px`;
            result[programId]!.left = `${iconsSectionRect.left}px`;
            result[programId]!.width = `${iconsSectionRect.width}px`;
            result[programId]!.height = `${iconsSectionRect.height}px`;
          }
        } else {
          // transitioning & is not that target
          result[programId]!.animation = 'fading 200ms forwards';
          if (iconRect) {
            result[programId]!.top = `${iconRect.top}px`;
            result[programId]!.left = `${iconRect.left}px`;
            result[programId]!.width = `${iconRect.width}px`;
            result[programId]!.height = `${iconRect.height}px`;
          }
        }
      } else {
        // not transitioning
        if (iconRect) {
          result[programId]!.top = `${iconRect.top}px`;
          result[programId]!.left = `${iconRect.left}px`;
          result[programId]!.width = `${iconRect.width}px`;
          result[programId]!.height = `${iconRect.height}px`;
        }
      }
    });
    return result;
  }, [programs.ids, programIconRects, isExecuting, iconsSectionRect, executingProgramId]);

  type ResizeHandlers = { [ID in ProgramId]?: ResizeHandler };
  const iconResizeHandlers = useMemo<ResizeHandlers>(
    () => {
      const handlers: ResizeHandlers = {};
      programs
        .ids
        .forEach(programId => handlers[programId] = (elem) => setRects((prevRects): IconRects => ({
          ...prevRects,
          [programId]: toPlainRect(elem.getBoundingClientRect()),
        })));
      return handlers;
    },
    [programs.ids, setRects],
  );

  useEffect(() => {
    (window as any).trigger = () => {
      setIsExecuting((prev) => {
        console.log('setting transitoning to:', !prev);
        return !prev
      });
    }
    return () => (void delete (window as any).trigger);
  }, [setIsExecuting])

  return (
    <div className={clsx(styles.main_menu_view, isExecuting && 'fading')}>
      <ResizeListener
        selector='body'
        onResize={iconsResizeHandler}
      >
        {_p => (
          <section
            {..._p}
            className={clsx(_p.className, styles.program_icons)}
            >
            {programs.ids.map((programId) => {
              const program = programs.byId[programId]!;
              return (
                <Fragment key={program.programId}>
                  <ResizeListener
                    selector='body'
                    onResize={iconResizeHandlers[programId]}
                    >
                    {(__p) => (
                      <div
                        {...__p}
                        className={clsx(
                          __p.className,
                          styles.program_icon,
                          styles.filler
                        )}
                      />
                    )}
                  </ResizeListener>
                  <Portal>
                    <ProgramIcon
                      style={programIconCss[programId]}
                      className={clsx(
                        styles.program_icon,
                        styles.absolute_icon,
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
        )}
      </ResizeListener>
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