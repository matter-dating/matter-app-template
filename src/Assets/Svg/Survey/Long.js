import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="31.792" height="29" viewBox="0 0 31.792 29">
    <g id="Group_813" data-name="Group 813" transform="translate(-81 -461)">
      <text id="z" transform="translate(103.792 472)" fill="#fff" font-size="10" font-family="Poppins-Regular, Poppins"><tspan x="0" y="0">z</tspan></text>
      <text id="z-2" data-name="z" transform="translate(108.792 469)" fill="#fff" font-size="7" font-family="Poppins-Regular, Poppins"><tspan x="0" y="0">z</tspan></text>
      <path id="noun_expressionless_596931" d="M12,1A12,12,0,1,0,24,13,12,12,0,0,0,12,1Zm0,23A11,11,0,1,1,23,13,11,11,0,0,1,12,24ZM9.5,9.5h-4a.5.5,0,0,1,0-1h4a.5.5,0,0,1,0,1Zm10-.5a.5.5,0,0,1-.5.5H15a.5.5,0,0,1,0-1h4A.5.5,0,0,1,19.5,9ZM16,19a.5.5,0,0,1-.5.5h-6a.5.5,0,0,1,0-1h6A.5.5,0,0,1,16,19Z" transform="translate(81 465)" fill="#fff"/>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
