import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="21.995" height="23.687" viewBox="0 0 21.995 23.687">
    <g id="noun_Reverse_1584162" transform="translate(-2 -1)">
      <path id="パス_420" data-name="パス 420" d="M3.71,11.363c0-3.357,2.381-6.371,6-7.588A10.431,10.431,0,0,1,20.047,5.867L16.261,6.96a.724.724,0,0,0-.542.937.891.891,0,0,0,1.082.469l5.129-1.48a.757.757,0,0,0,.585-.7V1.74a.864.864,0,0,0-1.71,0v2.7A12.4,12.4,0,0,0,8.754,2.5C4.652,4.014,1.991,7.5,2,11.363a.8.8,0,0,0,.855.74.8.8,0,0,0,.855-.74Z" fill="currentColor"/>
      <path id="パス_421" data-name="パス 421" d="M23.659,14a.8.8,0,0,0-.855.74c0,3.357-2.381,6.371-6,7.588A10.431,10.431,0,0,1,6.467,20.236l3.787-1.093a.724.724,0,0,0,.542-.937.891.891,0,0,0-1.082-.469l-5.129,1.48a.757.757,0,0,0-.585.7v4.441a.8.8,0,0,0,.855.74.8.8,0,0,0,.855-.74v-2.7A12.4,12.4,0,0,0,17.761,23.6c4.1-1.509,6.762-5,6.754-8.858A.8.8,0,0,0,23.659,14Z" transform="translate(-0.52 -0.417)" fill="currentColor"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
