import { FC, useRef, useState } from "react";
import { ProgramViewProps } from "./ProgramView.types";
import styles from './ProgramView.module.scss';
import { getSvgIcon } from "../../../util/svg-icon";
import { INVALID_STATE } from "../../../util/invalid-state";
import { useLayoutEffect } from "../../hooks/use-layout-effect";
import { useRefEffect } from "../../hooks/use-ref-effect";
import { PlainRect } from "../../../store/state";
import { ProgramIcon } from "../../components/ProgramIcon/ProgramIcon";

function getIconHandle(parent: HTMLDivElement): HTMLDivElement | null {
  const result: HTMLDivElement | null = parent.querySelector(styles.iconHandle);
  return result;
}

export const ProgramView: FC<ProgramViewProps> = (props) => {
  const {
    programSvg,
    svgStartingRect,
    onReady,
    onInitialising,
  } = props;

  const RenderSvg = getSvgIcon(programSvg);
  const [relativeStartingRect, setRelativeStartingRect] = useState<PlainRect | null>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const hasReadied = useRef(false);

  // when initialising
  useLayoutEffect(() => {
    if (!iconContainerRef.current) return INVALID_STATE('no iconContainerRef');
    const containerRect = iconContainerRef.current.getBoundingClientRect();
    const relativeRect: PlainRect = {
      top: svgStartingRect.top - containerRect.top,
      right: svgStartingRect.right - containerRect.right,
      bottom: svgStartingRect.bottom - containerRect.bottom,
      left: svgStartingRect.left - containerRect.left,
      height: svgStartingRect.height,
      width: svgStartingRect.width,
      x: svgStartingRect.x - containerRect.x,
      y: svgStartingRect.y - containerRect.y,
    };
    onInitialising();
    setRelativeStartingRect(relativeRect);

    // get the rect of container so we can position the Svg properly
    const svgNode = getIconHandle(iconContainerRef.current);
    if (svgNode) {
      //
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when readying
  const [iconHandle] = useRefEffect<HTMLDivElement>((handle) => {
    if (!relativeStartingRect) return;
    if (hasReadied.current) return;
    hasReadied.current = true;
    onReady();
  }, [relativeStartingRect, onReady]);

  return (
    <section className={styles.programView}>
      <div
        ref={iconContainerRef}
        className={styles.iconContainer}
        >
          {relativeStartingRect && (
            <ProgramIcon
              style={{
                position: 'absolute',
                left: relativeStartingRect.left,
                top: relativeStartingRect.left,
                height: relativeStartingRect.height,
                width: relativeStartingRect.width,
              }}
              isSelected={false}
              isActivated
              label={'test'}
              iconSvg={programSvg}
              visible={true}
            />
            // <div
            //   ref={iconHandle}
            //   className={styles.iconHandle}
            //   style={{
            //     position: 'absolute',
            //     left: relativeStartingRect.x,
            //     top: relativeStartingRect.y,
            //     height: relativeStartingRect.height,
            //     width: relativeStartingRect.width,
            //   }}
            // >
            //   <RenderSvg className={styles.icon} />
            // </div>
          )}
      </div>
    </section>
  );
}
