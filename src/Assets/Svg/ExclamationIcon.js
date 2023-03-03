import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:currentColor}
  </style>
  <g>
    <path class="st0" d="M50,67.6c2.4,0,4.4-2,4.4-4.4V25c0-2.4-2-4.4-4.4-4.4s-4.4,2-4.4,4.4v38.2C45.6,65.7,47.6,67.6,50,67.6z"/>
    <path class="st0" d="M53.1,79.6c1.7-1.7,1.7-4.5,0-6.2c-1.6-1.7-4.6-1.7-6.2,0c-1.7,1.7-1.7,4.5,0,6.2
      C48.6,81.3,51.4,81.3,53.1,79.6z"/>
  </g>
  </svg>

`;

export default ({color}) => <SvgCss xml={xml} color={color} />;
