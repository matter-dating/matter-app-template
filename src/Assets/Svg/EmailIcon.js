import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20.373" height="13.582" viewBox="0 0 20.373 13.582">
    <g id="email" transform="translate(0 -85.333)">
      <path id="Path_1424" data-name="Path 1424" d="M31.766,250.942a2.126,2.126,0,0,1-1.63.761H14a2.126,2.126,0,0,1-1.63-.761l7.786-6.461.807.55a1.95,1.95,0,0,0,2.208,0l.807-.55Z" transform="translate(-11.883 -152.788)" fill="#3963ac"/>
      <path id="Path_1425" data-name="Path 1425" d="M29.017,86.255l-7.9,5.387-.807.55a1.95,1.95,0,0,1-2.207,0l-.807-.55-7.9-5.4a2.134,2.134,0,0,1,1.749-.913H27.268A2.1,2.1,0,0,1,29.017,86.255Z" transform="translate(-9.016)" fill="#6b9df5"/>
      <g id="Group_859" data-name="Group 859" transform="translate(0 86.247)">
        <path id="Path_1426" data-name="Path 1426" d="M8.246,113.794.491,120.283A2.119,2.119,0,0,1,0,118.924v-9.343a2.1,2.1,0,0,1,.372-1.206Z" transform="translate(0 -108.375)" fill="#4472c2"/>
        <path id="Path_1427" data-name="Path 1427" d="M312.247,109.786v9.343a2.12,2.12,0,0,1-.491,1.359L304,114l7.874-5.41A2.092,2.092,0,0,1,312.247,109.786Z" transform="translate(-291.873 -108.58)" fill="#4472c2"/>
      </g>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
