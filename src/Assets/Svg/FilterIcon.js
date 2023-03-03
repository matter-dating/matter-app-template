import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14.727" height="14.205" viewBox="0 0 14.727 14.205">
    <g id="Layer_47" data-name="Layer 47" transform="translate(-2 -3.062)">
      <path id="Path_1544" data-name="Path 1544" d="M16.236,24.765H14.707a2.192,2.192,0,0,0-4.273,0H2.491a.491.491,0,1,0,0,.982h7.943a2.192,2.192,0,0,0,4.273,0h1.529a.491.491,0,0,0,0-.982Zm-3.667,1.7a1.212,1.212,0,1,1,1.212-1.212,1.212,1.212,0,0,1-1.212,1.212Z" transform="translate(0 -15.091)" fill="currentColor"/>
      <path id="Path_1545" data-name="Path 1545" d="M2.491,5.747h1.33a2.192,2.192,0,0,0,4.273,0h8.141a.491.491,0,0,0,0-.982H8.094a2.192,2.192,0,0,0-4.273,0H2.491a.491.491,0,1,0,0,.982Zm3.468-1.7a1.212,1.212,0,0,1,1.21,1.212h0a1.212,1.212,0,0,1-2.423,0h0A1.212,1.212,0,0,1,5.959,4.043Z" fill="currentColor"/>
      <path id="Path_1546" data-name="Path 1546" d="M16.236,44.765H10.274a2.192,2.192,0,0,0-4.273,0H2.491a.491.491,0,1,0,0,.982H6a2.192,2.192,0,0,0,4.273,0h5.962a.491.491,0,1,0,0-.982Zm-8.1,1.7a1.212,1.212,0,1,1,1.212-1.212A1.212,1.212,0,0,1,8.136,46.468Z" transform="translate(0 -30.182)" fill="currentColor"/>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
