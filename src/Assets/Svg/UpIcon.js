import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="23.183" height="13.093" viewBox="0 0 23.183 13.093">
    <g id="noun_chevron_up_1746113" data-name="noun_chevron up_1746113" transform="translate(0)" opacity="0.8">
      <path id="パス_66" data-name="パス 66" d="M13.093,1.5,3,11.591,13.093,21.681l-1.5,1.5L0,11.591,11.591,0Z" transform="translate(23.183 0) rotate(90)" fill="currentColor" fill-rule="evenodd"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
