import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><defs><style>.a{fill:none;}.b{clip-path:url(#a);}</style><clipPath id="a"><rect width="24" height="24"/></clipPath></defs><g transform="translate(-330 -292)"><g transform="translate(308 132)"><rect class="a" width="24" height="24" transform="translate(22 160)"/></g><path d="M7.948,16.654.243,9.077a.805.805,0,0,1,0-1.154L7.948.346a1.218,1.218,0,0,1,1.7,0,1.17,1.17,0,0,1,0,1.672L3.058,8.5l6.591,6.481a1.171,1.171,0,0,1,0,1.673,1.218,1.218,0,0,1-1.7,0" transform="translate(336 295.5)"/></g></svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
