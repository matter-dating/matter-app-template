import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="35.167" height="46.889" viewBox="0 0 35.167 46.889">
    <path id="padlock" d="M33.771,17.583H32.306V11.722a11.722,11.722,0,0,0-23.445,0v5.861H7.4a4.4,4.4,0,0,0-4.4,4.4V42.493a4.4,4.4,0,0,0,4.4,4.4H33.771a4.4,4.4,0,0,0,4.4-4.4V21.979A4.4,4.4,0,0,0,33.771,17.583Zm-21-5.861a7.815,7.815,0,1,1,15.63,0v5.861H12.769ZM22.537,32.67v4.451a1.954,1.954,0,1,1-3.907,0V32.67a3.907,3.907,0,1,1,3.907,0Z" transform="translate(-3)" fill="currentColor"/>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
