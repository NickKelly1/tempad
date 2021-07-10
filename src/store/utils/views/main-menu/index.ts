import { Selectors } from "../../../selector";
import { ProgramId, State } from "../../../state";

/**
 * Is the MainMenu Frozen?
 */
export function isFrozen(state: State): boolean {
  return Selectors.Views.MainMenu.isFrozen(state);
}

/**
 * Is this program the target?
 */
export function isTarget(state: State, programId: ProgramId): boolean {
  return Selectors.Views.MainMenu.target(state)?.programId === programId;
}

/**
 * Is the target loading?
 */
export function isLoading(state: State): boolean {
  return Selectors.Views.MainMenu.isLoading(state);
}

/**
 * Is this program selected?
 */
export function isSelected(state: State, programId: ProgramId): boolean {
  return Selectors.Views.MainMenu.selected(state) === programId;
}

/**
 * Is this program activated?
 */
export function isActivated(state: State, programId: ProgramId): boolean {
  return Selectors.Views.MainMenu.activated(state) === programId;
}