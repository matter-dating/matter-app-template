import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22.516" height="22.516" viewBox="0 0 22.516 22.516">
    <g id="images" transform="translate(-2 -2)" opacity="1">
      <path id="Path_1501" data-name="Path 1501" d="M21.343,2H5.159A3.18,3.18,0,0,0,2,5.173V21.357a3.18,3.18,0,0,0,3.173,3.159H21.357a3.18,3.18,0,0,0,3.159-3.173V5.159A3.18,3.18,0,0,0,21.343,2ZM3.5,5.173A1.675,1.675,0,0,1,5.173,3.5H21.357a1.675,1.675,0,0,1,1.675,1.675v11.4L19,13.434a3.961,3.961,0,0,0-4.925.049L3.618,21.941a1.661,1.661,0,0,1-.12-.605ZM21.343,23.017H5.159a1.654,1.654,0,0,1-.422-.063l10.231-8.289a2.47,2.47,0,0,1,3.089,0l4.925,3.856v2.864a1.675,1.675,0,0,1-1.639,1.632Z" fill="currentColor"/>
      <path id="Path_1502" data-name="Path 1502" d="M9.77,15.247a3.173,3.173,0,1,0-3.18-3.18,3.173,3.173,0,0,0,3.18,3.18Zm0-4.848a.693.693,0,1,1,0-.021Z" transform="translate(-1.36 -2.045)" fill="currentColor"/>
    </g>
  </svg>


`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
