import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="17.598" height="18.04" viewBox="0 0 17.598 18.04">
    <g id="send-message" transform="translate(-4.961 0)">
      <path id="Path_1446" data-name="Path 1446" d="M4.986,17.216c-.148.681.375.97.86.752l16.4-8.41h0a.624.624,0,0,0,0-1.077h0L5.846.071c-.485-.218-1.008.071-.86.752.01.046.98,4.365,1.507,6.714L15.055,9.02,6.493,10.5C5.966,12.851,5,17.17,4.986,17.216Z" transform="translate(0 0)" fill="currentColor"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
