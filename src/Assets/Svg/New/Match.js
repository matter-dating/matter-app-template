import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="91" height="117" viewBox="0 0 91 117">
    <g id="Group_1226" data-name="Group 1226" transform="translate(-118 -89)">
      <rect id="app_store_logo_background" data-name="app store logo background" width="91" height="117" rx="8" transform="translate(118 89)" fill="#92d7eb"/>
      <circle id="Ellipse_469" data-name="Ellipse 469" cx="17.5" cy="17.5" r="17.5" transform="translate(146 113)" fill="#fff"/>
      <path id="Rectangle_1199" data-name="Rectangle 1199" d="M45.5,0h0A45.5,45.5,0,0,1,91,45.5v.433A6.067,6.067,0,0,1,84.933,52H6.067A6.067,6.067,0,0,1,0,45.933V45.5A45.5,45.5,0,0,1,45.5,0Z" transform="translate(118 154)" fill="#fff"/>
      <rect id="app_store_logo_background-2" data-name="app store logo background" width="91" height="117" rx="8" transform="translate(118 89)" fill="#92d7eb"/>
      <circle id="Ellipse_597" data-name="Ellipse 597" cx="17.5" cy="17.5" r="17.5" transform="translate(146 113)" fill="#fff"/>
      <path id="Rectangle_1441" data-name="Rectangle 1441" d="M45.5,0h0A45.5,45.5,0,0,1,91,45.5v.433A6.067,6.067,0,0,1,84.933,52H6.067A6.067,6.067,0,0,1,0,45.933V45.5A45.5,45.5,0,0,1,45.5,0Z" transform="translate(118 154)" fill="#fff"/>
    </g>
  </svg>

`;
export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
