import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="114.758" height="104" viewBox="0 0 114.758 104">
    <g id="suitcase" transform="translate(0 -24)">
      <g id="グループ_702" data-name="グループ 702" transform="translate(31.858 24)">
        <path id="パス_975" data-name="パス 975" d="M159.853,42.322v-4.8a5.677,5.677,0,0,1,5.671-5.671h23.995a5.677,5.677,0,0,1,5.671,5.671v4.8h7.853v-4.8A13.539,13.539,0,0,0,189.518,24H165.524A13.539,13.539,0,0,0,152,37.523v4.8Z" transform="translate(-152 -24)" fill="#567a9e"/>
      </g>
      <g id="グループ_703" data-name="グループ 703" transform="translate(0 41.668)">
        <path id="パス_976" data-name="パス 976" d="M105.793,96H8.965A8.9,8.9,0,0,0,0,104.809v68.713a8.9,8.9,0,0,0,8.965,8.809h96.827a8.9,8.9,0,0,0,8.965-8.809V104.809A8.9,8.9,0,0,0,105.793,96Z" transform="translate(0 -96)" fill="#6f96bc"/>
      </g>
      <g id="グループ_704" data-name="グループ 704" transform="translate(0 84.81)">
        <path id="パス_977" data-name="パス 977" d="M109.379,317.889h-104A5.658,5.658,0,0,1,0,312v33.374c0,5.412,4.022,9.816,8.965,9.816h96.827c4.943,0,8.965-4.4,8.965-9.816V312A5.658,5.658,0,0,1,109.379,317.889Z" transform="translate(0 -312)" fill="#567a9e"/>
      </g>
      <g id="グループ_709" data-name="グループ 709" transform="translate(43.637 84.759)">
        <path id="パス_982" data-name="パス 982" d="M225.521,299.926H201.963A1.963,1.963,0,0,1,200,297.963h0A1.963,1.963,0,0,1,201.963,296h23.558a1.963,1.963,0,0,1,1.963,1.963h0A1.963,1.963,0,0,1,225.521,299.926Z" transform="translate(-200 -296)" fill="#fcde8b"/>
      </g>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
