import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="21.104" height="20.102" viewBox="0 0 21.104 20.102">
    <g id="like_1_" data-name="like (1)" transform="translate(0 -0.001)">
      <path id="Path_1534" data-name="Path 1534" d="M127.12,22.984a2.089,2.089,0,0,1,.172,2.243,2.105,2.105,0,0,1-.622.711,2.092,2.092,0,0,1-.449,2.954,2.094,2.094,0,0,1-1.676,3.35h-6.6a9,9,0,0,1-3.17-.575l-3.3-1.237V21.711h.177c2.481-2.621,5.175-5.6,5.583-6.251V13.029a.89.89,0,0,1,.889-.889,3.67,3.67,0,0,1,3.666,3.665v1.1l-.663,2.29h4.763a2.094,2.094,0,0,1,1.226,3.792Z" transform="translate(-106.885 -12.139)" fill="#ffb97d"/>
      <path id="Path_1535" data-name="Path 1535" d="M126.221,333.315a2.094,2.094,0,0,1-1.676,3.35h-6.6a9,9,0,0,1-3.17-.575l-3.3-1.237v-5.2h15.812a2.105,2.105,0,0,1-.622.711,2.092,2.092,0,0,1-.449,2.954Z" transform="translate(-106.885 -316.563)" fill="#ffb97d"/>
      <rect id="Rectangle_1351" data-name="Rectangle 1351" width="5.832" height="13.054" transform="translate(0 6.645)" fill="#5cc4e3"/>
      <rect id="Rectangle_1352" data-name="Rectangle 1352" width="5.832" height="6.612" transform="translate(0 13.087)" fill="#5cc4e3"/>
    </g>
  </svg>
`;

export default ({width, height}) => (
  <SvgCss xml={xml} width={width} height={height} />
);
