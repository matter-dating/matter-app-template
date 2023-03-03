import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24.301" height="14.911" viewBox="0 0 24.301 14.911">
    <g id="noun_Video_3136011" transform="translate(0 -19.32)" opacity="0.8">
      <path id="パス_422" data-name="パス 422" d="M22.614,20.333l-4.887,2.809v-.906a2.916,2.916,0,0,0-2.916-2.916H2.916A2.916,2.916,0,0,0,0,22.236v9.079a2.916,2.916,0,0,0,2.916,2.916h11.9a2.916,2.916,0,0,0,2.916-2.916v-.906l4.887,2.809c.926.532,1.686.095,1.686-.972V21.31C24.3,20.239,23.543,19.8,22.614,20.333Z" transform="translate(0)" fill="currentColor"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
