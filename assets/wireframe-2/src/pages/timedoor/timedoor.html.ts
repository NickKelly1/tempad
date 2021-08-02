import { html } from "../../utils/html";

/* html */
export const page = html`
<div id="tp" class="page">
  <section class="sicon"></section>
  <section class="stxt tw">
    ${'text'}
  </section>
</div>
`

// tp__glow is modified in js
// sizes up to whole body
export const icon__glow = html`
<div class="tp__glow" style="height: 0; width: 0"> </div>
`;

export const text__loading = html`
<div class="tw stxt__loading">
  <div class="tw__l">
    ////////
  </div>
  <div class="tw__l">
    BUILDING TIMEDOOR
  </div>
  <div class="tw__l">
    PLEASE WAIT<span class="blink">...</span>
  </div>
</div>
`;

export const text__menu = html`
<div class="tw stxt__menu">
  <div class="cm">
    <div class="tw__l cm__header">
      <u>T</u>IMEDOOR ACTIVE<span class="blink">...</span>
    </div>
    <div>
      <ul class="cm__list">
        <button disabled class="tw__l btn-expand runnable">
          <li class="btn__text"><u>E</u>XPAND</li>
        </button>
        <button disabled class="tw__l btn-close runnable">
          <li class="btn__text"><u>C</u>LOSE</li>
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
  <label class="btn__text">TIMEDOOR</label>
</div>
`;