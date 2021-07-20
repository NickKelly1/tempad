import styles from './Tempad.module.scss'
import React, { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { $Selector } from '../../../store/selector';
import { ViewId } from '../../../store/state';
import { TempadProps } from './Tempad.types';
import Head from 'next/head';
import { tempadDimensions } from '../../../util/tempad-dimensions';
import { useClayoutEffect } from '@nkp/hooks';
import { ProgramViewContainer } from '../../views/ProgramViewContainer/ProgramViewContainer';
import { MainMenuViewContainer } from '../../views/MainMenuViewContainer/MainMenuViewContainer';
import { $Action } from '../../../store';


export const Tempad: FC<TempadProps> = () => {
  const ui = useSelector($Selector.Ui.self);

  const maximums = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // resize on first load
  useClayoutEffect(() => {
    if (!maximums.current) return;
    dispatch($Action
      .Ui
      .handleFocus(tempadDimensions(maximums.current)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // resize on page resizes
  useClayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('focus', handleFocus);
    }
    function handleResize() {
      if (!maximums.current) return;
      dispatch($Action
        .Ui
        .handleResize(tempadDimensions(maximums.current)));
    }
    function handleFocus() {
      if (!maximums.current) return;
      dispatch($Action
        .Ui
        .handleFocus(tempadDimensions(maximums.current)));
    }
  }, [dispatch]);

  const height = ui.tempad.height;
  const width = ui.tempad.width;
  const fontSize = ui.tempad.fontSize;

  useEffect(() => {
    console.log('font size change');
    document
      .documentElement
      .style
      .setProperty('--font-size', `${fontSize.toFixed(0)}px`);
  }, [fontSize]);

  const responsiveStyle = {
    height: `${height}px`,
    width: `${width}px`,
  };

  const viewId = ui.targetViewId;
  const fadingViews = ui.fadingViewIds;

  return (
    // full page
    <div className={styles.page}>
      <Head>
        <title>Tempad</title>
        <meta name="description" content="Tempad from the show 'Loki' on Disney+." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.frame}>
        <div ref={maximums} className={styles.maximums}>
          <main
            className={styles.tempad}
            style={responsiveStyle}>
            <div className={styles.screen}>
              <div className={styles.view_area}>
                {/* current view */}
                <div className={styles.view_container}>
                  {(viewId === ViewId.MainMenu) && <MainMenuViewContainer isFading={false} />}
                  {(viewId === ViewId.Program) && <ProgramViewContainer />}
                </div>
                {/* fading views */}
                {fadingViews.map((fadingViewId, i) => {
                  switch (fadingViewId) {
                    case ViewId.MainMenu: return (
                      <FadingView
                        key={fadingViewId}
                        render={<MainMenuViewContainer isFading={true} />}
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
    <div className={styles.fading_view}>{render}</div>
  );
}