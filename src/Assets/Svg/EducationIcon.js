import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="132.433" height="104" viewBox="0 0 132.433 104">
    <g id="mortarboard" transform="translate(0 -53.906)">
      <g id="グループ_710" data-name="グループ 710" transform="translate(25.455 100.446)">
        <path id="パス_983" data-name="パス 983" d="M178.453,232.257h-77.23a2.145,2.145,0,0,0-2.145,2.145v15.355c0,13.042,17.9,23.26,40.76,23.26s40.76-10.217,40.76-23.26V234.4A2.145,2.145,0,0,0,178.453,232.257Z" transform="translate(-99.078 -232.257)" fill="#3963ac"/>
      </g>
      <g id="グループ_711" data-name="グループ 711" transform="translate(25.938 100.446)">
        <path id="パス_984" data-name="パス 984" d="M139.905,232.257H101.223a2.145,2.145,0,0,0-2.145,2.145v15.355c0,13.042,17.9,23.26,40.76,23.26l.067,0Z" transform="translate(-99.078 -232.257)" fill="#264985"/>
      </g>
      <g id="グループ_712" data-name="グループ 712" transform="translate(0 53.907)">
        <path id="パス_985" data-name="パス 985" d="M127.319,78.831,73.686,55.456a18.772,18.772,0,0,0-14.95.005L5.116,78.829a8.637,8.637,0,0,0,0,15.772l53.631,23.374a18.778,18.778,0,0,0,14.95-.005L127.315,94.6a8.636,8.636,0,0,0,0-15.772Z" transform="translate(0 -53.907)" fill="#4f76ba"/>
      </g>
      <g id="グループ_714" data-name="グループ 714" transform="translate(11.552 84.39)">
        <g id="グループ_713" data-name="グループ 713" transform="translate(0 0)">
          <path id="パス_986" data-name="パス 986" d="M45.223,217.488a2.145,2.145,0,0,1-2.145-2.145v-32.52a4.281,4.281,0,0,1,3.557-4.228l43.272-7.526a2.145,2.145,0,1,1,.733,4.228l-43.272,7.526v32.519A2.145,2.145,0,0,1,45.223,217.488Z" transform="translate(-43.078 -171.037)" fill="#5c546a"/>
        </g>
      </g>
      <g id="グループ_715" data-name="グループ 715" transform="translate(9.407 126.152)">
        <circle id="楕円形_288" data-name="楕円形 288" cx="4.291" cy="4.291" r="4.291" transform="translate(0 0)" fill="#f8a27c"/>
      </g>
      <g id="グループ_716" data-name="グループ 716" transform="translate(57.634 84.019)">
        <path id="パス_987" data-name="パス 987" d="M219.078,168.257v4.29c0,2.37,3.842,4.291,8.581,4.291s8.581-1.921,8.581-4.291v-4.29Z" transform="translate(-219.078 -168.257)" fill="#c4b638"/>
      </g>
      <g id="グループ_717" data-name="グループ 717" transform="translate(57.634 79.806)">
        <ellipse id="楕円形_289" data-name="楕円形 289" cx="8.581" cy="4.291" rx="8.581" ry="4.291" transform="translate(0 0)" fill="#f8ec7c"/>
      </g>
      <g id="グループ_718" data-name="グループ 718" transform="translate(7.736 134.309)">
        <path id="パス_988" data-name="パス 988" d="M30.4,364.529l-1.544,16.986a2.145,2.145,0,0,0,2.136,2.34h8.173a2.145,2.145,0,0,0,2.136-2.34l-1.544-16.986a4.7,4.7,0,0,0-4.679-4.273h0A4.7,4.7,0,0,0,30.4,364.529Z" transform="translate(-28.847 -360.256)" fill="#f8ec7c"/>
      </g>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
