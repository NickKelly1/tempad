import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { State } from '../../state';

export * as MainMenu from './main-menu';
export * as Timedoor from './timedoor';

const root = (state: State): State => state;

export type Target = null | State['ui']['views']['byId'][keyof State['ui']['views']['byId']];
export const target = createDraftSafeSelector(
  root,
  (_state): Target => {
    const byId = _state.ui.views.byId
    const targetId = _state.ui.views.targetId;
    if (targetId in byId) {
      const result: NonNullable<Target> = byId[targetId as keyof typeof byId];
      return result;
    }
    return null;
  },
)