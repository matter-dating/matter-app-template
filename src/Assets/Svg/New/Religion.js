import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="76.625" height="104" viewBox="0 0 76.625 104">
    <g id="pray" transform="translate(-99.84)">
      <g id="Group_731" data-name="Group 731" transform="translate(144.725 0)">
        <g id="Group_730" data-name="Group 730" transform="translate(0)">
          <g id="Group_729" data-name="Group 729">
            <path id="Path_1050" data-name="Path 1050" d="M272.659,104,262.145,92.909A21.026,21.026,0,0,1,256,77.886V42.448l0-37.584A5.029,5.029,0,0,1,261.054,0a4.9,4.9,0,0,1,4.689,3.443l11.693,44.749a29.313,29.313,0,0,1,1.066,7.831l.059,18.838a9.36,9.36,0,0,0,2.968,6.8l6.2,5.664Z" transform="translate(-255.993 0)" fill="#fccf8b"/>
            <path id="Path_1051" data-name="Path 1051" d="M272.67,246.788l-10.663-11.279a21.477,21.477,0,0,1-6-14.912v-35.67a6.015,6.015,0,0,1,12.03,0v24.319" transform="translate(-256.004 -142.79)" fill="#ecb86a"/>
            <path id="Path_1052" data-name="Path 1052" d="M272.945,184.927v24.319h6.3V184.927a6.019,6.019,0,0,0-9.163-5.109A5.988,5.988,0,0,1,272.945,184.927Z" transform="translate(-267.208 -142.631)" fill="#fccf8b"/>
          </g>
        </g>
      </g>
      <g id="Group_732" data-name="Group 732" transform="translate(99.84 0)">
        <g id="Group_730-2" data-name="Group 730" transform="translate(0)">
          <g id="Group_729-2" data-name="Group 729">
            <path id="Path_1050-2" data-name="Path 1050" d="M271.069,104l10.514-11.09a21.027,21.027,0,0,0,6.15-15.023V42.448l0-37.584A5.029,5.029,0,0,0,282.674,0a4.9,4.9,0,0,0-4.69,3.443l-11.694,44.75a29.315,29.315,0,0,0-1.066,7.831l-.059,18.838a9.361,9.361,0,0,1-2.968,6.8l-6.2,5.664Z" transform="translate(-255.993 0)" fill="#fccf8b"/>
            <path id="Path_1051-2" data-name="Path 1051" d="M256.007,246.789l10.664-11.279a21.477,21.477,0,0,0,6-14.912v-35.67a6.015,6.015,0,0,0-12.031,0v24.32" transform="translate(-240.931 -142.789)" fill="#ecb86a"/>
            <path id="Path_1052-2" data-name="Path 1052" d="M276.375,184.927v24.32h-6.3v-24.32a6.019,6.019,0,0,1,9.164-5.109A5.988,5.988,0,0,0,276.375,184.927Z" transform="translate(-250.37 -142.63)" fill="#fccf8b"/>
          </g>
        </g>
      </g>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
