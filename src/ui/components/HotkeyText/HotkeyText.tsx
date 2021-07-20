import { FC } from "react";
import { HotkeyTextProps } from "./HotkeyText.types";

export const HotkeyText: FC<HotkeyTextProps> = (props) => {
  const { text } = props;
  if (text == null) return <><u>U</u>nknown</>;
  if (text[1]) return <>{text[0]}<u>{text[1]}</u>{text[2]}</>;
  else return <>{text[0]}{text[2]}</>;
}
