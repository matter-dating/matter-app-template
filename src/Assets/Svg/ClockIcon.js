import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="17.613" height="17.613" viewBox="0 0 17.613 17.613">
    <g id="noun_clock_3743037" transform="translate(0 0)">
      <g id="Group_436" data-name="Group 436" transform="translate(0 0)">
        <path id="Path_465" data-name="Path 465" d="M8.807,0A8.807,8.807,0,1,1,0,8.806,8.806,8.806,0,0,1,8.807,0Zm0,1.143A7.663,7.663,0,1,0,16.47,8.806,7.663,7.663,0,0,0,8.807,1.143Z" transform="translate(0 0)" fill="currentColor"/>
        <path id="Path_466" data-name="Path 466" d="M115.038,57.468a.508.508,0,1,1,1.017,0v5.854l-3.236,3.242a.507.507,0,1,1-.719-.715l2.938-2.944Z" transform="translate(-106.74 -54.308)" fill="currentColor"/>
      </g>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
