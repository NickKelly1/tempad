import CubeSvg from '../assets/ico/cube.svg';
import CogSvg from '../assets/ico/cog.svg';
import DirectorySvg from '../assets/ico/directory.svg';

export enum Svg {
  TimeDoor = 'TimeDoor',
  Settings = 'Settings',
  Directory = 'Directory',
  MissMinutes = 'MissMinutes',
}

export function GetSvg(kind: Svg): React.ElementType<React.SVGProps<SVGSVGElement>> {
  switch (kind) {
    case Svg.TimeDoor: return CubeSvg;
    case Svg.Settings: return CogSvg;
    case Svg.Directory: return DirectorySvg;
    case Svg.MissMinutes: return DirectorySvg;
    default: throw new TypeError(`Unknown svg "${kind}"`);
  }
}