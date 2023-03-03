import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="34.974" height="38.86" viewBox="0 0 34.974 38.86">
  <path id="play" d="M49.983,17.736,18.9.249A1.943,1.943,0,0,0,16,1.943V36.917a1.944,1.944,0,0,0,2.9,1.694L49.983,21.125a1.944,1.944,0,0,0,0-3.389Z" transform="translate(-16 0)" fill="currentColor" opacity="1"/>
</svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
