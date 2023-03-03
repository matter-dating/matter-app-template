import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16.476" height="13.162" viewBox="0 0 16.476 13.162">
    <g id="グループ_609" data-name="グループ 609" transform="translate(-292.726 -53.419)">
      <g id="heart" transform="translate(292.726 56.121)">
        <path id="パス_39" data-name="パス 39" d="M6.616,35.525A2.539,2.539,0,0,1,9.087,38.1c0,2.6-4.544,5.18-4.544,5.18S0,40.667,0,38.1a2.526,2.526,0,0,1,2.472-2.578h0a2.423,2.423,0,0,1,2.072,1.162A2.447,2.447,0,0,1,6.616,35.525Z" transform="translate(0 -35.525)" fill="currentColor"/>
      </g>
      <g id="noun_Audio_3397396" transform="translate(303.149 53.419)">
        <g id="グループ_496" data-name="グループ 496" transform="translate(0 0)">
          <path id="パス_494" data-name="パス 494" d="M584.833,147.113a.681.681,0,0,1,.871-1.048,8.174,8.174,0,0,1,0,12.831.681.681,0,0,1-.871-1.048,6.822,6.822,0,0,0,0-10.736Zm-.955,9.707a.682.682,0,0,1-.861-1.058,4.072,4.072,0,0,0,0-6.563.682.682,0,0,1,.861-1.058,5.426,5.426,0,0,1,0,8.679Z" transform="translate(-582.76 -145.899)" fill="currentColor" fill-rule="evenodd"/>
        </g>
      </g>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
