import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="3" height="17" viewBox="0 0 3 17">
    <g id="Group_880" data-name="Group 880" transform="translate(-354 -51)">
      <circle id="Ellipse_425" data-name="Ellipse 425" cx="1.5" cy="1.5" r="1.5" transform="translate(354 65)" fill="currentColor"/>
      <circle id="Ellipse_426" data-name="Ellipse 426" cx="1.5" cy="1.5" r="1.5" transform="translate(354 58)" fill="currentColor"/>
      <circle id="Ellipse_427" data-name="Ellipse 427" cx="1.5" cy="1.5" r="1.5" transform="translate(354 51)" fill="currentColor"/>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
