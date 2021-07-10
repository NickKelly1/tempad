import React, { FC } from "react";
import { MainMenuProps } from "./MainMenuView.types";
import { useSelector } from "react-redux";
import { Selectors } from "../../../store/selector";
import { ViewId } from "../../../store/state";
import { ProgramIconContainer } from "../../components/ProgramIconContainer/ProgramIconContainer";
import { MenuContainer } from "../../components/MenuContainer/MenuContainer";

import styles from './MainMenuView.module.scss';

export const MainMenuView: FC<MainMenuProps> = () => {
  const ui = useSelector(Selectors.ui);

  return (
    <div className={styles.mainMenuView}>
      <section className={styles.programs}>
        {ui.views.byId[ViewId.MainMenu].programs.ids.map((programId) => (
          <ProgramIconContainer key={programId} programId={programId} />
        ))}
      </section>
      <MenuContainer />
    </div>
  );
}
