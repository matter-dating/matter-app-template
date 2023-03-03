import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="103.734" height="104" viewBox="0 0 103.734 104">
    <g id="peace" transform="translate(-94.377 -198.729)">
      <path id="Path_1075" data-name="Path 1075" d="M209.006,218.575a48.805,48.805,0,0,0-39.323-19.847h-3.291a48.805,48.805,0,0,0-39.323,19.847Z" transform="translate(-21.793 0)" fill="#cbe3f8"/>
      <path id="Path_1077" data-name="Path 1077" d="M94.377,259.957v6.813a1.7,1.7,0,0,0,1.695,1.695H196.416a1.7,1.7,0,0,0,1.695-1.695v-6.813a1.7,1.7,0,0,0-1.695-1.695H96.072A1.7,1.7,0,0,0,94.377,259.957Z" transform="translate(0 -39.779)" fill="#cbe3f8"/>
      <path id="Path_1078" data-name="Path 1078" d="M94.377,483.089V489.9a1.7,1.7,0,0,0,1.695,1.695H196.416a1.7,1.7,0,0,0,1.695-1.695v-6.814a1.7,1.7,0,0,0-1.695-1.695H96.072A1.7,1.7,0,0,0,94.377,483.089Z" transform="translate(0 -188.87)" fill="#aad2f5"/>
      <g id="Group_733" data-name="Group 733" transform="translate(101.145 228.342)">
        <path id="Path_1081" data-name="Path 1081" d="M324.531,288.869v11.049a1.356,1.356,0,0,0,1.356,1.356h17.527a1.356,1.356,0,0,0,1.356-1.356V288.869Z" transform="translate(-254.572 -288.869)" fill="#cbe3f8"/>
        <path id="Path_1082" data-name="Path 1082" d="M324.531,445.538v11.05H344.77v-11.05a1.356,1.356,0,0,0-1.356-1.356H325.887A1.356,1.356,0,0,0,324.531,445.538Z" transform="translate(-254.572 -392.405)" fill="#cbe3f8"/>
        <path id="Path_1083" data-name="Path 1083" d="M219.6,288.869v11.049a1.356,1.356,0,0,0,1.356,1.356h17.527a1.356,1.356,0,0,0,1.356-1.356V288.869Z" transform="translate(-184.625 -288.869)" fill="#cbe3f8"/>
        <path id="Path_1084" data-name="Path 1084" d="M219.6,445.538v11.05h20.239v-11.05a1.356,1.356,0,0,0-1.356-1.356H220.961A1.356,1.356,0,0,0,219.6,445.538Z" transform="translate(-184.625 -392.405)" fill="#cbe3f8"/>
        <path id="Path_1085" data-name="Path 1085" d="M114.678,288.869v11.049a1.356,1.356,0,0,0,1.356,1.356h17.527a1.356,1.356,0,0,0,1.356-1.356V288.869Z" transform="translate(-114.678 -288.869)" fill="#cbe3f8"/>
        <path id="Path_1086" data-name="Path 1086" d="M114.678,445.538v11.05h20.239v-11.05a1.356,1.356,0,0,0-1.356-1.356H116.034A1.356,1.356,0,0,0,114.678,445.538Z" transform="translate(-114.678 -392.405)" fill="#cbe3f8"/>
      </g>
      <path id="Path_1087" data-name="Path 1087" d="M339.293,326.08h10.4v39.372h-10.4Z" transform="translate(-163.267 -85.181)" fill="#cbe3f8"/>
      <path id="Path_1088" data-name="Path 1088" d="M234.367,326.08h10.4v39.372h-10.4Z" transform="translate(-93.321 -85.181)" fill="#cbe3f8"/>
      <path id="Path_1089" data-name="Path 1089" d="M129.441,326.08h10.4v39.372h-10.4Z" transform="translate(-23.375 -85.181)" fill="#cbe3f8"/>
      <path id="Path_1090" data-name="Path 1090" d="M339.293,326.08h10.4v8.094h-10.4Z" transform="translate(-163.267 -85.089)" fill="#aad2f5"/>
      <path id="Path_1091" data-name="Path 1091" d="M234.367,326.08h10.4v8.094h-10.4Z" transform="translate(-93.321 -85.089)" fill="#aad2f5"/>
      <path id="Path_1092" data-name="Path 1092" d="M129.441,326.08h10.4v8.094h-10.4Z" transform="translate(-23.375 -85.089)" fill="#aad2f5"/>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
