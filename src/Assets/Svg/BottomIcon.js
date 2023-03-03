import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12.081" height="6.782" viewBox="0 0 12.081 6.782">
  <defs>
    <clipPath id="clip-path">
      <rect width="12.081" height="6.782" fill="none"/>
    </clipPath>
  </defs>
  <g id="Repeat_Grid_1" data-name="Repeat Grid 1" clip-path="url(#clip-path)">
    <g transform="translate(-181.46 -603.041)">
      <g id="noun_Arrow_2335664" transform="translate(193.541 603.041) rotate(90)" opacity="1">
        <path id="Path_924" data-name="Path 924" d="M6.565,5.5,1.284.217a.764.764,0,0,0-1.067,0,.764.764,0,0,0,0,1.067L4.973,6.04.217,10.8a.764.764,0,0,0,0,1.067.764.764,0,0,0,1.067,0l5.281-5.3A.764.764,0,0,0,6.565,5.5Z" fill="currentColor" fill-rule="evenodd"/>
      </g>
    </g>
  </g>
</svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
