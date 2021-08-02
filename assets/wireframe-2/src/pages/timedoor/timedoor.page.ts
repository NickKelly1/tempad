import $ from 'jquery';
import { Page } from '../../types';
import { animate, AnimationDefinition, AnimationType } from '../../utils/animate';
import { fade } from '../../utils/css/fade.css';
import { glow } from '../../utils/css/glow.css';
import { switchoff } from '../../utils/css/switchoff.css';
import { switchon } from '../../utils/css/switchon.css';
import { typewrite } from '../../utils/css/typewrite.css';
import { MutationListener } from '../../utils/mutation-listener2';
import { Observable } from '../../utils/observable';
import { ResizeListener } from '../../utils/resize-listener';
import { wait } from '../../utils/wait';
import { mainMenuPage } from '../mainmenu/mainmenu.page';
import { pageController } from '../page-controller';
import * as _html from './timedoor.html';
import './timedoor.scss';

const mutations = new Observable<[MutationRecord[]]>();
const mobserver = new MutationObserver((records) => {
  mutations.fire(records);
});

const resizes = new Observable<[ResizeObserverEntry[]]>();
const robserver = new ResizeObserver((records) => {
  resizes.fire(records);
});


export interface TimedoorPageOpenProps {
  startingRect: DOMRect,
};
async function open(props: TimedoorPageOpenProps) {
  const { startingRect } = props;
  $('#page-container').append(_html.page({ text: _html.text__loading() }))
  mobserver.observe(document.querySelector('body')!, {
    childList: true,
    subtree: true,
  });
  await initialise(startingRect);
  await menu();
}

/**
 * Initialise the page
 *
 * @param rect
 */
async function initialise(rect: DOMRect): Promise<void> {
  const totalDurationMs = 1500;

  await Promise.all([
    // loading
    (async () => {
      let runningDurationMs = 0;
      let index = 0;
      for (const e of $('#tp .stxt__loading').find('.tw__l')) {
        const count = $('#tp .stxt__loading').find('.tw__l').length;
        let nextDurationMs = (totalDurationMs - runningDurationMs) / Math.max(1, (count - index));
        index += 1;
        runningDurationMs += nextDurationMs;
        $(e).css(typewrite(nextDurationMs));
        await wait(nextDurationMs);
      }
    })(),

    // icon
    (async () => {
      // initialise the moving icon
      $('body').append(_html.movingIcon({
        top: rect.top,
        left: rect.left,
        height: rect.height,
        width: rect.width,
      }));

      // interpolate movement
      //  - from the icons starting position
      //  - onto the pages icon containing rect
      const steps = 10;
      const stepMs = Math.floor(totalDurationMs / steps);
      for (let step = 0; step < steps; step += 1) {
        const prevRect = $('#timedoor-moving').get(0)!.getBoundingClientRect();
        const targetRect = $('#tp .sicon').get(0)!.getBoundingClientRect();
        // linearly interpolate position
        const interpolation = ((step - steps) / steps)
        const top = targetRect.top + interpolation * (targetRect.top - prevRect.top );
        const left = targetRect.left + interpolation * (targetRect.left - prevRect.left );
        const width = targetRect.width + interpolation * (targetRect.width - prevRect.width );
        const height = targetRect.height + interpolation * (targetRect.height - prevRect.height );
        $('#timedoor-moving').css({ top, left, width, height, });
        await wait(stepMs);
      }

      // transfer the moving icon
      //  - from the body absolutely
      //  - onto the page statically
      $('#timedoor-moving').css({
        position: '',
        top: '',
        left: '',
        height: '100%',
        width: '100%',
      });
      $('#tp .sicon').append($('#timedoor-moving'));
      $('#timedoor-moving').removeAttr('#timedoor-moving');
    })(),
  ]);
}

/**
 * Show the menu
 */
