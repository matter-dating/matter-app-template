import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16.047" height="19" viewBox="0 0 16.047 19">
    <g id="グループ_423" data-name="グループ 423" transform="translate(-177.477 -738)">
      <g id="noun_Microphone_856587" transform="translate(92.885 738)">
        <path id="パス_375" data-name="パス 375" d="M192.2,33.13a2.462,2.462,0,0,0-2.459,2.459V41a2.459,2.459,0,1,0,4.918,0v-5.41A2.462,2.462,0,0,0,192.2,33.13Z" transform="translate(-100.232 -31.901)" fill="none"/>
        <path id="パス_376" data-name="パス 376" d="M160.3,0a3.688,3.688,0,0,0-3.688,3.688V9.1a3.688,3.688,0,0,0,7.377,0V3.688A3.688,3.688,0,0,0,160.3,0Zm2.459,9.1a2.459,2.459,0,0,1-4.918,0V3.688a2.459,2.459,0,0,1,4.918,0Z" transform="translate(-68.332 0)" fill="currentColor"/>
        <path id="パス_377" data-name="パス 377" d="M91.352,230.4v2.555H88.893a.615.615,0,0,0,0,1.229h6.148a.615.615,0,0,0,0-1.229H92.582V230.4a6.33,6.33,0,0,0,5.707-6.292.615.615,0,1,0-1.229,0,5.092,5.092,0,0,1-10.184,0,.615.615,0,1,0-1.229,0A6.33,6.33,0,0,0,91.352,230.4Z" transform="translate(0 -215.19)" fill="currentColor"/>
      </g>
      <line id="線_143" data-name="線 143" x2="14" y2="8" transform="translate(178.5 741.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
