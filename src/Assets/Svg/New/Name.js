import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" viewBox="0 0 15 15">
    <defs>
      <linearGradient id="linear-gradient" x1="0.763" y1="0.109" x2="0.021" y2="0.972" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#7ca9f8"/>
        <stop offset="1" stop-color="#206df5"/>
      </linearGradient>
    </defs>
    <g id="user" transform="translate(-3 -3)">
      <path id="Path_1232" data-name="Path 1232" d="M10.644,10.459a3.83,3.83,0,0,0,2.324.783,4.134,4.134,0,0,0,3.968-4.121A4.051,4.051,0,0,0,12.968,3,4.051,4.051,0,0,0,9,7.121,4.16,4.16,0,0,0,10.644,10.459Z" transform="translate(-2.468)" fill="#7ca9f8"/>
      <path id="Path_1233" data-name="Path 1233" d="M14.054,16.55a5.1,5.1,0,0,1-7.108,0A7.688,7.688,0,0,0,3,23.291a.585.585,0,0,0,.577.589H17.423A.585.585,0,0,0,18,23.291,7.688,7.688,0,0,0,14.054,16.55Z" transform="translate(0 -5.88)" fill="url(#linear-gradient)"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
