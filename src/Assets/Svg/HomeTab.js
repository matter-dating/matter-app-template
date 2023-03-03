import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:#5CC4E3;}
    .st1{fill:#FFFFFF;}
  </style>
  <g>
    <circle class="st0" cx="50" cy="50" r="44.9"/>
    <g>
      <path class="st0" d="M50,97c25.9,0,47-21.1,47-47S75.9,3,50,3S3,24.1,3,50S24.1,97,50,97z M50,11.8c21.1,0,38.2,17.1,38.2,38.2
        S71.1,88.2,50,88.2S11.8,71.1,11.8,50S28.9,11.8,50,11.8z"/>
      <path class="st1" d="M36.2,67.9l22.3-7.4c0.9-0.3,1.7-1.1,2-2l7.4-22.3c0.8-2.5-1.6-4.9-4-4l-22.3,7.4c-0.9,0.3-1.7,1.1-2,2
        l-7.4,22.3C31.3,66.3,33.7,68.7,36.2,67.9z M45.1,45.1l14.7-4.9l-4.9,14.7l-14.7,4.9L45.1,45.1z"/>
      <polygon class="st1" points="58,56.9 34.9,64.7 42.3,41.6 64,35.1 		"/>
    </g>
  </g>
  </svg>

`;
const aml = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:#3F4852;}
  </style>
  <g>
    <path class="st0" d="M50,97c25.9,0,47-21.1,47-47S75.9,3,50,3S3,24.1,3,50S24.1,97,50,97z M50,11.8c21.1,0,38.2,17.1,38.2,38.2
      S71.1,88.2,50,88.2S11.8,71.1,11.8,50S28.9,11.8,50,11.8z"/>
    <path class="st0" d="M36.2,67.9l22.3-7.4c0.9-0.3,1.7-1.1,2-2l7.4-22.3c0.8-2.5-1.6-4.9-4-4l-22.3,7.4c-0.9,0.3-1.7,1.1-2,2
      l-7.4,22.3C31.3,66.3,33.7,68.7,36.2,67.9z M45.1,45.1l14.7-4.9l-4.9,14.7l-14.7,4.9L45.1,45.1z"/>
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
