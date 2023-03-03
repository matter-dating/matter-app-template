import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16.318" height="11.942" viewBox="0 0 16.318 11.942">
    <g id="noun_Check_3815042" transform="translate(-2.5 -5.624)">
      <g id="Layer_5" data-name="Layer 5" transform="translate(2.5 5.624)">
        <path id="パス_373" data-name="パス 373" d="M18.818,6.566a.937.937,0,0,1-.276.666L8.68,17.095a1.589,1.589,0,0,1-1.132.471q-.074,0-.149-.007a1.6,1.6,0,0,1-1.176-.687L2.672,12a.943.943,0,0,1,.77-1.485.97.97,0,0,1,.782.414l3.152,4.293a.315.315,0,0,0,.229.127h0a.331.331,0,0,0,.243-.091L17.21,5.9a.942.942,0,0,1,1.609.666Z" transform="translate(-2.5 -5.624)" fill="currentColor"/>
      </g>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
