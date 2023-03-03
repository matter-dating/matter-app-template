import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 31 45.97"><defs><style>.cls-1{fill:currentColor;}</style></defs><path class="cls-1" d="M12.49,0a5,5,0,0,0-5,5V41a5,5,0,0,0,10,0V5A5,5,0,0,0,12.49,0Z" transform="translate(-7.49)"/><path class="cls-1" d="M33.49,0a5,5,0,0,0-5,5V41a5,5,0,1,0,10,0V5A5,5,0,0,0,33.49,0Z" transform="translate(-7.49)"/></svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
