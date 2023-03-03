import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="85.314" height="104.002" viewBox="0 0 85.314 104.002">
    <g id="baby-stroller" transform="translate(-46)">
      <g id="Group_739" data-name="Group 739" transform="translate(72.793 91.697)">
        <path id="Path_1162" data-name="Path 1162" d="M178.44,452H204.1v6.152H178.44Z" transform="translate(-178.44 -452)" fill="#ffdfea"/>
      </g>
      <path id="Path_1163" data-name="Path 1163" d="M241,452h12.83v6.152H241Z" transform="translate(-155.456 -360.303)" fill="#ffbfbf"/>
      <g id="Group_740" data-name="Group 740" transform="translate(65.04 62.235)">
        <path id="Path_1164" data-name="Path 1164" d="M0,0H22.892V6.152H0Z" transform="matrix(0.522, -0.853, 0.853, 0.522, 0, 19.527)" fill="#ffdfea"/>
      </g>
      <g id="Group_741" data-name="Group 741" transform="translate(89.007 62.225)">
        <path id="Path_1165" data-name="Path 1165" d="M0,0H6.152V22.892H0Z" transform="matrix(0.853, -0.522, 0.522, 0.853, 0, 3.212)" fill="#ffbfbf"/>
      </g>
      <g id="Group_743" data-name="Group 743" transform="translate(119.009 12.305)">
        <g id="Group_742" data-name="Group 742">
          <path id="Path_1166" data-name="Path 1166" d="M412.152,78.457a3.076,3.076,0,0,1-3.076,3.076H406V72.3A12.319,12.319,0,0,1,418.3,60v6.152a6.159,6.159,0,0,0-6.153,6.152Z" transform="translate(-406 -60)" fill="#ffbfbf"/>
        </g>
      </g>
      <path id="Path_1167" data-name="Path 1167" d="M132.656,0H97.351A21.436,21.436,0,0,0,83.51,5.052L92.429,25.02l23.379,5.742Z" transform="translate(-29.818)" fill="#fc8b8b"/>
      <path id="Path_1168" data-name="Path 1168" d="M125.162,50.341V65.722a21.447,21.447,0,0,1-21.313,21.533H67.313A21.429,21.429,0,0,1,46,65.722V41.112A21.584,21.584,0,0,1,53.614,24.63L85.581,50.341Z" transform="translate(0 -19.579)" fill="#f87c7c"/>
      <path id="Path_1169" data-name="Path 1169" d="M280.991,150v15.381a21.557,21.557,0,0,1-21.533,21.533H241V150Z" transform="translate(-155.829 -119.689)" fill="#fc8b8b"/>
      <g id="Group_744" data-name="Group 744" transform="translate(52.152 79.392)">
        <path id="Path_1170" data-name="Path 1170" d="M88.3,416.609a12.3,12.3,0,1,1,12.3-12.3A12.319,12.319,0,0,1,88.3,416.609Z" transform="translate(-76 -392)" fill="#633333"/>
        <circle id="Ellipse_299" data-name="Ellipse 299" cx="6.933" cy="6.933" r="6.933" transform="translate(5.373 5.368)" fill="#fff5f5"/>
      </g>
      <g id="Group_745" data-name="Group 745" transform="translate(94.4 79.392)">
        <path id="Path_1171" data-name="Path 1171" d="M298.3,416.609a12.3,12.3,0,1,1,12.3-12.3A12.319,12.319,0,0,1,298.3,416.609Z" transform="translate(-286 -392)" fill="#633333"/>
      </g>
      <circle id="Ellipse_300" data-name="Ellipse 300" cx="6.933" cy="6.933" r="6.933" transform="translate(99.772 84.762)" fill="#fff5f5"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
