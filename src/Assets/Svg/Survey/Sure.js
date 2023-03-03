import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path id="noun_smirk_594449" d="M13,1A12,12,0,1,0,25,13,12,12,0,0,0,13,1Zm0,23A11,11,0,1,1,24,13,11,11,0,0,1,13,24Zm4.215-8.08a.5.5,0,0,1-.3.645l-7.5,2.81a.5.5,0,0,1-.35-.935l7.5-2.81A.5.5,0,0,1,17.215,15.92ZM9.5,11.5A1.5,1.5,0,1,1,11,10,1.5,1.5,0,0,1,9.5,11.5ZM18,10a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,18,10Z" transform="translate(-1 -1)" fill="#fff"/>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
