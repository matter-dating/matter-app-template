import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20.06" height="18.669" viewBox="0 0 20.06 18.669">
    <g id="go-back-arrow_1_" data-name="go-back-arrow (1)" transform="translate(0 -1.717)">
      <path id="Path_1559" data-name="Path 1559" d="M3.3,5.4c-.272.356-.463.421-.463.12V4.973A1.418,1.418,0,0,0,0,4.973V9.836a1.418,1.418,0,0,0,1.418,1.418H6.281a1.418,1.418,0,1,0,0-2.837H5.757c-.29,0-.371-.331-.126-.705a6.092,6.092,0,1,1,5.094,9.431,1.621,1.621,0,0,0,0,3.242A9.334,9.334,0,1,0,3.3,5.4Z" fill="currentColor"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
