import { SvgIcon } from "../util/svg-icon";

export enum ProgramId {
  Timedoor = 'Program:Timedoor',
  Settings = 'Program:Settings',
  Directory = 'Program:Directroy',
  MissMinutes = 'Program:MissMinutes',
}

export type OptionText = [before: string, hotkey: string, after: string];

export enum ProgramStateId {
  Unloading = 'ProgramState:Unloading',
  Unloaded = 'ProgramState:Unloaded',
  Booting = 'ProgramState:Booting',
  Booted = 'ProgramState:Booted',
  Starting = 'ProgramState:Starting',
  Ready = 'ProgramState:Ready',
}

export enum Opcode {
  ExecuteProgramOptions = 'Opcode:ExecuteProgramOptions',
  ExecuteRunProgram = 'Opcode:ExecuteRunProgram',
  ExecuteClearProgramCache = 'Opcode:ExecuteClearProgramCache',
}

export enum OptionStateId {
  None = 'OptionState:None',
  Selected = 'OptionState:Selected',
  Activated = 'OptionState:Activated',
}

export enum ViewId {
  MainMenu = 'View:MainMenu',
  Program = 'View:Program',
}

export enum ProgramViewStateId {
  Uninitialised = 'ProgramViewState:Uninitialised',
  Loading = 'ProgramViewState:Loading',
  Running = 'ProgramViewState:Running',
}

export interface PlainRect {
  top: number,
  right: number,
  bottom: number,
  left: number,
  height: number,
  width: number,
  x: number,
  y: number,
}

enum Orienation {
  Landscape = 'Landscape',
  Portrait = 'Portrait',
}

export interface MainMenuProgramOption {
  svgRect: null | PlainRect,
  visible: boolean,
  iconStateId: OptionStateId,
}


export interface ProgramCommandInstance {
  active: boolean,
  disabled: boolean,
  opcode: Opcode,
  label: OptionText,
}

export interface ProgramInstance<ID extends ProgramId = ProgramId> {
  programId: ID,
  stateId: ProgramStateId,
  iconSvg: SvgIcon,
  iconLabel: OptionText,
}

export interface ProgramContainer<ID extends ProgramId = ProgramId> {
  programId: ID,
  instance: ProgramInstance<ID>,
}

export interface ProgramCommandContainer<ID extends ProgramId = ProgramId> {
  programId: ID,
  label: OptionText,
  instances: ProgramCommandInstance[]
}

export interface ProgramViewState {
  programId: ProgramId,
  stateId: ProgramViewStateId,
  percentage: number,
  iconRect: PlainRect,
}


export interface State {
  core: {
    commands: {
      byProgramId: { [ID in ProgramId]: ProgramCommandContainer<ID> },
    },
    programs: {
      ids: ProgramId[],
      byId: { [ID in ProgramId]: ProgramContainer<ID> }
    },
  },
  ui: {
    targetViewId: ViewId;
    fadingViewIds: ViewId[];
    latency: number,
    tempad: {
      // all in px
      orientation: Orienation,
      height: number;
      width: number;
      fontSize: number;
    },
  },
  views: {
    [ViewId.MainMenu]: {
      viewId: ViewId.MainMenu;
      programs: {
        targetId: null | ProgramId,
        ids: ProgramId[],
        byId: { [K in ProgramId]?: MainMenuProgramOption },
      },
      defaultCommands: ProgramCommandInstance[],
      defaultCommandsLabel: OptionText,
    },
    [ViewId.Program]: {
      viewId: ViewId.Program,
      state: null | ProgramViewState,
    },
  }
};

const optionCommandLabel: ProgramCommandInstance = {
  active: false,
  disabled: true,
  opcode: Opcode.ExecuteProgramOptions,
  label: ['', 'O', 'ptions'],
};

const runProgramCommandLabel: ProgramCommandInstance = {
  active: false,
  disabled: true,
  opcode: Opcode.ExecuteRunProgram,
  label: ['', 'R', 'un Program'],
}

