import { html } from "../../utils/html";

/* html */
export const page = html`
<div id="timedoor-page" class="page">
  <div id="timedoor-page__icon"></div>
  <div id="timedoor-page__text" class="typewriter">
    ${'text'}
  </div>
</div>
`

export const icon__glow = html`
<div
  class="timedoor-page__icon__glow"
  style="
    position: absolute;
    height: 0;
    width: 0;
  "
>
</div>
`;

export const text__loading = html`
<div id="timedoor-page__text__loading" class="typewriter">
  <div class="typewriter__line">
    ////////
  </div>
  <div class="typewriter__line">
    BUILDING TIMEDOOR
  </div>
  <div class="typewriter__line">
    PLEASE WAIT<span class="blink">...</span>
  </div>
</div>
`;

export const text__menu = html`
<div id="timedoor-page__text__menu" class="typewriter">
  <div class="command-menu">
    <div class="typewriter__line command-menu__header">
      <u>T</u>IMEDOOR ACTIVE<span class="blink">...</span>
    </div>
    <div id="timedoor-page__menu__actions">
      <ul id="timedoor-page__actions__list" class="command-menu__list">
        <button id="timedoor-page__btn-expand" disabled class="typewriter__line runnable">
          <li>EXPAND</li>
        </button>
        <button id="timedoor-page__btn-close" disabled class="typewriter__line runnable">
          <li>CLOSE</li>
        </button>
      </ul>
    </div>
  </div>
</div>
`

export const movingIcon = html`
<div
  id="timedoor-moving"
  style="
    position: absolute;
    top: ${'top'}px;
    left: ${'left'}px;
    height: ${'height'}px;
    width: ${'width'}px;
  "
  class="icon__btn runnable active"
>
  <div data-svg="timedoor">
  </div>
  <label class="btn-text">TIMEDOOR</label>
</div>
`;