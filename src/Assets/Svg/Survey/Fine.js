import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path id="noun_emoji_321658" d="M12,.012a12,12,0,1,0,12,12A12.013,12.013,0,0,0,12,.012Zm0,1.139a10.861,10.861,0,1,1-10.86,10.86A10.873,10.873,0,0,1,12,1.151ZM8,7.482A1.383,1.383,0,1,0,9.386,8.864,1.382,1.382,0,0,0,8,7.482Zm7.951,0a1.383,1.383,0,1,0,1.382,1.382A1.382,1.382,0,0,0,15.954,7.482Zm-8.661,6.7a.57.57,0,0,0-.57.57,4.39,4.39,0,0,0,4.411,4.358h1.92a4.312,4.312,0,0,0,4.411-4.3.57.57,0,0,0-1.14,0,3.185,3.185,0,0,1-3.271,3.165h-1.92A3.211,3.211,0,0,1,7.862,14.75.57.57,0,0,0,7.292,14.18Z" transform="translate(0.004 -0.012)" fill="#fff" fill-rule="evenodd"/>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
