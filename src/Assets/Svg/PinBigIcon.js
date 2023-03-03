import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="74.707" height="85" viewBox="0 0 74.707 85">
    <g id="location" transform="translate(-31)">
      <g id="Group_1304" data-name="Group 1304" transform="translate(40.961)">
        <g id="Group_1303" data-name="Group 1303">
          <path id="Path_1660" data-name="Path 1660" d="M118.393,0A27.38,27.38,0,0,0,96.126,43.331L116.3,74.8a2.49,2.49,0,0,0,4.193,0l20.257-31.58A27.392,27.392,0,0,0,118.393,0Zm0,39.844a12.451,12.451,0,1,1,12.451-12.451A12.466,12.466,0,0,1,118.393,39.844Z" transform="translate(-91)" fill="currentColor"/>
        </g>
      </g>
      <g id="Group_1306" data-name="Group 1306" transform="translate(31 57.225)">
        <g id="Group_1305" data-name="Group 1305">
          <path id="Path_1661" data-name="Path 1661" d="M87.821,344.7,75.282,364.3a8.233,8.233,0,0,1-13.859,0l-12.56-19.6C37.812,347.255,31,351.936,31,357.529c0,9.706,19.246,14.941,37.354,14.941s37.354-5.236,37.354-14.941C105.707,351.932,98.885,347.249,87.821,344.7Z" transform="translate(-31 -344.695)" fill="#FFF"/>
        </g>
      </g>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