async function menu() {
  $('#tp .stxt__loading').css(fade(500));
  // simultaneously clear the loading view bring-in the next
  await Promise.all([
    // remove loading text
    (async () => {
      await wait(500);
      $('#tp .stxt__loading').remove();
    })(),

    // start menu text
    (async () => {
      await wait(250);
      $('#tp .stxt').append(_html.text__menu())
      for (const e of $('#tp .stxt__menu .tw__l')) {
        $(e).css(typewrite(250));
        await wait(250);
        $(e).prop('disabled', false);
      }
    })(),
  ]);

  // ----------------
  // ----- expand -----
  // ----------------

  let maxGlowStrength = 0.8;
  let glowStrength = 0.1 * maxGlowStrength;
  function glowBackground(): string {
    return `
      radial-gradient(
        circle at center,
        rgba(var(--primary-light_rgb), ${(glowStrength).toFixed(1)}),
        rgba(var(--primary-light_rgb), 0.0)
      )
    `;
  }
  let isGlowing = false;
  let activeTout: undefined | ReturnType<typeof setTimeout>;
  $('#tp .btn-expand').on('click', function() {
    if (!isGlowing) {
      isGlowing = true;
      $('body').append(_html.icon__glow());
      repositionGlow();
      $('.tp__glow').css({
        background: glowBackground(),
        ...glow(2000),
      });
    }
    if (activeTout) clearTimeout(activeTout);
    activeTout = setTimeout(() => $(this).removeClass('active'), 100);
    $(this).addClass('active');
    console.log('strengthening glow...');
    if (glowStrength < (0.9 * maxGlowStrength)) {
      // take linear steps
      glowStrength += 0.1 * maxGlowStrength;
    } else {
      // get asymptotically close to maxGlowStrength
      glowStrength = glowStrength + 0.75 * (maxGlowStrength - glowStrength);
    }
    $('.tp__glow').css({ 'background': glowBackground() });
  });

  // on resizes, reposition glow effects
  // on page change, remove glow effects
  robserver.observe(document.querySelector('body')!);
  resizes.on(repositionGlow);

  function repositionGlow() {
    console.log('repositioning glow...');
    const body = $('body').get(0);
    const icon = $('#tp .sicon').get(0);
    if (!icon || !body) return;
    const bodyRect = body.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    // center of glow
    const centerX = (iconRect.left + iconRect.width / 2);
    const centerY = (iconRect.top + iconRect.height / 2);

    const dTop = centerY - bodyRect.top;
    const dBottom = bodyRect.bottom - centerY;
    const dLeft = centerX - bodyRect.left;
    const dRight = bodyRect.right - centerX;
    const maxDimension = [dBottom, dLeft, dRight].reduce(
      (next, min) => next > min ? next : min,
      dTop,
    );
    const top = centerY - maxDimension;
    const height = maxDimension * 2;
    const left = centerX - maxDimension;
    const width = maxDimension * 2;

    $('.tp__glow').each(function () {
      $(this).css({
        top: `${top}px`,
        height: `${height}px`,
        left: `${left}px`,
        width: `${width}px`,
      });
    })
  }

  // -----------------
  // ----- close -----
  // -----------------

  $('#tp .btn-close').on('click', async function() {
    $(this).addClass('active');
    // close this page
    await pageController.close(timedoorPage, {
      animation: {
        type: AnimationType.SwitchOff,
        duration: 500,
      },
    });
    // open mainmenu page
    await pageController.open(mainMenuPage, {
      animation: {
        type: AnimationType.SwitchOn,
        duration: 500,
      },
    });
  });
}

interface TimedoorPageCloseProps {
  animation?: AnimationDefinition;
}

async function close(props: TimedoorPageCloseProps) {
  const { animation } = props;

  mobserver.disconnect();
  mutations.removeListeners();

  robserver.disconnect();
  resizes.removeListeners();

  if (animation){
    $('.tp__glow').addClass('pause-animation');
    await Promise.all([
      animate('#tp', animation),
      animate('.tp__glow', {
        type: AnimationType.Fade,
        duration: animation.duration,
      })
    ])
    $('#tp').remove();
    $('.tp__glow').remove();
  }

  $('.tp__glow').remove();
  $('#tp').remove();
}

export const timedoorPage: Page<TimedoorPageOpenProps, TimedoorPageCloseProps> = {
  id: 'timedoor',
  open,
  close,
}
