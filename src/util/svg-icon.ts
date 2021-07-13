import CubeSvg from '../assets/ico/cube.svg';
import CogSvg from '../assets/ico/cog.svg';
import DirectorySvg from '../assets/ico/directory.svg';

export enum SvgIcon {
  TimeDoor = 'TimeDoor',
  Settings = 'Settings',
  Directory = 'Directory',
  MissMinutes = 'MissMinutes',
}

export function getSvgIcon(kind: SvgIcon): React.ElementType<React.SVGProps<SVGSVGElement>> {
  switch (kind) {
    case SvgIcon.TimeDoor: return CubeSvg;
    case SvgIcon.Settings: return CogSvg;
    case SvgIcon.Directory: return DirectorySvg;
    case SvgIcon.MissMinutes: return DirectorySvg;
    default: throw new TypeError(`Unknown svg "${kind}"`);
  }
}