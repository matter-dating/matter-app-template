import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="14.758" height="14.081" viewBox="0 0 14.758 14.081">
    <g id="グループ_14" data-name="グループ 14" transform="translate(0)">
      <path id="パス_40" data-name="パス 40" d="M33.067,46.028l4.74.59a.346.346,0,0,1,.2.59l-3.486,3.264.885,4.7a.337.337,0,0,1-.479.369l-4.2-2.324-4.186,2.324a.349.349,0,0,1-.5-.369l.9-4.7-3.486-3.264a.346.346,0,0,1,.184-.59l4.74-.59,2.047-4.334a.336.336,0,0,1,.609,0Z" transform="translate(-23.354 -41.5)" fill="currentColor" fill-rule="evenodd"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
