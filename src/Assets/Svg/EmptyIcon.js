import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="70.637" height="70.637" viewBox="0 0 70.637 70.637">
    <g id="bankrupt" transform="translate(-7 -7)">
      <path id="rect816" d="M17.6,7a10.6,10.6,0,1,0,0,21.191H73.4V73.4H17.6a6.3,6.3,0,0,1-6.357-6.357V30.31A2.119,2.119,0,1,0,7,30.31V67.041a10.619,10.619,0,0,0,10.6,10.6H75.518a2.119,2.119,0,0,0,2.119-2.119V26.072a2.119,2.119,0,0,0-2.119-2.119H17.6a6.357,6.357,0,1,1,0-12.715H64.922v7.77a2.119,2.119,0,1,0,4.238,0V9.119A2.119,2.119,0,0,0,67.041,7Z" transform="translate(0 0)" fill="currentColor"/>
      <path id="path923" d="M35.677,42a19.717,19.717,0,0,0-11.652,3.8,2.119,2.119,0,1,0,2.5,3.421,15.553,15.553,0,0,1,18.31,0,2.119,2.119,0,1,0,2.5-3.421A19.717,19.717,0,0,0,35.677,42Z" transform="translate(6.642 14.446)" fill="currentColor"/>
      <path id="path1192" d="M37.314,31.361a2.119,2.119,0,0,0,.045,2.995l1,1-1,1a2.119,2.119,0,1,0,3,3l1-1,1,1a2.119,2.119,0,1,0,3-3l-1-1,1-1a2.119,2.119,0,1,0-3-3l-1,1-1-1a2.119,2.119,0,0,0-3.042,0Z" transform="translate(12.265 9.789)" fill="currentColor"/>
      <path id="path1209" d="M21.314,31.361a2.119,2.119,0,0,0,.045,2.995l1,1-1,1a2.119,2.119,0,1,0,3,3l1-1,1,1a2.119,2.119,0,1,0,3-3l-1-1,1-1a2.119,2.119,0,1,0-3-3l-1,1-1-1a2.119,2.119,0,0,0-3.042,0Z" transform="translate(5.662 9.789)" fill="currentColor"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
