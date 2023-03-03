import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path id="noun_emoji_321669" d="M12.014.012a12,12,0,1,0,12,12A12.013,12.013,0,0,0,12.014.012Zm0,1.156A10.844,10.844,0,1,1,1.17,12.012,10.856,10.856,0,0,1,12.014,1.167ZM8.354,7.059a2.492,2.492,0,0,0-1.8.713.578.578,0,1,0,.817.818,1.419,1.419,0,0,1,1.978.042.578.578,0,1,0,.817-.817A2.606,2.606,0,0,0,8.354,7.059Zm7.861,0a2.49,2.49,0,0,0-1.8.713.578.578,0,0,0,.817.818,1.419,1.419,0,0,1,1.978.042.578.578,0,0,0,.817-.817A2.607,2.607,0,0,0,16.214,7.059Zm-4.781,5.964A4.771,4.771,0,0,0,6.7,17.816a.578.578,0,1,0,1.156,0,3.614,3.614,0,0,1,3.581-3.638h2.081a3.6,3.6,0,0,1,3.581,3.61.578.578,0,0,0,1.156,0,4.757,4.757,0,0,0-4.737-4.766Z" transform="translate(-0.014 -0.012)" fill="#fff" fill-rule="evenodd"/>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);