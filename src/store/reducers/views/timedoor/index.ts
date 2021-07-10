import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { State } from '../../../state';

import * as Commands from './commands';
import * as Events from './events';

export function reducer(builder: ActionReducerMapBuilder<State>) {
  Commands.reducer(builder);
  Events.reducer(builder);
};
