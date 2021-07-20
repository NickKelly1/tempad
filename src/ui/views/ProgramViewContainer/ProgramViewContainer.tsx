import { FC, useCallback } from "react";
import { ProgramViewContainerProps } from "./ProgramViewContainer.types";
import { SvgIcon } from "../../../util/svg-icon";
import { useDispatch, useSelector } from "react-redux";
import { $Selector } from "../../../store/selector";
import { INVALID_STATE } from "../../../util/invalid-state";
import { PlainRect, ProgramViewState, State } from "../../../store/state";
import { ProgramView } from "../ProgramView/ProgramView";

export const ProgramViewContainer: FC<ProgramViewContainerProps> = (props) => {
  const programView = useSelector($Selector.ProgramView.self);
  const state = programView.state;
  if (!state) return null;
  return <InnerProgramViewContainer state={state} />
}

interface InnerProgramViewContainerProps {
  state: ProgramViewState;
}

const InnerProgramViewContainer: FC<InnerProgramViewContainerProps> = (props) => {
  const {
    state,
  } = props;

  const dispatch = useDispatch();

  const program = useSelector($Selector.Core.programsById)[state.programId];

  return (
    <ProgramView
      startingIconRect={state.iconRect}
      program={program}
    />
  );

  // const targetProgram = useSelector($Selector.Views.Program.targetProgram);
  // if (!targetProgram) {
  //   INVALID_STATE('no targetProgram');
  // }

  // const mainMenu = useSelector($Selector.Views.MainMenu.self);
  // let svgRect: null | PlainRect = null;
  // let programSvg: null | SvgIcon = null;
  // if (targetProgram?.id != null) {
  //   svgRect = mainMenu.programs.byId[targetProgram.id].svgRect;
  //   programSvg = mainMenu.programs.byId[targetProgram.id].svg;
  // }

  // const handleInitialising = useCallback(() => {
  //   if (targetProgram?.id == null) return;
  //   const programId = targetProgram.id;
  //   dispatch(Actions.Views.Program.Events.programStateInitialising({ programId }));
  // }, [dispatch, targetProgram]);


  // const handleReady = useCallback(() => {
  //   if (targetProgram?.id == null) return;
  //   const programId = targetProgram.id;
  //   dispatch(Actions.Views.Program.Events.programStateReady({ programId }));
  // }, [dispatch, targetProgram])


  // if (targetProgram == null) return null;
  // if (svgRect == null) return null;
  // if (programSvg == null) return null;

  // return (
  //   <ProgramView
  //     onInitialising={handleInitialising}
  //     onReady={handleReady}
  //     svgStartingRect={svgRect}
  //     programSvg={programSvg}
  //   />
  // );
}
