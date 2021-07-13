import { CSSProperties } from "react";
import { PlainRect, OptionText } from "../../../store/state";
import { SvgIcon } from "../../../util/svg-icon";
import { ClickHandler } from "../Button/Button.types";

export interface ProgramIconProps {
  style?: CSSProperties;
  className?: string;
  onClick?: ClickHandler;
  visible: boolean;
  label: OptionText;
  iconSvg: SvgIcon;
  onIconRectChange?: (rect: PlainRect) => void;
  activated: boolean;
}
