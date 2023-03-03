import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="91.89" height="91.89" viewBox="0 0 91.89 91.89">
  <g id="noun_Selfie_3549291" transform="translate(-21 -21)">
    <path id="パス_501" data-name="パス 501" d="M88.349,32.09A11.09,11.09,0,0,0,77.259,21H63v9.506H77.259a1.584,1.584,0,0,1,1.584,1.584V46.349h9.506Z" transform="translate(24.541)" fill="currentColor"/>
    <path id="パス_502" data-name="パス 502" d="M78.843,77.259a1.584,1.584,0,0,1-1.584,1.584H63v9.506H77.259a11.09,11.09,0,0,0,11.09-11.09V63H78.843Z" transform="translate(24.541 24.541)" fill="currentColor"/>
    <path id="パス_503" data-name="パス 503" d="M21,77.259a11.09,11.09,0,0,0,11.09,11.09H46.349V78.843H32.09a1.584,1.584,0,0,1-1.584-1.584V63H21Z" transform="translate(0 24.541)" fill="currentColor"/>
    <path id="パス_504" data-name="パス 504" d="M21,32.09V46.349h9.506V32.09a1.584,1.584,0,0,1,1.584-1.584H46.349V21H32.09A11.09,11.09,0,0,0,21,32.09Z" fill="currentColor"/>
    <path id="パス_505" data-name="パス 505" d="M43.759,52A12.548,12.548,0,0,0,42,58.337a12.674,12.674,0,0,0,25.349,0A12.548,12.548,0,0,0,65.59,52Z" transform="translate(12.27 18.113)" fill="currentColor"/>
    <circle id="楕円形_212" data-name="楕円形 212" cx="5.5" cy="5.5" r="5.5" transform="translate(43 50.89)" fill="currentColor"/>
    <circle id="楕円形_213" data-name="楕円形 213" cx="5.5" cy="5.5" r="5.5" transform="translate(80 50.89)" fill="currentColor"/>
  </g>
</svg>


`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
