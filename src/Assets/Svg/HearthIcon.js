import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="34.714" height="30.715" viewBox="0 0 34.714 30.715">
    <g id="heart" transform="translate(2 2)">
      <path id="Path_39" data-name="Path 39" d="M22.36,35.525A8.614,8.614,0,0,1,30.714,44.3c0,8.86-15.357,17.633-15.357,17.633S0,53.029,0,44.3a8.572,8.572,0,0,1,8.354-8.774h0a8.178,8.178,0,0,1,7,3.957A8.258,8.258,0,0,1,22.36,35.525Z" transform="translate(0 -35.525)" fill="#52b8d6" stroke="#fff" stroke-width="4"/>
    </g>
  </svg>

`;
const aml = `
  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="22.125" height="19.559" viewBox="0 0 22.125 19.559">
    <g id="heart" transform="translate(1 1)" opacity="1">
      <path id="パス_39" data-name="パス 39" d="M14.651,35.525a5.662,5.662,0,0,1,5.474,5.782c0,5.839-10.063,11.621-10.063,11.621S0,47.061,0,41.307a5.634,5.634,0,0,1,5.474-5.782h0a5.352,5.352,0,0,1,4.589,2.608A5.4,5.4,0,0,1,14.651,35.525Z" transform="translate(0 -35.525)" fill="none" stroke="currentColor" stroke-width="2"/>
    </g>
</svg>
`;

export default ({width, height, color, active}) => (
  <SvgCss
    xml={active ? xml : aml}
    width={width}
    height={height}
    color={color}
  />
);
