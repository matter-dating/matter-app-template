import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="73" height="73" viewBox="0 0 73 73">
    <defs>
      <linearGradient id="linear-gradient" x1="0.119" y1="0.881" x2="0.83" y2="0.17" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#fee411"/>
        <stop offset="0.052" stop-color="#fedb16"/>
        <stop offset="0.138" stop-color="#fec125"/>
        <stop offset="0.248" stop-color="#fe983d"/>
        <stop offset="0.376" stop-color="#fe5f5e"/>
        <stop offset="0.5" stop-color="#fe2181"/>
        <stop offset="1" stop-color="#9000dc"/>
      </linearGradient>
    </defs>
    <g id="instagram_2_" data-name="instagram (2)" transform="translate(-31 -31.418)">
      <circle id="Ellipse_280" data-name="Ellipse 280" cx="36.5" cy="36.5" r="36.5" transform="translate(31 31.419)" fill="url(#linear-gradient)"/>
      <g id="Group_676" data-name="Group 676" transform="translate(47.022 46.599)">
        <path id="Path_892" data-name="Path 892" d="M160.28,131H144.144A13.052,13.052,0,0,0,131.1,144.044V160.18a13.052,13.052,0,0,0,13.044,13.044H160.28a13.052,13.052,0,0,0,13.044-13.044V144.044A13.052,13.052,0,0,0,160.28,131Zm8.33,29.2a8.354,8.354,0,0,1-8.347,8.347H144.127a8.354,8.354,0,0,1-8.347-8.347V144.061a8.354,8.354,0,0,1,8.347-8.347h16.136a8.354,8.354,0,0,1,8.347,8.347Z" transform="translate(-131.1 -131)" fill="#fff"/>
        <path id="Path_893" data-name="Path 893" d="M202.9,192.1a10.8,10.8,0,1,0,10.8,10.8A10.816,10.816,0,0,0,202.9,192.1Zm0,17.352a6.556,6.556,0,1,1,6.556-6.556,6.562,6.562,0,0,1-6.556,6.556Z" transform="translate(-181.793 -181.776)" fill="#fff"/>
        <circle id="Ellipse_281" data-name="Ellipse 281" cx="1.825" cy="1.825" r="1.825" transform="matrix(0.987, -0.16, 0.16, 0.987, 30.337, 8.197)" fill="#fff"/>
      </g>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
