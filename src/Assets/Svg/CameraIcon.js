import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20.771" fill="currentColor" height="14.173" viewBox="0 0 20.771 14.173">
    <g id="noun_Video_865819" transform="translate(-9 -22)">
      <path id="パス_431" data-name="パス 431" d="M23.552,36.173H11.065A2.067,2.067,0,0,1,9,34.109V24.065A2.067,2.067,0,0,1,11.065,22H23.552a2.067,2.067,0,0,1,2.065,2.065V34.109A2.067,2.067,0,0,1,23.552,36.173ZM11.065,23.466a.6.6,0,0,0-.6.6V34.109a.6.6,0,0,0,.6.6H23.552a.6.6,0,0,0,.6-.6V24.065a.6.6,0,0,0-.6-.6Z"/>
      <path id="パス_432" data-name="パス 432" d="M76.639,37.442a.733.733,0,0,1-.535-.23l-3.91-4.154a.733.733,0,1,1,1.068-1l2.644,2.808V26.5l-2.659,2.659a.733.733,0,0,1-1.036-1.036l3.91-3.91a.733.733,0,0,1,1.251.518V36.709A.733.733,0,0,1,76.639,37.442Z" transform="translate(-47.601 -1.513)"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
