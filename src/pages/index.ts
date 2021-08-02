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
import { pageController } from './page-controller';
import { mainMenuPage } from './mainmenu/mainmenu.page';
import { AnimationType } from '../utils/animate';

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
  // always landscape
  // if (containerHeight > containerWidth) {
  //   portrait = true;
  //   // (portrait)
  //   nextHeight = containerHeight;
  //   nextWidth = containerHeight / ar;
  //   if (nextWidth > containerWidth) {
  //     // shrink to width
  //     nextWidth = containerWidth;
  //     nextHeight = ar * nextWidth;
  //   } else {
  //     // maximise height
  //   }
  // } else {
  portrait = false;
  // landscape
  nextWidth = containerWidth;
  nextHeight = containerWidth / ar;
  if (nextHeight > containerHeight) {
    // shrink to height
    nextHeight = containerHeight;
    nextWidth = ar * nextHeight;
  } else {
    // maximise width
  }
  // }

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

// inject svg data
mutations.onAdd$('[data-svg]').subscribe(handleSvgLoad);
$('[data-svg]').each((i, element) => void handleSvgLoad(element));
new MutationObserver((records) => {
  records
    .flatMap(record => Array.from(record.addedNodes)
    .filter((node): node is HTMLElement => (node instanceof HTMLElement))
    .forEach(element => {
      element
        .querySelectorAll('[data-svg]')
        .forEach((element) => {
          handleSvgLoad(element as HTMLElement);
        })
    }))
}).observe(document.querySelector('body')!, {
  childList: true,
  subtree: true,
});

// start by opening the main menu page
pageController.open(mainMenuPage, {
  animation: {
    type: AnimationType.SwitchOn,
    duration: 500,
  },
});
