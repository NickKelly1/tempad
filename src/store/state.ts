import { Svg } from "../util/svg";

export enum ProgramId {
  Timedoor = 'Timedoor',
  Settings = 'Settings',
  Directory = 'Directroy',
  MissMinutes = 'MissMinutes',
}
export interface ProgramOptions {
  label: string,
  svg: Svg,
};

export enum ProgramStateId {
  None = 'None',
  Selected = 'Selected',
  Activated = 'Activated',
}
export enum MenuItemId {
  Options = 'Options',
  RunProgram = 'RunProgram',
  ClearCache = 'ClearCache',
};
export interface MenuItemOptions { disabled: boolean; }

export interface ProgramSession<T> { programId: T, stateId: ProgramStateId };
export interface ProgramSessionTimedoor extends ProgramSession<ProgramId.Timedoor> {}
export interface ProgramSessionSettings extends ProgramSession<ProgramId.Settings> {}
export interface ProgramSessionDirectory extends ProgramSession<ProgramId.Directory> {}
export interface ProgramSessionMissMinutes extends ProgramSession<ProgramId.MissMinutes> {}

export type FocusedProgram =
  | ProgramSessionTimedoor
  | ProgramSessionSettings
  | ProgramSessionDirectory
  | ProgramSessionMissMinutes
;

export interface State {
  ui: {
    isFrozen: boolean;
    clicks: number,
    focused: null | FocusedProgram;
    programs: {
      ids: ProgramId[];
      byId: {
        [ProgramId.Timedoor]: ProgramOptions,
        [ProgramId.Settings]: ProgramOptions,
        [ProgramId.Directory]: ProgramOptions,
        [ProgramId.MissMinutes]: ProgramOptions,
      }
    },
    menu: {
      ids: MenuItemId[],
      byId: {
        [MenuItemId.Options]: MenuItemOptions,
        [MenuItemId.RunProgram]: MenuItemOptions,
        [MenuItemId.ClearCache]: MenuItemOptions,
      }
    },
  }
};


export const initialState: State = {
  ui: {
    isFrozen: false,
    clicks: 0,
    focused: null,
    programs: {
      ids: [
        ProgramId.Timedoor,
        ProgramId.Settings,
        ProgramId.Directory,
        ProgramId.MissMinutes,
      ],
      byId: {
        [ProgramId.Timedoor]: {
          label: 'TIMEDOOR',
          svg: Svg.TimeDoor,
        },
        [ProgramId.Settings]: {
          label: 'SETTINGS',
          svg: Svg.Settings,
        },
        [ProgramId.Directory]: {
          label: 'DIRECTORY',
          svg: Svg.Directory,
        },
        [ProgramId.MissMinutes]: {
          label: 'MISS MINUTES',
          svg: Svg.MissMinutes,
        },
      },
    },
    menu: {
      ids: [
        MenuItemId.Options,
        MenuItemId.RunProgram,
        MenuItemId.ClearCache,
      ],
      byId: {
        [MenuItemId.Options]: { disabled: true },
        [MenuItemId.RunProgram]: { disabled: true },
        [MenuItemId.ClearCache]: { disabled: true },
      }
    },
  },
};
