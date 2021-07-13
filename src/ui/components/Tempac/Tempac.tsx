import styles from './Tempac.module.scss'
import React, { FC, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { $Selector } from '../../../store/selector';
import { ViewId } from '../../../store/state';
import { TempacProps } from './Tempac.types';
import Head from 'next/head';
import { handleResize } from '../../../util/handle-resize';
import { MainMenuView } from '../../views/MainMenuView/MainMenuView';
import { useLayoutEffect } from '../../hooks/use-layout-effect';
import { ProgramViewContainer } from '../../views/ProgramViewContainer/ProgramViewContainer';
import { MainMenuViewContainer } from '../../views/MainMenuViewContainer/MainMenuViewContainer';


export const Tempac: FC<TempacProps> = () => {
  const ui = useSelector($Selector.Ui.self);

  const maximums = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // resize on first load
  useLayoutEffect(() => {
    handleResize(maximums.current, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // resize on page resizes
  useLayoutEffect(() => {
    const onResize = () => handleResize(maximums.current, dispatch);
    window.addEventListener('resize', onResize);
    window.addEventListener('focus', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('focus', onResize);
    }
  }, [dispatch]);

  const height = ui.tempac.height;
  const width = ui.tempac.width;
  const fontSize = ui.tempac.fontSize;

  const responsiveStyle = {
    height: `${height}px`,
    width: `${width}px`,
    fontSize: `${fontSize}px`,
  };

  const viewId = ui.targetViewId;
  const fadingViews = ui.fadingViewIds;

  return (
    // full page
    <div className={styles.page}>
      <Head>
        <title>Tempac</title>
        <meta name="description" content="Tempac from the show 'Loki' on Disney+." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.frame}>
        <div ref={maximums} className={styles.maximums}>
          <main
            className={styles.tempac}
            style={responsiveStyle}>
            <div className={styles.screen}>
              <div className={styles.viewArea}>
                {/* current view */}
                <div className={styles.viewContainer}>
                  {(viewId === ViewId.MainMenu) && <MainMenuViewContainer />}
                  {(viewId === ViewId.Program) && <ProgramViewContainer />}
                </div>
                {/* fading views */}
                {fadingViews.map((fadingViewId, i) => {
                  switch (fadingViewId) {
                    case ViewId.MainMenu: return (
                      <FadingView
                        key={fadingViewId}
                        render={<MainMenuViewContainer />}
                      />
                    );
                    default: return null;
                  }
                })}
              </div>
              <footer className={styles.footer}>
                <span className={clsx("mr-8", styles.text)}>04.12.1985</span>
                <span className={clsx("mr-4", styles.text)}>0232.467</span>
                <span className={clsx("mr-4", styles.text)}>{'//'}</span>
                <span className={clsx("mr-4", styles.text)}>9751.202</span>
              </footer>
              <div className={styles.background} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

interface FadingViewProps { 
  render: React.ReactElement;
}
const FadingView: FC<FadingViewProps> = (props) => {
  const { render } = props;
  return (
    <div className={styles.fadingView}>{render}</div>
  );
}