import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path id="noun_Neutral_321668" d="M12.013.012a12,12,0,1,0,12,12A12.013,12.013,0,0,0,12.013.012Zm0,1.156A10.844,10.844,0,1,1,1.169,12.012,10.857,10.857,0,0,1,12.013,1.167ZM8.024,7.484A1.382,1.382,0,1,0,9.405,8.866,1.382,1.382,0,0,0,8.024,7.484Zm7.945,0A1.382,1.382,0,1,0,17.35,8.866,1.382,1.382,0,0,0,15.968,7.484Zm-9.1,8.234a.578.578,0,0,0,0,1.156H17.651a.578.578,0,0,0,0-1.156Z" transform="translate(-0.014 -0.012)" fill="#fff" fill-rule="evenodd"/>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
