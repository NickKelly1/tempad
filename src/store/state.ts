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

export enum ProgramStateId {
  None = 'None',
  Selected = 'Selected',
  Activated = 'Activated',
}

export enum Opcode {
  ExecuteProgramOptions = 'ExecuteProgramOptions',
  ExecuteRunProgram = 'ExecuteRunProgram',
  ExecuteClearProgramCache = 'ExecuteClearProgramCache',
}

export interface ProgramCommandLabel {
  opcode: Opcode,
  disabled: boolean,
  text: OptionText,
}

export enum ViewId {
  MainMenu = 'MainMenu',
  TimedoorProgram = 'TimedoorProgram',
  SettingsProgram = 'SettingsProgram',
  DirectoryProgram = 'DirectoryProgram',
  MissMinutesProgram = 'MissMinutesProgram',
}

export interface ProgramCommandMenu {
  headline: OptionText,
  commands: ProgramCommandLabel[],
}

export interface ProgramItem {
  programId: ProgramId,
  label: string,
  svg: Svg,
  menu: ProgramCommandMenu,
};

enum Orienation {
  Landscape = 'Landscape',
  Portrait = 'Portrait',
}

export interface State {
  ui: {
    latency: number,
    isFrozen: boolean,
    tempac: {
      // all in px
      orientation: Orienation,
      height: number;
      width: number;
      fontSize: number;
    }
    views: {
      targetId: ViewId;
      byId: {
        [ViewId.MainMenu]: {
          viewId: ViewId.MainMenu;
          programs: {
            target: null | {
              isLoading: boolean,
              programId: ProgramId,
              state: ProgramStateId,
            },
            ids: ProgramId[], 
            byId: Record<ProgramId, ProgramItem>,
          },
          defaultMenu: ProgramCommandMenu,
        },
        [ViewId.TimedoorProgram]: {
          viewId: ViewId.TimedoorProgram;
          //
        },
      }
    }
  }
};

const optionCommandLabel: ProgramCommandLabel = {
  opcode: Opcode.ExecuteProgramOptions,
  disabled: true,
  text: { before: '', hotkey: 'O', after: 'ptions' },
};

const runProgramCommandLabel: ProgramCommandLabel = {
  opcode: Opcode.ExecuteRunProgram,
  disabled: true,
  text: { before: '', hotkey: 'R', after: 'un Program' },
}

const clearCacheCommandLabel: ProgramCommandLabel = {
  opcode: Opcode.ExecuteClearProgramCache,
  disabled: true,
  text: { before: '', hotkey: 'C', after: 'lear Cache' },
}


export const initialState: State = {
  ui: {
    latency: 125,
    isFrozen: false,
    tempac: {
      orientation: Orienation.Portrait,
      height: 640,
      width: 360,
      fontSize: 16,
    },
    views: {
      targetId: ViewId.MainMenu,
      byId: {
        [ViewId.TimedoorProgram]: {
          viewId: ViewId.TimedoorProgram,
          //
        },
        [ViewId.MainMenu]: {
          viewId: ViewId.MainMenu,
          defaultMenu: {
            headline: { before: '', hotkey: 'S', after: 'elect', },
            commands: [
              optionCommandLabel,
              runProgramCommandLabel,
              clearCacheCommandLabel,
            ],
          },
          programs: {
            target: null,
            ids: [
              ProgramId.Timedoor,
              ProgramId.Settings,
              ProgramId.Directory,
              ProgramId.MissMinutes
            ],
            byId: {
              [ProgramId.Timedoor]: {
                label: 'Timedoor',
                svg: Svg.TimeDoor,
                programId: ProgramId.Timedoor,
                menu: {
                  headline: { before: '', hotkey: 't', after: 'imedoor' },
                  commands: [
                    optionCommandLabel,
                    runProgramCommandLabel,
                    clearCacheCommandLabel,
                  ]
                },
              },
              [ProgramId.Settings]: {
                label: 'Settings',
                svg: Svg.Settings,
                programId: ProgramId.Settings,
                menu: {
                  headline: { before: '', hotkey: 's', after: 'ettings' },
                  commands: [
                    optionCommandLabel,
                    runProgramCommandLabel,
                    clearCacheCommandLabel,
                  ]
                },
              },
              [ProgramId.Directory]: {
                label: 'Directory',
                svg: Svg.Directory,
                programId: ProgramId.Directory,
                menu: {
                  headline: { before: '', hotkey: 'D', after: 'irectory' },
                  commands: [
                    optionCommandLabel,
                    runProgramCommandLabel,
                    clearCacheCommandLabel,
                  ]
                },
              },
              [ProgramId.MissMinutes]: {
                label: 'Miss Minutes',
                svg: Svg.MissMinutes,
                programId: ProgramId.MissMinutes,
                menu: {
                  headline: { before: '', hotkey: 'M', after: 'iss Minutes' },
                  commands: [
                    optionCommandLabel,
                    runProgramCommandLabel,
                    clearCacheCommandLabel,
                  ]
                },
              },
            },
          },
        },
      },
    }
  },
};
