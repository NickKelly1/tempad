import $ from 'jquery';
import { fade } from "./css/fade.css";
import { switchoff } from "./css/switchoff.css";
import { switchon } from "./css/switchon.css";
import { wait } from "./wait";

export enum AnimationType {
  SwitchOn = 'SwitchOn',
  SwitchOff = 'SwitchOff',
  Fade = 'Fade',
}

export type AnimationDefinition =
  | { type: AnimationType.SwitchOn, duration: number, props?: void }
  | { type: AnimationType.SwitchOff, duration: number, props?: void }
  | { type: AnimationType.Fade, duration: number, props?: void }
;

export async function animate(selector: string, animation: AnimationDefinition) {
  switch (animation.type) {
    case AnimationType.SwitchOn: {
      $(selector).css(switchon(animation.duration));
      await wait(animation.duration);
      break;
    }
    case AnimationType.SwitchOff: {
      $(selector).css(switchoff(animation.duration));
      await wait(animation.duration);
      break;
    }
    case AnimationType.Fade: {
      $(selector).css(fade(animation.duration));
      await wait(animation.duration);
      break;
    }
  }
}
