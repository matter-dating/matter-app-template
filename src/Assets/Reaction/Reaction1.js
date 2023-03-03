import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22.633" height="19.556" viewBox="0 0 22.633 19.556">
    <g id="heart-simple-shape-silhouette" transform="translate(0 -0.001)">
      <path id="Path_1514" data-name="Path 1514" d="M16.375,29.761a6.259,6.259,0,0,1,6.258,6.258c0,5.712-11.317,13.3-11.317,13.3S0,42,0,36.019c0-4.3,2.8-6.258,6.258-6.258a6.246,6.246,0,0,1,5.058,2.584A6.246,6.246,0,0,1,16.375,29.761Z" transform="translate(0 -29.76)" fill="#e35c9a"/>
    </g>
  </svg>
`;

export default ({width, height}) => (
  <SvgCss xml={xml} width={width} height={height} />
);
