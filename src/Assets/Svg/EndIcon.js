import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="84" height="107.907" viewBox="0 0 84 107.907">
    <g id="Group_1320" data-name="Group 1320" transform="translate(-148.5 -248.093)">
      <g id="Layer_67" data-name="Layer 67" transform="translate(139.5 255.348)">
        <path id="Path_1585" data-name="Path 1585" d="M78.522,97.261V4H17.478V97.261H9v3.391H87V97.261ZM32.739,60.8a2.543,2.543,0,1,1,2.543,2.543A2.543,2.543,0,0,1,32.739,60.8Zm-5.087-46.63V97.261H24.261V10.783H71.739V97.261H68.348V14.174Z" transform="translate(0 0)" fill="#fff"/>
      </g>
      <g id="heart" transform="translate(205.286 249.593)">
        <path id="Path_39" data-name="Path 39" d="M18.72,35.525a7.265,7.265,0,0,1,6.994,7.445c0,7.518-12.857,14.962-12.857,14.962S0,50.378,0,42.97a7.23,7.23,0,0,1,6.994-7.445h0a6.827,6.827,0,0,1,5.863,3.357A6.894,6.894,0,0,1,18.72,35.525Z" transform="translate(0 -35.525)" fill="#52b8d6" stroke="#fff" stroke-width="3"/>
      </g>
    </g>
  </svg>
`;
export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
