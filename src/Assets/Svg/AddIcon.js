import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
    <style type="text/css">
      .st0{fill:currentColor}
    </style>
  <g>
    <path class="st0" d="M92,50c0,2.6-2.1,4.7-4.7,4.7H54.7v32.7c0,2.6-2.1,4.7-4.7,4.7s-4.7-2.1-4.7-4.7V54.7H12.7
      C10.1,54.7,8,52.6,8,50s2.1-4.7,4.7-4.7h32.7V12.7c0-2.6,2.1-4.7,4.7-4.7s4.7,2.1,4.7,4.7v32.7h32.7C89.9,45.3,92,47.4,92,50z"/>
  </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
