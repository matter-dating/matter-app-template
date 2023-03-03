import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
  <style type="text/css">
    .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#5CC4E3;}
  </style>
  <g id="Layer_1">
  </g>
  <g id="Layer_2">
    <g>
      <path class="st0" d="M61,73.9c1.6-1.6,3.8-2.5,6-2.5h17c4.7,0,8.5-3.8,8.5-8.5V20.1c0-4.7-3.8-8.5-8.5-8.5H16
        c-4.7,0-8.5,3.8-8.5,8.5v42.7c0,4.7,3.8,8.5,8.5,8.5h17c2.3,0,4.4,0.9,6,2.5l11,11L61,73.9z M50,97L33,79.9H16
        c-9.4,0-17-7.7-17-17.1V20.1C-1,10.7,6.6,3,16,3h68c9.4,0,17,7.7,17,17.1v42.7c0,9.4-7.6,17.1-17,17.1H67L50,97z"/>
      <polygon class="st0" points="7.5,11.5 93.8,11.5 93.8,71.9 64.4,74.8 50.7,89.1 33.8,73.8 7.5,72.6 3,66.3 3,16.2 		"/>
    </g>
  </g>
  </svg>

`;
const aml = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
  <style type="text/css">
    .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#3F4852;}
  </style>
  <path class="st0" d="M61,73.9c1.6-1.6,3.8-2.5,6-2.5h17c4.7,0,8.5-3.8,8.5-8.5V20.1c0-4.7-3.8-8.5-8.5-8.5H16
    c-4.7,0-8.5,3.8-8.5,8.5v42.7c0,4.7,3.8,8.5,8.5,8.5h17c2.3,0,4.4,0.9,6,2.5l11,11L61,73.9z M50,97L33,79.9H16
    c-9.4,0-17-7.7-17-17.1V20.1C-1,10.7,6.6,3,16,3h68c9.4,0,17,7.7,17,17.1v42.7c0,9.4-7.6,17.1-17,17.1H67L50,97z"/>
  </svg>

`;

export default ({width, height, color, active}) => (
  <SvgCss
    xml={active ? xml : aml}
    width={width}
    height={height}
    color={color}
  />
);
