import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="15.098" height="18.039" viewBox="0 0 15.098 18.039">
    <g id="グループ_558" data-name="グループ 558" transform="translate(-331.35 -137.301)">
      <rect id="長方形_807" data-name="長方形 807" width="11.474" height="14.603" rx="2" transform="translate(334.974 140.737)" fill="currentColor"/>
      <rect id="長方形_808" data-name="長方形 808" width="11.824" height="15.462" rx="2" transform="translate(331.35 137.301)" fill="#fff"/>
      <rect id="長方形_805" data-name="長方形 805" width="10.756" height="14.341" rx="2" transform="translate(331.35 137.301)" fill="currentColor"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
