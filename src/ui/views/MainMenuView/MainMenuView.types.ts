import { MainMenuProgram, OptionText, ProgramCommandInstance, ProgramId, ProgramInstance } from "../../../store/state";
import { ClickHandler } from "../../components/Button/Button.types";

export interface MainMenuViewProps {
  targetProgramId: null | ProgramId;
  programs: {
    programId: ProgramId,
    instance: ProgramInstance,
    mainMenu: MainMenuProgram
  }[],

  commandsLabel: OptionText,
  commands: ProgramCommandInstance[],

  handleCommandClick: (index: number) => ClickHandler;
}