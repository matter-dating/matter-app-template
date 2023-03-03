import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg id="more" xmlns="http://www.w3.org/2000/svg" width="22.121" height="4.424" viewBox="0 0 22.121 4.424">
  <g id="グループ_230" data-name="グループ 230" transform="translate(0 0)">
    <g id="グループ_229" data-name="グループ 229" transform="translate(0)">
      <circle id="楕円形_100" data-name="楕円形 100" cx="2.212" cy="2.212" r="2.212" fill="currentColor"/>
    </g>
  </g>
  <g id="グループ_232" data-name="グループ 232" transform="translate(8.848 0)">
    <g id="グループ_231" data-name="グループ 231">
      <circle id="楕円形_101" data-name="楕円形 101" cx="2.212" cy="2.212" r="2.212" fill="currentColor"/>
    </g>
  </g>
  <g id="グループ_234" data-name="グループ 234" transform="translate(17.697 0)">
    <g id="グループ_233" data-name="グループ 233">
      <circle id="楕円形_102" data-name="楕円形 102" cx="2.212" cy="2.212" r="2.212" fill="currentColor"/>
    </g>
  </g>
</svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
