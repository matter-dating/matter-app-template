import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:currentColor;}
  </style>
  <g>
    <path class="st0" d="M47,95.8c0.9,0.8,2,1.2,3,1.2s2.2-0.4,3-1.2c1.4-1.3,33.5-32.5,33.5-56C86.5,19.4,70.2,3,50,3
      S13.5,19.4,13.5,39.7C13.5,63.4,45.6,94.5,47,95.8z M50,11.8c15.3,0,27.7,12.5,27.7,27.9c0,14.8-17.9,36.5-27.7,46.7
      c-9.8-10.2-27.7-31.9-27.7-46.7C22.3,24.3,34.7,11.8,50,11.8z"/>
    <path class="st0" d="M70.5,39.7c0-11.4-9.1-20.6-20.5-20.6s-20.5,9.2-20.5,20.6S38.7,60.3,50,60.3S70.5,51.1,70.5,39.7z M38.3,39.7
      c0-6.5,5.3-11.8,11.7-11.8s11.7,5.3,11.7,11.8S56.5,51.5,50,51.5S38.3,46.2,38.3,39.7z"/>
  </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
