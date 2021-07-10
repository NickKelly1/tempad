import { ProgramCommandLabel, ProgramId, ProgramItem } from "../../../store/state";
import { ClickHandler } from "../Button/Button.types";

export interface ProgramIconProps {
  className?: string;
  onClick?: ClickHandler;
  item: ProgramItem;
  isSelected: boolean;
  isActivated: boolean;
}
