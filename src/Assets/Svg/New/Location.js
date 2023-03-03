import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="10.684" height="15.009" viewBox="0 0 10.684 15.009">
    <g id="placeholder" transform="translate(-73.763)">
      <path id="Path_1230" data-name="Path 1230" d="M146.493,0c-1.543,0-3.307,2.4-3.307,5.342,0,3.806,3.1,9.348,3.208,9.582.025.054.061.084.1.084a.254.254,0,0,0,.189-.084c.21-.234,5.153-5.777,5.153-9.582A5.348,5.348,0,0,0,146.493,0Zm0,8.14a2.8,2.8,0,1,1,2.8-2.8A2.8,2.8,0,0,1,146.493,8.14Z" transform="translate(-67.388)" fill="#847cf8"/>
      <path id="Path_1231" data-name="Path 1231" d="M79.064,14.925c-.111-.234-3.243-5.777-3.243-9.582C75.821,2.4,77.6,0,79.164,0a5.378,5.378,0,0,0-5.4,5.342c0,3.806,5,9.348,5.21,9.582a.258.258,0,0,0,.191.084C79.126,15.009,79.089,14.978,79.064,14.925Z" fill="#544bcc"/>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
