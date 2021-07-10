
import * as MainMenu from './main-menu';
import * as Timedoor from './timedoor';

export function* watchers() {
  yield * MainMenu.watchers();
  yield * Timedoor.watchers();
}