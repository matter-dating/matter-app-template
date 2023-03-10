import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="33.654" height="33.566" viewBox="0 0 33.654 33.566">
    <g id="noun_call_2442988" transform="translate(33.654 16.322) rotate(132)">
      <path id="パス_423" data-name="パス 423" d="M16.621,24.342A10.524,10.524,0,0,1,12,22.481a25.816,25.816,0,0,1-4.344-3.814,64,64,0,0,1-4.634-5.275A16.185,16.185,0,0,1,.38,8.472,7.761,7.761,0,0,1,.092,4.879,6.341,6.341,0,0,1,2.139,1.3,8.734,8.734,0,0,1,3.531.28,1.793,1.793,0,0,1,5.5.311,7.073,7.073,0,0,1,8.514,3.923,1.307,1.307,0,0,1,8.37,5.245c-.349.471-.712.929-1.063,1.4-.31.417-.632.827-.907,1.266a1.166,1.166,0,0,0,.012,1.366c.7.976,1.368,1.98,2.124,2.91a37.01,37.01,0,0,0,4.527,4.69c.366.315.758.593,1.149.878a1.1,1.1,0,0,0,1.183.107,13.3,13.3,0,0,0,1.219-.683c.546-.349,1.083-.707,1.619-1.051a1.424,1.424,0,0,1,1.488-.029,7.244,7.244,0,0,1,3.219,3.171,1.951,1.951,0,0,1-.176,2.212A6.7,6.7,0,0,1,17.4,24.393a7.62,7.62,0,0,1-.778-.051Z" transform="translate(0 0)" fill="currentColor"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
