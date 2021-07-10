import { OptionText } from "../../../store/state";
import { ClickHandler } from "../Button/Button.types";

export interface MenuItemProps {
  onClick: ClickHandler;
  disabled: boolean;
  text: OptionText;
}