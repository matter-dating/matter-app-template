import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><defs><style>.a{fill:none;}</style></defs><g transform="translate(-154 -160)"><rect class="a" width="24" height="24" transform="translate(154 160)"/><g transform="translate(156.016 162.008)"><path d="M19.469,17.158l-3.863-3.871a8.521,8.521,0,1,0-2.352,2.358l3.863,3.87a1.682,1.682,0,0,0,2.352,0,1.646,1.646,0,0,0,.056-2.337A.05.05,0,0,0,19.469,17.158ZM8.521,2.5A6.042,6.042,0,1,1,2.492,8.545,6.035,6.035,0,0,1,8.521,2.5Z" transform="translate(0)"/></g></g></svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
