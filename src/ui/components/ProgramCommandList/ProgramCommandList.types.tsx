import { OptionText, ProgramCommandInstance, ProgramId } from "../../../store/state";
import { ClickHandler } from "../Button/Button.types";

export interface ProgramCommandListProps {
  programId: null | ProgramId,
  commands: ProgramCommandInstance[];
  onMenuItemClick: (index: number) => ClickHandler;
  headline: OptionText;
}
