import $ from 'jquery';
import _ from 'lodash';
import { ResizeListener } from '../utils/resize-listener';
import { memo1 } from '../utils/memo1';
import 'normalize.css';
import './index.scss';

import TimedoorSvg from '../assets/timedoor.svg';
import DirectorySvg from '../assets/directory.svg';
import SettingsSvg from '../assets/directory.svg';
import MissMinutesSvg from '../assets/directory.svg';
import { Observable } from '../utils/observable';
import { MutationListener } from '../utils/mutation-listener';

const ro = new ResizeObserver(() => {
  //
});
ro.observe(document.querySelector('body')!);

function getSvg(type: string | undefined): null | string {
  if (!type) return null;
  switch (type) {
    case 'timedoor':
      return TimedoorSvg;
    case 'settings':
      return SettingsSvg;
    case 'directory':
      return DirectorySvg;
    case 'missminutes':
      return MissMinutesSvg;
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

const $body: JQuery<HTMLBodyElement> = $('body')!;
const $tempadContainer: JQuery<HTMLDivElement> = $('#tempad-container')!;
const $tempad: JQuery<HTMLDivElement> = $('#tempad')!;

// const insertions = new MutationListener('body');
// (window as any).insertions = insertions;


// ensure tempad stays within parent at correct aspect ratio
const ar = 16 / 9;
const resizes = new ResizeListener($body.get(0));
(window as any).resizes = resizes;
resizes.on(() => {
  const rectBody = $body.get(0).getBoundingClientRect();
  const { height: bodyHeight, width: bodyWidth, } = rectBody;
  let nextHeight: number
  let nextWidth: number;
  let portrait: boolean;
  if (bodyHeight > bodyWidth) {
    portrait = true;
    // (portrait)
    nextHeight = bodyHeight;
    nextWidth = bodyHeight / ar;
    if (nextWidth > bodyWidth) {
      // shrink to width
      nextWidth = bodyWidth;
      nextHeight = ar * nextWidth;
    } else {
      // maximise height
    }
  } else {
    portrait = false;
    // horizontal
    nextWidth = bodyWidth;
    nextHeight = bodyWidth / ar;
    if (nextHeight > bodyHeight) {
      // shrink to height
      nextHeight = bodyHeight;
      nextWidth = ar * nextHeight;
    } else {
      // maximise width
    }
  }

  let fontSize: number;
  if (portrait) {
    $tempadContainer.addClass('portrait');
    $tempadContainer.removeClass('landscape');
    fontSize = 0.07 * nextWidth;
  } else {
    $tempadContainer.removeClass('portrait');
    $tempadContainer.addClass('landscape');
    fontSize = 0.07 * nextHeight;
  }

  $tempadContainer.css({
    height: `${nextHeight}px`,
    width: `${nextWidth}px`,
    fontSize: `${fontSize}px`,
  });
});

// $('#tempad').

$('[data-svg]').each((i, node) => {
  $(node)
    .html(getSvg(node.dataset.svg)!)
    .find('svg')
    .removeAttr('height')
    .removeAttr('width');
});

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
