import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="21.143" height="18.016" viewBox="0 0 21.143 18.016">
  <g id="heart" transform="translate(1 1)">
    <path id="Path_39" data-name="Path 39" d="M13.936,35.525A5.266,5.266,0,0,1,19.143,40.8c0,5.325-9.572,10.6-9.572,10.6S0,46.046,0,40.8a5.24,5.24,0,0,1,5.207-5.273h0A5.139,5.139,0,0,1,9.572,37.9,5.19,5.19,0,0,1,13.936,35.525Z" transform="translate(0 -35.525)" fill="#f06bb3" stroke="#fefefe" stroke-width="2"/>
  </g>
</svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
