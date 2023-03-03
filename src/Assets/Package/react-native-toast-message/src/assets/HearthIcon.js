import * as React from 'react';
import { SvgCss } from 'react-native-svg';

const xml = `
<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="27.097" height="23.133" viewBox="0 0 27.097 23.133">
  <path d="M19.726,35.525a7.57,7.57,0,0,1,7.37,7.686c0,7.761-13.548,15.447-13.548,15.447S0,50.859,0,43.211a7.533,7.533,0,0,1,7.37-7.686h0a7.225,7.225,0,0,1,6.178,3.466A7.3,7.3,0,0,1,19.726,35.525Z" transform="translate(0 -35.525)" fill="currentColor"/>
</svg>

`;

export default ({ width, height, color }) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