const clearCacheCommandLabel: ProgramCommandInstance = {
  active: false,
  disabled: true,
  opcode: Opcode.ExecuteClearProgramCache,
  label: ['', 'C', 'lear Cache'],
}

const defaultCommands = [
  optionCommandLabel,
  runProgramCommandLabel,
  clearCacheCommandLabel
];


export const initialState: State = {
  core: {
    programs: {
      ids: [
        ProgramId.Timedoor,
        ProgramId.Settings,
        ProgramId.Directory,
        ProgramId.MissMinutes,
      ],
      byId: {
        [ProgramId.Timedoor]: {
          programId: ProgramId.Timedoor,
          instance: {
            programId: ProgramId.Timedoor,
            stateId: ProgramStateId.Unloaded,
            iconSvg: SvgIcon.TimeDoor,
            iconLabel: ['', '', 'Timedoor'],
          },
        },
        [ProgramId.Settings]: {
          programId: ProgramId.Settings,
          instance: {
            programId: ProgramId.Settings,
            stateId: ProgramStateId.Unloaded,
            iconSvg: SvgIcon.Settings,
            iconLabel: ['', '', 'Settings'],
          },
        },
        [ProgramId.Directory]: {
          programId: ProgramId.Directory,
          instance: {
            programId: ProgramId.Directory,
            stateId: ProgramStateId.Unloaded,
            iconSvg: SvgIcon.Directory,
            iconLabel: ['', '', 'Directory'],
          },
        },
        [ProgramId.MissMinutes]: {
          programId: ProgramId.MissMinutes,
          instance: {
            programId: ProgramId.MissMinutes,
            stateId: ProgramStateId.Unloaded,
            iconSvg: SvgIcon.MissMinutes,
            iconLabel: ['', '', 'Miss Minutes'],
          },
        },
      },
    },
    commands: {
      byProgramId: {
        [ProgramId.Timedoor]: {
          programId: ProgramId.Timedoor,
          instances: defaultCommands,
          label: ['', 'T', 'imedoor'],
        },
        [ProgramId.Settings]: {
          programId: ProgramId.Settings,
          instances: defaultCommands,
          label: ['', 'S', 'ettings'],
        },
        [ProgramId.Directory]: {
          programId: ProgramId.Directory,
          instances: defaultCommands,
          label: ['', 'D', 'irectory'],
        },
        [ProgramId.MissMinutes]: {
          programId: ProgramId.MissMinutes,
          instances: defaultCommands,
          label: ['', 'M', 'iss Minutes'],
        },
      },
    },
  },
  ui: {
    latency: 125,
    targetViewId: ViewId.MainMenu,
    fadingViewIds: [],
    tempad: {
      orientation: Orienation.Portrait,
      height: 640,
      width: 360,
      fontSize: 16,
    },
  },
  views: {
    [ViewId.Program]: {
      viewId: ViewId.Program,
      state: null,
    },
    [ViewId.MainMenu]: {
      viewId: ViewId.MainMenu,
      defaultCommands: defaultCommands,
      defaultCommandsLabel: ['', 'S', 'elect'],
      programs: {
        targetId: null,
        ids: [
          ProgramId.Timedoor,
          ProgramId.Settings,
          ProgramId.Directory,
          ProgramId.MissMinutes
        ],
        byId: {
          [ProgramId.Timedoor]: {
            iconStateId: OptionStateId.None,
            svgRect: null,
            visible: true,
          },
          [ProgramId.Settings]: {
            iconStateId: OptionStateId.None,
            svgRect: null,
            visible: true,
          },
          [ProgramId.Directory]: {
            iconStateId: OptionStateId.None,
            svgRect: null,
            visible: true,
          },
          [ProgramId.MissMinutes]: {
            iconStateId: OptionStateId.None,
            svgRect: null,
            visible: true,
          },
        },
      },
    },
  },
};
