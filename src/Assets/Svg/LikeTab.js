import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:#5CC4E3;}
  </style>
  <g>
    <polygon class="st0" points="50,18.6 31.2,10.4 10,15.9 0.2,36 12.9,57.2 49.9,92.1 93.1,47.2 98.1,33.1 95.2,21.5 82.4,8.8 
      63.1,8.8 	"/>
    <g>
      <path class="st0" d="M72.4,3c-8.8,0-16.9,3.6-22.5,9.7c-11.7-12.5-31.7-13-44-0.8C-6,23.9-6,43.3,5.9,55.2l40.3,40.4
        c1.9,1.9,5.1,1.9,7,0L94,55.2c5.7-5.7,9-13.5,9-21.6C103,16.7,89.3,3,72.4,3z M87.1,48.1L49.9,85l-37-36.9c-8.1-8-8.1-21,0-29.1
        c9.5-9.4,25.9-7.6,32.7,4.6c1.9,3.5,6.9,3.4,8.8-0.1c3.4-6.5,10.4-10.6,18-10.6c11.4,0,20.6,9.2,20.6,20.6
        C93.1,39.1,90.9,44.3,87.1,48.1z"/>
    </g>
  </g>
  </svg>


`;
const aml = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:#3F4853;}
  </style>
  <g>
    <g>
      <path class="st0" d="M72.4,3c-8.8,0-16.9,3.6-22.5,9.7c-11.7-12.5-31.7-13-44-0.8C-6,23.9-6,43.3,5.9,55.2l40.3,40.4
        c1.9,1.9,5.1,1.9,7,0L94,55.2c5.7-5.7,9-13.5,9-21.6C103,16.7,89.3,3,72.4,3z M87.1,48.1L49.9,85l-37-36.9c-8.1-8-8.1-21,0-29.1
        c9.5-9.4,25.9-7.6,32.7,4.6c1.9,3.5,6.9,3.4,8.8-0.1c3.4-6.5,10.4-10.6,18-10.6c11.4,0,20.6,9.2,20.6,20.6
        C93.1,39.1,90.9,44.3,87.1,48.1z"/>
    </g>
  </g>
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
