import $ from 'jquery';
import { fade } from '../../utils/css/fade.css';
import { typewrite } from '../../utils/css/typewrite.css';
import { MutationListener } from '../../utils/mutation-listener2';
import { ResizeListener } from '../../utils/resize-listener';
import { wait } from '../../utils/wait';
import * as _html from './timedoor.html';
import './timedoor.scss';

interface TimedoorPageProps { startingRect: DOMRect };
export async function timedoorPage(props: TimedoorPageProps) {
  const { startingRect } = props;
  $('#page-container').append(_html.page({ text: _html.text__loading() }))
  await initialise(startingRect);
  await menu();
}

/**
 * Initialise the page
 *
 * @param rect
 */
async function initialise(rect: DOMRect): Promise<void> {
  // const totalDurationMs = 30000;
  const totalDurationMs = 1500;

  await Promise.all([
    // loading
    (async () => {
      let runningDurationMs = 0;
      let index = 0;
      for (const e of $('#timedoor-page__text__loading').find('.typewriter__line')) {
        const count = $('#timedoor-page__text__loading').find('.typewriter__line').length;
        let nextDurationMs = (totalDurationMs - runningDurationMs) / Math.max(1, (count - index));
        console.log('dur:', nextDurationMs);
        index += 1;
        runningDurationMs += nextDurationMs;
        // TODO: why isn't this typwrtiting
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
        const targetRect = $('#timedoor-page__icon').get(0)!.getBoundingClientRect();
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
      $('#timedoor-page__icon').append($('#timedoor-moving'));
      $('#timedoor-moving').attr('id', 'timedoor-static');
    })(),
  ]);
}

/**
 * Show the menu
 */
async function menu() {
  $('#timedoor-page__text__loading').css(fade(500));
  // simultaneously clear the loading view bring-in the next
  await Promise.all([
    // remove loading text
    (async () => {
      await wait(500);
      $('#timedoor-page__text__loading').remove();
    })(),

    // start menu text
    (async () => {
      await wait(250);
      $('#timedoor-page__text').append(_html.text__menu())
      for (const e of $('#timedoor-page__text__menu').find('.typewriter__line')) {
        $(e).css(typewrite(250));
        await wait(250);
        $(e).prop('disabled', false);
      }
    })(),
  ]);

  $('#timedoor-page__btn-expand').on('click', function() {
    // add glow
    console.log('adding glow...');
    $('body').append(_html.icon__glow());
    repositionGlows();
  });

  // on resizes, reposition glow effects
  // on page change, remove glow effects
  const resizes = new ResizeListener('body');
  resizes.on(() => { repositionGlows(); });
  const mutations = new MutationListener('#timedoor-page');
  const subscription = mutations
    .onRemove$('#timedoor-page__icon')
    .subscribe(() => {
      subscription.unsubscribe();
      resizes.destruct();
      $('#timedoor-page__icon__glow').remove();
    });

  function repositionGlows() {
    console.log('repositioning glows...');
    const body = $('body').get(0);
    const icon = $('#timedoor-page__icon').get(0);
    if (!icon || !body) return;
    const bodyRect = body.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    const translateX = ((bodyRect.width / 2) + iconRect.x);
    const translateY = ((bodyRect.height / 2) + iconRect.y);
    // TODO: fix positioning
    $('.timedoor-page__icon__glow').each(function () {
      $(this).css({
        top: `${iconRect.top}px`,
        left: `${iconRect.left}px`,
        height: '100%',
        width: '100%',
        transform: `translate(-${translateX}px, -${translateY}px)`,
      })
    })
  }
}
