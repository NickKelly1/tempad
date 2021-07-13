import { OptionText, ProgramCommandDefinition, ProgramId } from "../../../store/state";
import { ClickHandler } from "../Button/Button.types";

export interface MenuProps {
  programId: null | ProgramId,
  commands: ProgramCommandDefinition[];
  onMenuItemClick: (index: number) => ClickHandler;
  headline: OptionText;
}
