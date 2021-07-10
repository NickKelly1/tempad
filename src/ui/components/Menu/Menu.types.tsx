import { OptionText, ProgramCommandLabel, ProgramId } from "../../../store/state";
import { ClickHandler } from "../Button/Button.types";

export interface MenuProps {
  programId: null | ProgramId,
  commands: ProgramCommandLabel[];
  onMenuItemClick: (index: number) => ClickHandler;
  headline: OptionText;
}
