import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="34.667" height="104" viewBox="0 0 34.667 104">
    <g id="ruler_2_" data-name="ruler (2)" transform="translate(0)">
      <path id="Path_1036" data-name="Path 1036" d="M32.053,0H2.614C1.171,0,0,1.589,0,3.55v96.9c0,1.961,1.17,3.55,2.614,3.55H32.053c1.444,0,2.614-1.589,2.614-3.55V3.55C34.667,1.589,33.5,0,32.053,0Zm-9.92,15h-9.6c-1.673,0-3.03-1.842-3.03-4.115s1.357-4.116,3.03-4.116h9.6c1.674,0,3.03,1.842,3.03,4.116S23.806,15,22.132,15Zm0,0" transform="translate(0)" fill="#4f76ba"/>
      <g id="Group_725" data-name="Group 725" transform="translate(15.18 15.439)">
        <path id="Path_1038" data-name="Path 1038" d="M182.207,92.116a1.625,1.625,0,0,0,1.624,1.624h8.8V90.492h-8.8a1.624,1.624,0,0,0-1.624,1.624Zm0,0" transform="translate(-173.14 -90.492)" fill="#032324"/>
        <path id="Path_1039" data-name="Path 1039" d="M182.207,139.073a1.624,1.624,0,0,0,1.624,1.624h8.8v-3.248h-8.8A1.625,1.625,0,0,0,182.207,139.073Zm0,0" transform="translate(-173.14 -127.58)" fill="#032324"/>
        <path id="Path_1040" data-name="Path 1040" d="M182.207,186.035a1.624,1.624,0,0,0,1.624,1.624h8.8V184.41h-8.8A1.624,1.624,0,0,0,182.207,186.035Zm0,0" transform="translate(-173.14 -164.679)" fill="#032324"/>
        <path id="Path_1041" data-name="Path 1041" d="M139.07,232.992a1.623,1.623,0,0,0,1.624,1.623h17.863v-3.248H140.694A1.624,1.624,0,0,0,139.07,232.992Zm0,0" transform="translate(-139.07 -201.77)" fill="#032324"/>
        <path id="Path_1042" data-name="Path 1042" d="M182.207,279.953a1.624,1.624,0,0,0,1.624,1.624h8.8v-3.248h-8.8A1.624,1.624,0,0,0,182.207,279.953Zm0,0" transform="translate(-173.14 -238.865)" fill="#032324"/>
        <path id="Path_1043" data-name="Path 1043" d="M182.207,326.91a1.624,1.624,0,0,0,1.624,1.623h8.8v-3.248h-8.8A1.625,1.625,0,0,0,182.207,326.91Zm0,0" transform="translate(-173.14 -275.956)" fill="#032324"/>
        <path id="Path_1044" data-name="Path 1044" d="M182.207,373.87a1.625,1.625,0,0,0,1.624,1.624h8.8v-3.248h-8.8A1.625,1.625,0,0,0,182.207,373.87Zm0,0" transform="translate(-173.14 -313.051)" fill="#032324"/>
        <path id="Path_1045" data-name="Path 1045" d="M139.07,420.828a1.623,1.623,0,0,0,1.624,1.623h17.863V419.2H140.694A1.624,1.624,0,0,0,139.07,420.828Zm0,0" transform="translate(-139.07 -350.147)" fill="#032324"/>
        <path id="Path_1046" data-name="Path 1046" d="M182.207,467.788a1.625,1.625,0,0,0,1.624,1.624h8.8v-3.248h-8.8A1.624,1.624,0,0,0,182.207,467.788Zm0,0" transform="translate(-173.14 -387.237)" fill="#032324"/>
      </g>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
