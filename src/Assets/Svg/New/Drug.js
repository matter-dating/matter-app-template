import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="127.21" height="103.998" viewBox="0 0 127.21 103.998">
    <g id="drugs" transform="translate(0 -0.1)">
      <path id="Path_1130" data-name="Path 1130" d="M71.383,196.261,46.816,220.828a27.414,27.414,0,0,1-38.77-38.77l24.566-24.566,11.4-.792,22.677,22.677Z" transform="translate(0 -124.779)" fill="#4f76ba"/>
      <path id="Path_1131" data-name="Path 1131" d="M102.936,251.48,78.37,276.046a27.373,27.373,0,0,1-38.77,0L89.647,226l8.6,8.6Z" transform="translate(-31.553 -179.998)" fill="#2b5398"/>
      <path id="Path_1132" data-name="Path 1132" d="M223.835,46.916,199.269,71.482,179.884,52.1,160.5,32.713,185.065,8.147a27.414,27.414,0,0,1,38.77,38.77Z" transform="translate(-127.886)" fill="#cbe3f8"/>
      <path id="Path_1133" data-name="Path 1133" d="M299.85,78.47l-24.566,24.566L255.9,83.651,299.85,39.7A27.373,27.373,0,0,1,299.85,78.47Z" transform="translate(-203.902 -31.553)" fill="#aad2f5"/>
      <path id="Path_1134" data-name="Path 1134" d="M375.376,265.117a23.252,23.252,0,0,1-23.217,23.217L347,283.92V247.274l5.159-5.374A23.252,23.252,0,0,1,375.376,265.117Z" transform="translate(-248.166 -184.236)" fill="#a64ae2"/>
      <path id="Path_1135" data-name="Path 1135" d="M265.217,241.9a23.217,23.217,0,0,0,0,46.435Z" transform="translate(-161.221 -184.236)" fill="#cf8bfc"/>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
