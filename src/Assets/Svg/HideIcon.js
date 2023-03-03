import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="19.493" height="16.887" viewBox="0 0 19.493 16.887">
    <g id="noun_visible_3774843" transform="translate(-325.001 146.997)" opacity="1">
      <path id="パス_176" data-name="パス 176" d="M1.082,11.133a.65.65,0,0,0,0,.63,14.3,14.3,0,0,0,4.059,4.372L2.49,18.786a.65.65,0,0,0,0,.919.661.661,0,0,0,.919,0l2.883-2.883a9.518,9.518,0,0,0,4.455,1.124c6.159,0,9.524-5.93,9.665-6.183a.65.65,0,0,0,.026-.579,11.751,11.751,0,0,0-3.973-4.538L19,4.112a.65.65,0,1,0-.919-.919L15.3,5.976A10.275,10.275,0,0,0,10.747,4.95C4.588,4.95,1.222,10.88,1.082,11.133Zm18.02.283c-.722,1.128-3.671,5.231-8.355,5.231a8.091,8.091,0,0,1-3.476-.8l1.221-1.221a3.892,3.892,0,0,0,5.429-5.429l1.611-1.611A10.379,10.379,0,0,1,19.1,11.416Zm-10.954.032a2.6,2.6,0,0,1,2.6-2.6,2.565,2.565,0,0,1,1.312.368L8.516,12.76A2.565,2.565,0,0,1,8.148,11.448Zm5.2,0a2.6,2.6,0,0,1-2.6,2.6,2.565,2.565,0,0,1-1.312-.368l3.543-3.543a2.565,2.565,0,0,1,.368,1.312Zm-2.6-5.2a9.06,9.06,0,0,1,3.57.71L13,8.274A3.892,3.892,0,0,0,7.573,13.7L6.09,15.186a13.311,13.311,0,0,1-3.678-3.737C3.169,10.275,6.107,6.25,10.747,6.25Z" transform="translate(324 -150)"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);