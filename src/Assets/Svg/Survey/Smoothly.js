import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path id="noun_emoji_321659" d="M11.995.012a12,12,0,1,0,12,12A12.014,12.014,0,0,0,11.995.012Zm0,1.156A10.844,10.844,0,1,1,1.15,12.012,10.856,10.856,0,0,1,11.995,1.167ZM8,7.484A1.382,1.382,0,1,0,9.386,8.866,1.382,1.382,0,0,0,8,7.484Zm7.945,0A1.382,1.382,0,1,0,17.33,8.866,1.382,1.382,0,0,0,15.949,7.484ZM6.265,14.563a.578.578,0,0,0-.578.578,5.036,5.036,0,0,0,5.219,4.816h2.321a5.036,5.036,0,0,0,5.219-4.816.578.578,0,0,0-.578-.578Zm.628,1.156H17.24A3.966,3.966,0,0,1,13.227,18.8H10.906A3.967,3.967,0,0,1,6.894,15.718Z" transform="translate(0.006 -0.012)" fill="#fff" fill-rule="evenodd"/>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
