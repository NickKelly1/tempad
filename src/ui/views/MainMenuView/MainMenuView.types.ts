import { MainMenuProgramOption, OptionText, PlainRect, ProgramCommandInstance, ProgramId, ProgramInstance, ProgramState } from "../../../store/state";
import { SvgIcon } from "../../../util/svg-icon";
import { ClickHandler } from "../../components/Button/Button.types";

export interface MainMenuViewProps {
  isFading: boolean;

  targetProgramId: null | ProgramId;

  programs: {
    ids: ProgramId[],
    byId: { [ID in ProgramId]?: {
      key: string,
      programId: ProgramId,
      instance: ProgramInstance,
      mainMenu: MainMenuProgramOption,
      onClick?: ClickHandler,
      onIconRectChange?: (rect: DOMRect) => unknown,
    } },
  },

  commandLabel: OptionText,
  commands: {
    key: string,
    instance: ProgramCommandInstance,
    onClick: undefined | ClickHandler,
  }[],

}
