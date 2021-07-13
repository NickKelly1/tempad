import { OptionText } from "../../../store/state";
import { ClickHandler } from "../Button/Button.types";

export interface ProgramCommandProps {
  className?: null | string;
  onClick: ClickHandler;
  disabled: boolean;
  text: OptionText;
  activated: boolean;
}