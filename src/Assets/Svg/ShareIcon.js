import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="15.574" height="15.584" viewBox="0 0 15.574 15.584">
    <g id="share_1_" data-name="share (1)" transform="translate(-0.176 0)">
      <path id="Path_1879" data-name="Path 1879" d="M8.425,3.7A8.712,8.712,0,0,0,.176,12.358v3.226L1.33,12.9A8.406,8.406,0,0,1,8.425,8.261v3.693L15.75,5.966,8.425,0Z" fill="#fff"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
