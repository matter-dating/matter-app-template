import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24.312" height="14.57" viewBox="0 0 24.312 14.57">
    <g id="グループ_424" data-name="グループ 424" transform="translate(-285.539 -112.112)">
      <g id="noun_Video_3136011" transform="translate(290.365 114.472)" opacity="0.8">
        <path id="パス_422" data-name="パス 422" d="M14.94,19.989l-3.229,1.856v-.6A1.927,1.927,0,0,0,9.785,19.32H1.927A1.927,1.927,0,0,0,0,21.247v6a1.927,1.927,0,0,0,1.927,1.927H9.785a1.927,1.927,0,0,0,1.927-1.927v-.6L14.94,28.5c.612.352,1.114.063,1.114-.642V20.635C16.055,19.927,15.554,19.638,14.94,19.989Z" transform="translate(0 -19.32)" fill="currentColor"/>
      </g>
      <line id="線_143" data-name="線 143" x2="22.27" y2="12.527" transform="translate(286.561 113.134)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
