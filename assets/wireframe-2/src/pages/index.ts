import $ from 'jquery';
import { ResizeListener } from '../utils/resize-listener';
import { memo1 } from '../utils/memo1';
import 'normalize.css';
import './index.scss';
import { Observable } from 'rxjs';

import TimedoorSvg from '../assets/timedoor.svg';
import DirectorySvg from '../assets/directory.svg';
import SettingsSvg from '../assets/settings.svg';
import MissMinutesSvg from '../assets/missminutes.svg';
import SvgAppbarIcon1 from '../assets/appbar-1.svg';
import SvgAppbarIcon2 from '../assets/appbar-2.svg';
import SvgAppbarIcon3 from '../assets/appbar-3.svg';
import SvgAppbarIcon4 from '../assets/appbar-4.svg';
import SvgAppbarIcon5 from '../assets/appbar-5.svg';
import SvgTvaLogo from '../assets/logo_tva.svg';
import { MutationListener } from '../utils/mutation-listener2';
import { timedoorPage } from './timedoor/timedoor';
import { wait } from '../utils/wait';
import { fade } from '../utils/css/fade.css';

function getSvg(type: string | undefined): null | string {
  if (!type) return null;
  switch (type) {
    case 'timedoor': return TimedoorSvg;
    case 'settings': return SettingsSvg;
    case 'directory': return DirectorySvg;
    case 'missminutes': return MissMinutesSvg;
    case 'appbar-item-1': return SvgAppbarIcon1;
    case 'appbar-item-2': return SvgAppbarIcon2;
    case 'appbar-item-3': return SvgAppbarIcon3;
    case 'appbar-item-4': return SvgAppbarIcon4;
    case 'appbar-item-5': return SvgAppbarIcon5;
    case 'tvalogo': return SvgTvaLogo;
  }
  return null;
}

function domRectsEq(a: DOMRect, b: DOMRect): boolean {
  return a.x === b.x
    && a.y === b.y
    && a.top === b.top
    && a.right === b.right
    && a.left === b.left
    && a.bottom === b.bottom
    && a.height === b.height
    && a.width === b.width;
}

// ensure tempad stays within parent at correct aspect ratio
const ar = 16 / 9;
const resizes = new ResizeListener('body');
(window as any).resizes = resizes;
resizes.on(() => {
  const $container = $('#main-content');
  const containerHeight = $container.height(); // height within padding
  const containerWidth = $container.width(); // width withing padding
  if (!containerHeight) return void console.warn('#main-content has no height');
  if (!containerWidth) return void console.warn('#main-content has no width');
  let nextHeight: number
  let nextWidth: number;
  let portrait: boolean;
  if (containerHeight > containerWidth) {
    portrait = true;
    // (portrait)
    nextHeight = containerHeight;
    nextWidth = containerHeight / ar;
    if (nextWidth > containerWidth) {
      // shrink to width
      nextWidth = containerWidth;
      nextHeight = ar * nextWidth;
    } else {
      // maximise height
    }
  } else {
    portrait = false;
    // horizontal
    nextWidth = containerWidth;
    nextHeight = containerWidth / ar;
    if (nextHeight > containerHeight) {
      // shrink to height
      nextHeight = containerHeight;
      nextWidth = ar * nextHeight;
    } else {
      // maximise width
    }
  }

  let fontSize: number;
  if (portrait) {
    $('#tempad-container').addClass('portrait');
    $('#tempad-container').removeClass('landscape');
    fontSize = 0.07 * nextWidth;
  } else {
    $('#tempad-container').removeClass('portrait');
    $('#tempad-container').addClass('landscape');
    fontSize = 0.07 * nextHeight;
  }

  $('body').css({
    fontSize: `${fontSize}px`,
  });
  $('#tempad-container').css({
    height: `${nextHeight}px`,
    width: `${nextWidth}px`,
  });
});

const mutations = new MutationListener('body');
mutations.listen();

