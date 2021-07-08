import styles from './Tempac.module.scss'
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { selector } from '../../../store/selector';
import { ProgramId } from '../../../store/state';
import { Button } from '../Button/Button';
import { ProgramOption } from '../ProgramOption/ProgramOption';
import { TempacProps } from './Tempac.types';
import { Menu } from '../Menu/Menu';
import Head from 'next/head';


const Tempac: FC<TempacProps> = () => {
  const ui = useSelector(selector.ui);

  return (
    <div className={styles.tempac}>
      <Head>
        <title>Tempac</title>
        <meta name="description" content="Tempac from the show 'Loki' on Disney+." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
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
          <section className={styles.menucontainer}>
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
  );
}

export default Tempac;