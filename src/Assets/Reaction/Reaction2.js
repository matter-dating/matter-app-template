import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20.103" height="20.103" viewBox="0 0 20.103 20.103">
    <g id="Group_1058" data-name="Group 1058" transform="translate(0)">
      <g id="smile" transform="translate(0 0)">
        <path id="Path_1515" data-name="Path 1515" d="M133.026,20.1,128,10.051,133.026,0a10.051,10.051,0,1,1,0,20.1Z" transform="translate(-122.974)" fill="#ffe17d"/>
        <path id="Path_1516" data-name="Path 1516" d="M0,10.051A10.051,10.051,0,0,1,10.052,0V20.1A10.051,10.051,0,0,1,0,10.051Z" fill="#ffe17d"/>
        <path id="Path_1517" data-name="Path 1517" d="M320.534,138.945h-1.178v-1.178a.589.589,0,0,0-1.178,0v1.178H317v-1.178a1.767,1.767,0,0,1,3.534,0Z" transform="translate(-304.553 -130.66)" fill="#9c6846"/>
        <path id="Path_1518" data-name="Path 1518" d="M108.534,138.945h-1.178v-1.178a.589.589,0,0,0-1.178,0v1.178H105v-1.178a1.767,1.767,0,0,1,3.534,0Z" transform="translate(-100.877 -130.66)" fill="#9c6846"/>
        <path id="Path_1519" data-name="Path 1519" d="M179.141,256,176,259.848h7.651A5.9,5.9,0,0,0,185.07,256Z" transform="translate(-169.089 -245.949)" fill="#e39547"/>
        <path id="Path_1520" data-name="Path 1520" d="M105,256a5.9,5.9,0,0,0,1.419,3.848h4.51V256Z" transform="translate(-100.877 -245.949)" fill="#e39547"/>
        <path id="Path_1521" data-name="Path 1521" d="M198.356,301,196,303.081l2.356,2.081a5.916,5.916,0,0,0,4.51-2.081A5.916,5.916,0,0,0,198.356,301Z" transform="translate(-188.304 -289.182)" fill="#e39547"/>
        <path id="Path_1522" data-name="Path 1522" d="M141.13,303.081a5.916,5.916,0,0,0,4.51,2.081V301A5.916,5.916,0,0,0,141.13,303.081Z" transform="translate(-135.589 -289.182)" fill="#e39547"/>
      </g>
      <path id="Path_1533" data-name="Path 1533" d="M11.537,73.8A10.073,10.073,0,0,1,3.72,57.376a10.073,10.073,0,1,0,14.171,14.17A10.032,10.032,0,0,1,11.537,73.8Z" transform="translate(0 -55.164)" fill="#ffd164"/>
    </g>
  </svg>
`;

export default ({width, height}) => (
  <SvgCss xml={xml} width={width} height={height} />
);
