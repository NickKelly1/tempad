'use strict';

const aspectRatio = 16 / 9;

const e_body = document.getElementsByTagName('body')[0];
const e_page = document.getElementById('page');
const e_responsive = document.getElementById('responsive');
const e_content = document.getElementById('content');
const e_tempad = document.getElementById('tempad');
const e_info = document.getElementById('info');

/** @type {DOMRect} */ let rect_body;
/** @type {DOMRect} */ let rect_page;
/** @type {DOMRect} */ let rect_responsive;
/** @type {DOMRect} */ let rect_content;
/** @type {DOMRect} */ let rect_tempad;
/** @type {DOMRect} */ let rect_info;
updateRects();

window.addEventListener('resize', handleResize);
handleResize();

function handleResize() {
  updateRects();
  updateInfo();
}

function updateRects() {
  rect_body = e_body.getBoundingClientRect();
  rect_page = e_page.getBoundingClientRect();
  rect_responsive = e_responsive.getBoundingClientRect();
  rect_content = e_content.getBoundingClientRect();
  rect_tempad = e_tempad.getBoundingClientRect();
  rect_info = e_info.getBoundingClientRect()

  // maintain aspect ratio of tempad

  const maxHeight = rect_content.height;
  const maxWidth = rect_content.width;
  // modify width to maintain height
  const nextWidth = (1 / aspectRatio) * maxHeight;
  let fin_height;
  let fin_width;
  if (nextWidth <= maxWidth) {
    console.log({ maxWidth, maxHeight, nextWidth });
    fin_height = maxHeight;
    fin_width = nextWidth;
  } else {
    const nextHeight = aspectRatio * maxWidth;
    fin_height = nextHeight;
    fin_width = maxWidth;
  }
  e_tempad.style.height = `${fin_height}px`;
  e_tempad.style.width = `${fin_width}px`;
  e_body.style.fontSize = `${Math.round(fin_width / 23)}px`;
  console.log(e_tempad.style.height);
  console.log(e_tempad.style.width);
  // e_body.style.fontSize = `${}px`;
}

function updateInfo() {
  e_info.innerHTML = /* html */ `
    <table>
      <thead>
        <tr>
          <th>n</th>
          <th>x</th>
          <th>y</th>
          <th>w</th>
          <th>h</th>
          <th>t</th>
          <th>r</th>
          <th>b</th>
          <th>l</th>
        </tr>
      </thead>
      <tbody>
          ${[
            ['pag', rect_page],
            ['res', rect_responsive],
            ['cont', rect_content],
            ['tmp', rect_tempad],
            ['inf', rect_info]
          ].map(
            /** @param {[string, DOMRect]} arg */
            ([name, rect]) => /* html */ `
              <tr>
                <td>${name}</td>
                <td>${rect.x.toFixed(0)}</td>
                <td>${rect.y.toFixed(0)}</td>
                <td>${rect.width.toFixed(0)}</td>
                <td>${rect.height.toFixed(0)}</td>
                <td>${rect.top.toFixed(0)}</td>
                <td>${rect.bottom.toFixed(0)}</td>
                <td>${rect.left.toFixed(0)}</td>
                <td>${rect.right.toFixed(0)}</td>
              </tr>
            `
          ).join('\n')}
      </tbody>
    </table>
  `;
}
