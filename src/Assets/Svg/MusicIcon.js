import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="10.856" height="15.37" viewBox="0 0 10.856 15.37">
    <g id="noun_Music_1752481" transform="translate(-18.21 -5)" opacity="0.72">
      <g id="グループ_480" data-name="グループ 480" transform="translate(18.21 5)">
        <path id="パス_485" data-name="パス 485" d="M29.066,14.58c-.038,1.313-.841,3.058-2.3,3.058-3.635,0-1.783-4.176,1.182-4.468V6.584L22.466,8.546l.055,8.765c-.038,1.313-.841,3.058-2.3,3.058-3.635,0-1.783-4.176,1.182-4.468V7.731L29.006,5l.06,9.581Z" transform="translate(-18.21 -5)" fill="currentColor" fill-rule="evenodd"/>
      </g>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
