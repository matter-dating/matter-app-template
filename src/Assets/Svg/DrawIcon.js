import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg id="draw" xmlns="http://www.w3.org/2000/svg" width="12.221" height="12.161" viewBox="0 0 12.221 12.161">
    <path id="Path_37" data-name="Path 37" d="M7.6,3.318,10.086,5.8,3.793,12.1,1.309,9.611Zm4.372-.6L10.864,1.61a1.1,1.1,0,0,0-1.554,0L8.248,2.672l2.486,2.486,1.239-1.239A.848.848,0,0,0,11.972,2.719ZM.008,13.105a.283.283,0,0,0,.342.337l2.77-.672L.635,10.284Z" transform="translate(-0.001 -1.289)" fill="currentColor"/>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
