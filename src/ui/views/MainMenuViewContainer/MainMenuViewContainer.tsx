import React, { FC, useEffect, useMemo } from "react";
import { MainMenuViewContainerProps } from "./MainMenuViewContainer.types";
import { useDispatch, useSelector } from "react-redux";
import { $Selector } from "../../../store/selector";
import { MainMenuView } from "../MainMenuView/MainMenuView";
import { $Action } from "../../../store";
import { MainMenuViewProps } from "../MainMenuView/MainMenuView.types";

export const MainMenuViewContainer: FC<MainMenuViewContainerProps> = () => {
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
        .byId[targetProgramId]
        .instances
        .map((command, index) => ({
          key: `command:${targetProgramId}:${index}`,
          instance: command,
          onClick() {
            dispatch($Action
              .MainMenuView
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
    state.core.commands.byId,
    targetProgramId,
  ]);

  const commandLabel: MainMenuViewProps['commandLabel'] = useMemo(() => {
    let result: MainMenuViewProps['commandLabel'];
    if (targetProgramId == null) {
      result = mainMenu.defaultCommandsLabel;
    } else {
      result = state.core.commands.byId[targetProgramId].label;
    }
    return result;
  }, [
    mainMenu.defaultCommandsLabel,
    state.core.commands.byId,
    targetProgramId,
  ]);

  useEffect(() => {
    //
  }, [mainMenu.programs.executing]);

  return (
    <MainMenuView
      executing={mainMenu.programs.executing}
      programs={programs}
      commandLabel={commandLabel}
      commands={commands}
      targetProgramId={targetProgramId}
    />
  );
}
