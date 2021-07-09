import styles from './Tempac.module.scss'
import React, { Dispatch, FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { selector } from '../../../store/selector';
import { ProgramId } from '../../../store/state';
import { Button } from '../Button/Button';
import { ProgramOption } from '../ProgramOption/ProgramOption';
import { TempacProps } from './Tempac.types';
import { Menu } from '../Menu/Menu';
import Head from 'next/head';
import { actions } from '../../../store/action';
import { handleResize } from '../../../util/handle-resize';


export const Tempac: FC<TempacProps> = () => {
  const ui = useSelector(selector.ui);

  const maximums = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // resize on first load
  useEffect(() => {
    handleResize(maximums.current, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // resize on page resizes
  useEffect(() => {
    const onResize = () => handleResize(maximums.current, dispatch);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [dispatch]);

  const height = ui.tempac.height;
  const width = ui.tempac.width;
  const fontSize = ui.tempac.fontSize;


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
            style={{
              height: `${height}px`,
              width: `${width}px`,
              fontSize: `${fontSize}px`,
            }}>

            <div className={styles.content}>

              <section className={styles.programs}>
                {ui.programs.ids.map((programId) => (
                  <ProgramOption
                    className={styles.program}
                    key={programId}
                    programId={programId}
                  />
                ))}
              </section>

              <section>
                <Menu />
              </section>

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
