import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18.909" height="15.758" viewBox="0 0 18.909 15.758">
    <g id="forward-button" transform="translate(0 -1.575)">
      <path id="Path_1512" data-name="Path 1512" d="M10.193,8.311l-8.306-6.6a1.312,1.312,0,0,0-1.268.052A1.272,1.272,0,0,0,0,2.856v13.2a1.273,1.273,0,0,0,.619,1.089,1.318,1.318,0,0,0,1.269.052l8.306-6.6c.4-.376.716-.658.716-1.143S10.641,8.707,10.193,8.311Z" fill="currentColor"/>
      <path id="Path_1513" data-name="Path 1513" d="M18.193,8.311l-8.306-6.6a1.314,1.314,0,0,0-1.269.052A1.272,1.272,0,0,0,8,2.856v13.2a1.273,1.273,0,0,0,.619,1.089,1.318,1.318,0,0,0,1.269.052l8.306-6.6c.4-.376.716-.658.716-1.143S18.641,8.707,18.193,8.311Z" fill="currentColor"/>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
