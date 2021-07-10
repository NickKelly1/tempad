import { FC, useMemo } from "react";
import { ProgramViewProps } from "./ProgramView.types";
import styles from './ProgramView.module.scss';
import { GetSvg, Svg } from "../../../util/svg";

export const ProgramView: FC<ProgramViewProps> = (props) => {
  //

  const ProgramSvg = useMemo(() => GetSvg(Svg.TimeDoor), []);

  return (
    <section className={styles.programView}>
      <ProgramSvg />
    </section>
  );
}