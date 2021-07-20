import { FC, useState } from "react";
import { ProgramViewProps } from "./ProgramView.types";
import { Portal } from "../../components/Portal/Portal";
import { ProgramIcon } from "../../components/ProgramIcon/ProgramIcon";
import { WithDOMRectChange } from "../../components/WithDOMRectChange/WithDOMRectChange";
import { toPlainRect } from "../../../util/to-plain-rect";

import styles from './ProgramView.module.scss';
import { DOMRectOnResize, } from "@nkp/hooks";
import clsx from "clsx";
import { useSteps } from "../../hooks/use-steps";
import { RenderableConcatenateJoinType, RenderableTextComponentType, RenderableType } from "../../components/Renderable/Renderable.types";
import { RenderableData } from '../../components/Renderable/Renderable.types';
import { Renderable } from "../../components/Renderable/Renderable";


interface LineDefinition {
  renderable: RenderableData,
};

const loadedLines: LineDefinition[] = [
  {
    renderable: {
      type: RenderableType.Text,
      payload: {
        innerProps: {
          className: styles.show,
        },
        componentType: RenderableTextComponentType.span,
        text: 'Timedoor Open',
      },
    },
  },
];

const loadingLines: LineDefinition[] = [
  {
    renderable: {
      type: RenderableType.Hotkey,
      payload: {
        text: ['', '', '////////'],
      },
    },
  },
  {
    renderable: {
      type: RenderableType.Hotkey,
      payload: {
        text: ['', '', 'Building Timedoor'],
      },
    },
  },
  {
    renderable: {
      type: RenderableType.Concatenate,
      payload: {
        joinType: RenderableConcatenateJoinType.span,
        values: [
          {
            renderable: {
              type: RenderableType.Hotkey,
              payload: {
                text: ['', '', 'Please wait'],
              },
            }
          },
          {
            renderable: {
              type: RenderableType.Text,
              payload: {
                componentType: RenderableTextComponentType.span,
                innerProps: { className: styles.blink },
                text: '...',
              }
            }
          },
        ],
      },
    },
  },
]


export const ProgramView: FC<ProgramViewProps> = (props) => {
  const {
    startingIconRect,
    program,
  } = props;

  interface LineInstance {
    definition: LineDefinition,
    classes: string[],
  };
  const [lines, setLines] = useState<LineInstance[]>(() => loadingLines.map(definition => ({
    definition,
    classes: [styles.text_line],
  })));

  useSteps((i) => {
    if (i >= loadingLines.length) return false;
    console.log('running...', i);
    setLines((prev) => [
      ...prev.slice(0, i),
      {
        ...prev[i],
        classes: prev[i].classes.concat(styles.show),
      },
      ...prev.slice(i + 1, prev.length),
    ]);
    return true;
  }, 250);

  const [iconRect, setIconRect] = useState(startingIconRect);

  const handleIconResize: DOMRectOnResize = (__rect) => {
    // let the component fully mount before changing the icon position
    setTimeout(() => setIconRect(toPlainRect(__rect)), 100);
  }

  return (
    <div className={styles.program_view}>
      <WithDOMRectChange domRectOnResize={handleIconResize}>
        {(ref) => (
          <section
            className={styles.icon_container}
            ref={ref}
            >
              {/* no content */}
          </section>
        )}
      </WithDOMRectChange>
      <Portal>
        <ProgramIcon
          className={styles.program_icon}
          style={{
            transition: 'all 300ms linear',
            position: 'absolute',
            top: `${iconRect.top}px`,
            left: `${iconRect.left}px`,
            width: `${iconRect.width}px`,
            height: `${iconRect.height}px`,
          }}
          activated={true}
          iconSvg={program.instance.iconSvg}
          label={program.instance.iconLabel}
          visible={true}
        />
      </Portal>
      <section className={styles.text_section}>
        <div className={styles.text_container}>
          {lines.map((line, i) => (
            <div
              key={i}
              className={clsx(styles.text_item, ...line.classes)}
              >
              <Renderable
                renderable={line.definition.renderable}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
