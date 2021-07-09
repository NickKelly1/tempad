import { Svg } from "../util/svg";

export enum ProgramId {
  Timedoor = 'Timedoor',
  Settings = 'Settings',
  Directory = 'Directroy',
  MissMinutes = 'MissMinutes',
}

export interface OptionText {
  hotkey: string,
  before: string,
  after: string,
};

export interface ProgramOptions {
  label: string,
  svg: Svg,
  headline: OptionText,
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
export interface MenuItemOptions {
  disabled: boolean;
  text: OptionText;
}

export interface ProgramSession<T> {
  programId: T,
  stateId: ProgramStateId,
};
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

enum Orienation {
  Landscape = 'Landscape',
  Portrait = 'Portrait',
}

export interface State {
  ui: {
    tempac: {
      // all in px
      orientation: Orienation,
      height: number;
      width: number;
      fontSize: number;
    }

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
    tempac: {
      orientation: Orienation.Portrait,
      height: 100,
      width: 100,
      fontSize: 16,
    },
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
          headline: { before: '', hotkey: 't', after: 'imedoor' },
        },
        [ProgramId.Settings]: {
          label: 'SETTINGS',
          svg: Svg.Settings,
          headline: { before: '', hotkey: 's', after: 'ettings' },
        },
        [ProgramId.Directory]: {
          label: 'DIRECTORY',
          svg: Svg.Directory,
          headline: { before: '', hotkey: 'd', after: 'irectory' },
        },
        [ProgramId.MissMinutes]: {
          label: 'MISS MINUTES',
          svg: Svg.MissMinutes,
          headline: { before: '', hotkey: 'm', after: 'iss minutes' },
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
        [MenuItemId.Options]: {
          disabled: true,
          text: { before: '', hotkey: 'O', after: 'ptions' },
        },
        [MenuItemId.RunProgram]: {
          disabled: true,
          text: { before: '', hotkey: 'R', after: 'un Program' },
        },
        [MenuItemId.ClearCache]: {
          disabled: true,
          text: { before: '', hotkey: 'C', after: 'lear Cache' },
        },
      }
    },
  },
};
