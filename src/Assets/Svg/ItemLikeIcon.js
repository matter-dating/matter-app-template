import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:currentColor;}
  </style>
  <g>
    <path class="st0" d="M69.9,8.2c-7.8,0-15,3.2-20,8.6c-10.4-11.1-28.1-11.6-39-0.7C0.3,26.8,0.3,44,10.9,54.6l35.8,35.9
      c1.7,1.7,4.5,1.7,6.2,0l36.1-35.9c5.1-5.1,8-12,8-19.2C97,20.4,84.9,8.2,69.9,8.2z M82.9,48.3l-33,32.8L17.1,48.3
      c-7.2-7.1-7.2-18.7,0-25.9c8.4-8.4,23-6.8,29,4.1c1.7,3.1,6.1,3,7.8-0.1c3-5.8,9.2-9.4,16-9.4c10.1,0,18.3,8.2,18.3,18.3
      C88.2,40.3,86.3,44.9,82.9,48.3z"/>
  </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
