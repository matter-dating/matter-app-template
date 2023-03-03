import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9.941" viewBox="0 0 13 9.941">
    <g id="noun_Check_1807547" transform="translate(-21.97 -28.969)">
      <g id="グループ_476" data-name="グループ 476" transform="translate(21.97 28.969)">
        <path id="パス_482" data-name="パス 482" d="M33.776,981.331a1.15,1.15,0,0,0-.8.362c-2.246,2.294-4.295,4.55-6.464,6.8l-2.66-2.164a1.145,1.145,0,0,0-1.631.185,1.2,1.2,0,0,0,.181,1.662l3.478,2.836a1.143,1.143,0,0,0,1.544-.089c2.5-2.551,4.739-5.061,7.189-7.563a1.2,1.2,0,0,0,.263-1.309A1.159,1.159,0,0,0,33.776,981.331Z" transform="translate(-21.97 -981.331)" fill="currentColor"/>
      </g>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
