import { SvgIcon } from "../util/svg-icon";

export enum ProgramId {
  Timedoor = 'Program:Timedoor',
  Settings = 'Program:Settings',
  Directory = 'Program:Directroy',
  MissMinutes = 'Program:MissMinutes',
}

export type OptionText = [before: string, hotkey: string, after: string];

export enum ProgramStateId {
  None = 'ProgramState:None',
  Initialising = 'ProgramState:Initialising',
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

export interface MainMenuProgram {
  svgRect: null | PlainRect,
  visible: boolean,
  iconStateId: OptionStateId,
}

export interface ProgramCommandInstance {
  active: boolean,
  disabled: boolean,
  stateId: OptionStateId,
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

export interface State {
  core: {
    programIds: ProgramId[],
    commands: {
      byId: { [ID in ProgramId]: ProgramCommandContainer<ID> },
    },
    programs: {
      byId: { [ID in ProgramId]: ProgramContainer<ID> }
    },
  },
  ui: {
    targetViewId: ViewId;
    fadingViewIds: ViewId[];
    latency: number,
    tempac: {
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
        byId: { [K in ProgramId]?: MainMenuProgram },
      },
      defaultCommands: ProgramCommandInstance[],
      defaultCommandsLabel: OptionText,
    },
    [ViewId.Program]: {
      viewId: ViewId.Program,
      targetId: null | ProgramId;
    },
  }
};

const optionCommandLabel: ProgramCommandInstance = {
  active: false,
  disabled: true,
  stateId: OptionStateId.None,
  opcode: Opcode.ExecuteProgramOptions,
  label: ['', 'O', 'ptions'],
};

const runProgramCommandLabel: ProgramCommandInstance = {
  active: false,
  disabled: true,
  stateId: OptionStateId.None,
  opcode: Opcode.ExecuteRunProgram,
  label: ['', 'R', 'un Program'],
}

const clearCacheCommandLabel: ProgramCommandInstance = {
  active: false,
  disabled: true,
  stateId: OptionStateId.None,
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
    programIds: [
      ProgramId.Timedoor,
      ProgramId.Settings,
      ProgramId.Directory,
      ProgramId.MissMinutes,
    ],
    programs: {
      byId: {
        [ProgramId.Timedoor]: {
          programId: ProgramId.Timedoor,
          instance: {
            programId: ProgramId.Timedoor,
            stateId: ProgramStateId.None,
            iconSvg: SvgIcon.TimeDoor,
            iconLabel: ['', '', 'Timedoor'],
          },
        },
        [ProgramId.Settings]: {
          programId: ProgramId.Settings,
          instance: {
            programId: ProgramId.Settings,
            stateId: ProgramStateId.None,
            iconSvg: SvgIcon.Settings,
            iconLabel: ['', '', 'Settings'],
          },
        },
        [ProgramId.Directory]: {
          programId: ProgramId.Directory,
          instance: {
            programId: ProgramId.Directory,
            stateId: ProgramStateId.None,
            iconSvg: SvgIcon.Directory,
            iconLabel: ['', '', 'Directory'],
          },
        },
        [ProgramId.MissMinutes]: {
          programId: ProgramId.MissMinutes,
          instance: {
            programId: ProgramId.MissMinutes,
            stateId: ProgramStateId.None,
            iconSvg: SvgIcon.MissMinutes,
            iconLabel: ['', '', 'Miss Minutes'],
          },
        },
      },
    },
    commands: {
      byId: {
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
    tempac: {
      orientation: Orienation.Portrait,
      height: 640,
      width: 360,
      fontSize: 16,
    },
  },
  views: {
    [ViewId.Program]: {
      viewId: ViewId.Program,
      targetId: null,
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
