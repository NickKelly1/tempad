import { MainMenuProgram, OptionText, ProgramCommandInstance, ProgramId, ProgramInstance } from "../../../store/state";
import { SvgIcon } from "../../../util/svg-icon";
import { ClickHandler } from "../../components/Button/Button.types";

export interface MainMenuViewProps {
  targetProgramId: null | ProgramId;

  programs: {
    ids: ProgramId[],
    byId: { [ID in ProgramId]?: {
      key: string,
      programId: ProgramId,
      instance: ProgramInstance,
      mainMenu: MainMenuProgram,
      onClick: undefined | ClickHandler,
    } },
  },

  commandLabel: OptionText,
  commands: {
    key: string,
    instance: ProgramCommandInstance,
    onClick: undefined | ClickHandler,
  }[],
}
