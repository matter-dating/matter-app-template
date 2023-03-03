import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="54.067" height="104" viewBox="0 0 54.067 104">
    <g id="wine-glass" transform="translate(-0.001)">
      <path id="Path_1122" data-name="Path 1122" d="M118.1,303h5.979v38.665H118.1Zm0,0" transform="translate(-94.054 -240.655)" fill="#cbe3f8"/>
      <path id="Path_1123" data-name="Path 1123" d="M133.1,303h2.99v38.665H133.1Zm0,0" transform="translate(-106.035 -240.655)" fill="#aad2f5"/>
      <path id="Path_1124" data-name="Path 1124" d="M13.1,482h48.85v5.979H13.1Zm0,0" transform="translate(-10.49 -383.979)" fill="#cbe3f8"/>
      <path id="Path_1125" data-name="Path 1125" d="M61.231,17.937,36.567,23.917,11.9,17.937,14.344,0H58.789Zm0,0" transform="translate(-9.53)" fill="#cbe3f8"/>
      <path id="Path_1126" data-name="Path 1126" d="M157.258,17.937,133.1,23.917V0h21.764Zm0,0" transform="translate(-105.556)" fill="#aad2f5"/>
      <path id="Path_1127" data-name="Path 1127" d="M133.1,482h23.917v5.979H133.1Zm0,0" transform="translate(-105.556 -383.979)" fill="#aad2f5"/>
      <path id="Path_1128" data-name="Path 1128" d="M27.037,135.442a27.225,27.225,0,0,1-20.9-9.687A26.094,26.094,0,0,1,.529,103.692C.712,102.616,2.357,90.658,2.418,90H51.656s1.828,13.154,1.888,13.932c3.291,16.024-9.323,31.51-26.507,31.51Zm0,0" transform="translate(0 -71.443)" fill="#ba4fb3"/>
      <path id="Path_1129" data-name="Path 1129" d="M133.1,135.441V90h24.156s1.794,13.154,1.853,13.932a26.473,26.473,0,0,1-26.008,31.51Zm0,0" transform="translate(-105.556 -71.443)" fill="#ab28a2"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
