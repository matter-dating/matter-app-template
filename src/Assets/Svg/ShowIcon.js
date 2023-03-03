import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="14" viewBox="0 0 20 14">
    <g id="noun_visible_3652515" transform="translate(-2 -5)" opacity="1">
      <path id="パス_177" data-name="パス 177" d="M12,5c3.315,0,6.57,2.17,9.795,6.393a1,1,0,0,1,0,1.214C18.57,16.83,15.315,19,12,19s-6.57-2.17-9.795-6.393a1,1,0,0,1,0-1.214C5.43,7.17,8.685,5,12,5Zm0,2C9.58,7,7.011,8.615,4.318,11.942h0L4.27,12l.308.376c2.512,3.009,4.915,4.522,7.187,4.62h0L12,17c2.42,0,4.989-1.615,7.682-4.942h0L19.729,12l-.307-.374C16.91,8.616,14.507,7.1,12.235,7.005h0Zm0,2a3,3,0,1,1-3,3A3,3,0,0,1,12,9Zm0,2a1,1,0,1,0,1,1A1,1,0,0,0,12,11Z"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
