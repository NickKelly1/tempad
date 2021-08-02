import { html } from "../../utils/html";

export const page = html`
<div id="mainmenu" class="page">
  <div id="appbar">
    <ol id="appbar__list">
      <button class="runnable appbar__btn">
        <li class="appbar__item" data-svg="appbar-item-1"></li>
      </button>
      <button class="runnable appbar__btn">
        <li class="appbar__item" data-svg="appbar-item-2"></li>
      </button>
      <button class="runnable appbar__btn">
        <li class="appbar__item" data-svg="appbar-item-3"></li>
      </button>
      <button class="runnable appbar__btn">
        <li class="appbar__item" data-svg="appbar-item-4"></li>
      </button>
      <button class="runnable appbar__btn">
        <li class="appbar__item" data-svg="appbar-item-5"></li>
      </button>
    </ol>
  </div>
  <div id="datebar">
    <span id="datebar__date">04.12.1905</span>
    <span id="datebar__hours">0232.467</span>
    <span id="datebar__separator">//</span>
    <span id="datebar__seconds">9751.202</span>
  </div>
  <div id="tvalogo">
    <div data-svg="tvalogo"></div>
  </div>
  <div id="icons">
    <button
      class="runnable icon__btn timedoor"
      data-program="timedoor"
    >
      <div data-svg="timedoor"></div>
      <label class="btn__text">TIMEDOOR</label>
    </button>
    <button
      class="runnable icon__btn missminutes"
      data-program="missminutes"
    >
      <div data-svg="missminutes"></div>
      <label class="btn__text">MISS MINUTES</label>
    </button>
    <button
      class="runnable icon__btn settings"
      data-program="settings"
    >
      <div data-svg="settings"></div>
      <label class="btn__text">SETTINGS</label>
    </button>
    <button
      class="runnable icon__btn directory"
      data-program="directory"
    >
      <div data-svg="directory"></div>
      <label class="btn__text">DIRECTORY</label>
    </button>
  </div>
  <div id="actions" class="cm">
    <div class="cm__header">
      <div>ACTION LIST ////</div>
      <div><u>S</u>ELECT PROGRAM</div>
    </div>
    <ol id="action__list" class="cm__list">
      <button
        disabled
        class="runnable btn__text"
        data-command="options"
      >
        <li class="action__item"><u>O</u>PTIONS</li>
      </button>
      <button
        disabled
        class="runnable btn__text"
        data-command="runprogram"
      >
        <li class="action__item"><u>R</u>UN PROGRAM</li>
      </button>
      <button
        disabled
        class="runnable btn__text"
        data-command="clearcache"
      >
        <li class="action__item"><u>C</u>LEAR CACHE</li>
      </button>
    </ol>
  </div>
</div>
`;
