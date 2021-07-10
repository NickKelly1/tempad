
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { State } from '../../state';

import * as MainMenu from './main-menu';
import * as Timedoor from './timedoor';

export function reducer(builder: ActionReducerMapBuilder<State>) {
  MainMenu.reducer(builder);
  Timedoor.reducer(builder);
};
