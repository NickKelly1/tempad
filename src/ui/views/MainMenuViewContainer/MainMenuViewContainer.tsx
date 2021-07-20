import React, { FC, useMemo } from "react";
import { MainMenuViewContainerProps } from "./MainMenuViewContainer.types";
import { useDispatch, useSelector } from "react-redux";
import { $Selector } from "../../../store/selector";
import { MainMenuView } from "../MainMenuView/MainMenuView";
import { $Action } from "../../../store";
import { MainMenuViewProps } from "../MainMenuView/MainMenuView.types";
import { toPlainRect } from "../../../util/to-plain-rect";

export const MainMenuViewContainer: FC<MainMenuViewContainerProps> = (props) => {
  const {
    isFading,
  } = props;

  const state = useSelector($Selector.self);
  const mainMenu = useSelector($Selector.MainMenuView.self);
  const dispatch = useDispatch();
  const targetProgramId = mainMenu.programs.targetId;

  // construct the props for MainMenuView
  const programs: MainMenuViewProps['programs'] = useMemo(() => {
    const result: MainMenuViewProps['programs'] = {
      ids: [],
      byId: {},
    };
    mainMenu.programs.ids.forEach((programId) => {
      result.ids.push(programId);
      result.byId[programId] = {
        key: `program:${programId}`,
        programId,
        instance: state.core.programs.byId[programId].instance,
        mainMenu: mainMenu.programs.byId[programId]!,
        onIconRectChange(rect) {
          dispatch($Action
            .MainMenuView
            .iconRectChanged({ programId, rect: toPlainRect(rect), }));
        },
        onClick(_) {
          if (programId === targetProgramId) return;
          dispatch($Action
            .MainMenuView
            .handleSetTargetProgram({ programId }));
        },
      };
    });
    return result;
  }, [
    dispatch,
    targetProgramId,
    mainMenu.programs.byId,
    mainMenu.programs.ids,
    state.core.programs.byId,
  ]);

  const commands: MainMenuViewProps['commands'] = useMemo(() => {
    let result: MainMenuViewProps['commands'];
    if (targetProgramId == null) {
      result = mainMenu
        .defaultCommands
        .map((command, index) => ({
          key: `program:none:${index}`,
          instance: command,
          onClick: undefined,
        }));
    } else {
      result = state
        .core
        .commands
        .byProgramId[targetProgramId]
        .instances
        .map((command, index) => ({
          key: `command:${targetProgramId}:${index}`,
          instance: command,
          onClick() {
            dispatch($Action
              .Core
              .handleExecuteProgramCommand({
                index,
                programId: targetProgramId,
              }));
          }
        }));
    }
    return result;
  }, [
    dispatch,
    mainMenu.defaultCommands,
    state.core.commands.byProgramId,
    targetProgramId,
  ]);

  const commandLabel: MainMenuViewProps['commandLabel'] = useMemo(() => {
    let result: MainMenuViewProps['commandLabel'];
    if (targetProgramId == null) {
      result = mainMenu.defaultCommandsLabel;
    } else {
      result = state.core.commands.byProgramId[targetProgramId].label;
    }
    return result;
  }, [
    mainMenu.defaultCommandsLabel,
    state.core.commands.byProgramId,
    targetProgramId,
  ]);

  return (
    <MainMenuView
      isFading={isFading}
      programs={programs}
      commandLabel={commandLabel}
      commands={commands}
      targetProgramId={targetProgramId}
    />
  );
}
