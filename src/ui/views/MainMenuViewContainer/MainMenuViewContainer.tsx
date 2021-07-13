import React, { FC, useMemo } from "react";
import { MainMenuViewContainerProps } from "./MainMenuViewContainer.types";
import { useDispatch, useSelector } from "react-redux";
import { $Selector } from "../../../store/selector";
import { ClickHandler } from "../../components/Button/Button.types";
import { MainMenuView } from "../MainMenuView/MainMenuView";
import { $Action } from "../../../store";
import { MainMenuViewProps } from "../MainMenuView/MainMenuView.types";

export const MainMenuViewContainer: FC<MainMenuViewContainerProps> = () => {
  const dispatch = useDispatch();

  const mainMenu = useSelector($Selector.MainMenuView.self);
  const programAggregates = useSelector($Selector.MainMenuView.programAggregates);
  const targetProgramAggregate = useSelector($Selector.MainMenuView.targetProgramAggregate);
  const targetProgramId = targetProgramAggregate?.programId ?? null;

  const programs: MainMenuViewProps['programs'] = useMemo(() => {
    const result: MainMenuViewProps['programs'] = [];
    programAggregates.ids.forEach((programId) => {
      result.push({
        programId,
        instance: programAggregates.byId[programId]!.instance,
        mainMenu: programAggregates.byId[programId]!.mainMenu,
      });
    });
    return result;
  }, [programAggregates]);

  const handleCommandClick = (index: number): ClickHandler => (evt) => {
    if (targetProgramId == null) return;
    dispatch($Action
      .MainMenuView
      .handleRunProgramCommand({ index, programId: targetProgramId }));
  };

  return <MainMenuView
    handleCommandClick={handleCommandClick}
    commandsLabel={targetProgramAggregate?.instance.commandLabel
      ?? mainMenu.defaultCommandsLabel}
    commands={targetProgramAggregate?.instance.commands
      ?? mainMenu.defaultCommands}
    programs={programs}
    targetProgramId={targetProgramAggregate?.programId ?? null}
  />
}
