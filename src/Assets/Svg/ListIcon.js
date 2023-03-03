import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12">
    <g id="グループ_559" data-name="グループ 559" transform="translate(-331 -140)">
      <g id="noun_List_1383940" transform="translate(324 135)">
        <line id="線_192" data-name="線 192" x2="13" transform="translate(8 6)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        <line id="線_193" data-name="線 193" x2="13" transform="translate(8 11)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        <line id="線_194" data-name="線 194" x2="13" transform="translate(8 16)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </g>
    </g>
  </svg>

    
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
