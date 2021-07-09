import { FC } from "react";
import { HotkeyTextProps } from "./HotkeyText.types";

export const HotkeyText: FC<HotkeyTextProps> = (props) => {
  const { text } = props;
  if (text == null) return <> <u>U</u>nknown </>;
  return <>{text.before}<u>{text.hotkey}</u>{text.after}</>;
}