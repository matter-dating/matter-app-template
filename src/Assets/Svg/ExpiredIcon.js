import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="38.935" height="39.685" viewBox="0 0 38.935 39.685">
  <g id="session_out" transform="translate(-3.405 -0.002)">
    <path id="Path_1869" data-name="Path 1869" d="M57.4,86.24a.751.751,0,0,0,1.027-.27A13.279,13.279,0,0,1,59.832,84a.751.751,0,1,0-1.136-.981,14.739,14.739,0,0,0-1.57,2.2A.751.751,0,0,0,57.4,86.24Zm7.14,12.654a.749.749,0,0,0,.531-.22l5.543-5.544a.75.75,0,0,0,.22-.53V84.68a.751.751,0,0,0-1.5,0v7.609L64,97.613a.751.751,0,0,0,.531,1.282Z" transform="translate(-47.707 -73.632)" fill="currentColor"/>
    <path id="Path_1870" data-name="Path 1870" d="M39.62,26.851a18.787,18.787,0,0,0,1.718-7.883A18.967,18.967,0,1,0,29.258,36.64,7.2,7.2,0,1,0,39.62,26.851ZM22.371,36.433A17.465,17.465,0,1,1,39.836,18.968a17.3,17.3,0,0,1-1.5,7.068,7.15,7.15,0,0,0-2.751-.739A14.66,14.66,0,0,0,14.779,6.417.751.751,0,0,0,15.558,7.7,13.171,13.171,0,0,1,33.953,25.24a.729.729,0,0,0-.045.146,7.218,7.218,0,0,0-5.79,5.469.749.749,0,0,0-.168.041A13.168,13.168,0,0,1,9.294,17.438.751.751,0,1,0,7.8,17.263,14.668,14.668,0,0,0,20.666,33.536a14.765,14.765,0,0,0,1.715.1,14.614,14.614,0,0,0,5.548-1.094,7.15,7.15,0,0,0,.576,2.765A17.374,17.374,0,0,1,22.371,36.433Zm12.762,1.753a5.706,5.706,0,1,1,5.705-5.706A5.712,5.712,0,0,1,35.133,38.186Z" fill="currentColor"/>
    <path id="Path_1871" data-name="Path 1871" d="M285.161,253.766a.751.751,0,0,0-.751.751v4.5a.751.751,0,0,0,1.5,0v-4.5A.75.75,0,0,0,285.161,253.766Z" transform="translate(-250.028 -225.79)" fill="currentColor"/>
    <path id="Path_1872" data-name="Path 1872" d="M285.909,315.8a.751.751,0,1,1-.75-.751A.75.75,0,0,1,285.909,315.8Z" transform="translate(-250.026 -280.319)"/>
  </g>
</svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
