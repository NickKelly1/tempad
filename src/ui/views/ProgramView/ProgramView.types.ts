import { PlainRect, MainMenuViewProgram } from "../../../store/state";
import { SvgIcon } from "../../../util/svg-icon";

export interface ProgramViewProps {
  programSvg: SvgIcon,
  svgStartingRect: PlainRect,
  onInitialising: () => void,
  onReady: () => void,
}