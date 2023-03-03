import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18.325" height="17.48" viewBox="0 0 18.325 17.48">
    <g id="グループ_523" data-name="グループ 523" transform="translate(-179.337 -139.26)">
      <g id="noun_Music_1752481" transform="translate(164.362 136.315)">
        <g id="グループ_480" data-name="グループ 480" transform="translate(18.21 5)">
          <path id="パス_485" data-name="パス 485" d="M29.066,14.58c-.038,1.313-.841,3.058-2.3,3.058-3.635,0-1.783-4.176,1.182-4.468V6.584L22.466,8.546l.055,8.765c-.038,1.313-.841,3.058-2.3,3.058-3.635,0-1.783-4.176,1.182-4.468V7.731L29.006,5l.06,9.581Z" transform="translate(-18.21 -5)" fill="currentColor" fill-rule="evenodd"/>
        </g>
      </g>
      <line id="線_198" data-name="線 198" x1="16" y1="15" transform="translate(180.5 140.5)" fill="none" stroke="#e35c5c" stroke-width="3.4"/>
      <line id="線_199" data-name="線 199" x1="11" y1="10" transform="translate(183.5 143.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.2"/>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