function handleSvgLoad(element: HTMLElement) {
  const type = element.dataset.svg;
  console.log(handleSvgLoad.name, type);
  const svgHtml = getSvg(type);
  if (!svgHtml) return void console.warn(`svg: "${type}" not found`);
  const ghost = document.createElement('div');
  ghost.innerHTML = svgHtml;
  const height = ghost.querySelector('svg')?.attributes.getNamedItem('height');
  const width = ghost.querySelector('svg')?.attributes.getNamedItem('width');
  if (!height) return void console.warn(`svg "${type}" has no height`);
  if (!width) return void console.warn(`svg "${type}" has no width`);
  const nHeight = Number(height.value).toFixed(0);
  const nWidth = Number(width.value).toFixed(0);
  // set the aspect ratio for every svg
  const aspectRatio = `${nWidth} / ${nHeight}`;
  $(element)
    .html(svgHtml)
    .css({ aspectRatio })
    .find('svg')
    .removeAttr('height')
    .removeAttr('width')
  ;
}
mutations.onAdd$('[data-svg]').subscribe(handleSvgLoad);
$('[data-svg]').each((i, element) => void handleSvgLoad(element));


function setAbortableTimeout(
  fn: () => any,
  delay: number,
  signal?: undefined | null | AbortSignal,
): undefined | ReturnType<typeof setTimeout> {
  if (signal) {
    if (signal.aborted) return undefined;
    signal.addEventListener('abort', (evt) => {
      clearTimeout(to);
    });
  }
  const to = setTimeout(() => {
    if (signal?.aborted) clearTimeout(to);
    else fn();
  }, delay);
  return to;
}

{
  function handleIconsLoad() {
    // on icons click
    let prev: null | AbortController;
    $('#icons')
      .children()
      .on('click', function onIconClick() {
        const program = this.dataset.program;
        if (!program) return console.warn('unknown program');
        // not already active
        if (this.classList.contains('active')) return;
        // remove other actives
        $('#icons').children().not(this).removeClass('active');
        // now active
        $(this).addClass('active');
        console.log(`selected ${program}`);
        // de-activate and re-activate commands
        if (prev) prev?.abort();
        const aborter = new AbortController();
        prev = aborter;
        let i = 0;
        const wait = 100;
        $('#action__list')
          .children()
          .prop('disabled', true)
          .removeClass('active')
          .off('click') // remove old click handlesr before adding new
          .each(function () {
            setAbortableTimeout(
              () => { $(this).prop('disabled', false); },
              (i += 1) * wait,
              aborter.signal,
            );
            $(this).on('click', function onCommandClick() {
              const command = this.dataset.command;
              if (!command) return console.warn(`unknown program (${program}) command`);
              // not already active
              if (this.classList.contains('active')) return
              // remove other actives
              $('#action__list').children().not(this).removeClass('active');
              console.log(`selected ${program}:${command}`);
              // set active
              this.classList.add('active');
              handleRunProgramCommand(program, command);
            });
          })
      });
  }
  mutations.onAdd$('#icons').forEach(handleIconsLoad);
  handleIconsLoad();
}

const handlers: Record<string, undefined | Record<string, undefined | (() => void)>> = {
  timedoor: {
    options() { console.log('running timedoor:options')},
    async runprogram() {
      console.log('running timedoor program...');
      const startingRect = $('.icon__btn.timedoor').get(0).getBoundingClientRect();
      timedoorPage({ startingRect });
      $('#mainmenu').css(fade(500));
      await wait(500);
      $('#mainmenu').remove();
    },
    clearcache() { console.log('running timedoor:clearcache'); },
  },
  missminutes: {
    options() { console.log('running missminutes:options')},
    runprogram() { console.log('running missminutes program...'); },
    clearcache() { console.log('running missminutes:clearcache'); },
  },
  settings: {
    options() { console.log('running settings:options')},
    runprogram() { console.log('running settings program...'); },
    clearcache() { console.log('running settings:clearcache'); },
  },
  directory: {
    options() { console.log('running directory:options')},
    runprogram() { console.log('running directory program...'); },
    clearcache() { console.log('running directory:clearcache'); },
  },
};

function handleRunProgramCommand(program: string, command: string) {
  const programHandler = handlers[program];
  if (!programHandler) return void console.warn(`unhandled program ${program}`);
  const commandHandler = programHandler[command];
  if (!commandHandler) return void console.warn(`unhandled command ${program}:${command}`);
  commandHandler();
}


// console.log('wHat');


// function component() {
//   const element = document.createElement('div');

//   hello();

//   // Lodash, currently included via a script, is required for this line to work
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   return element;
// }

// document.body.appendChild(component());

// console.log('hi');
// console.log('hi');
// console.log('hi');
// console.log('hi');
