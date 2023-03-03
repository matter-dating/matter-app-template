import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20.104" height="20.103" viewBox="0 0 20.104 20.103">
    <g id="angry" transform="translate(0)">
      <ellipse id="Ellipse_556" data-name="Ellipse 556" cx="10.052" cy="10.051" rx="10.052" ry="10.051" transform="translate(0)" fill="#ffe17d"/>
      <path id="Path_1523" data-name="Path 1523" d="M149.456,225.238h0a.811.811,0,0,1-.811-.811v-.648a.811.811,0,0,1,.811-.811h0a.811.811,0,0,1,.811.811v.648A.811.811,0,0,1,149.456,225.238Z" transform="translate(-142.806 -214.214)" fill="#7d5046"/>
      <path id="Path_1524" data-name="Path 1524" d="M165.323,222.968a.815.815,0,0,0-.162.016V224.1a.486.486,0,0,0,.973,0v-.324A.811.811,0,0,0,165.323,222.968Z" transform="translate(-158.674 -214.214)" fill="#9c6846"/>
      <path id="Path_1525" data-name="Path 1525" d="M322.876,225.238h0a.811.811,0,0,1-.811-.811v-.648a.811.811,0,0,1,.811-.811h0a.811.811,0,0,1,.811.811v.648A.811.811,0,0,1,322.876,225.238Z" transform="translate(-309.417 -214.214)" fill="#7d5046"/>
      <path id="Path_1526" data-name="Path 1526" d="M338.743,222.968a.816.816,0,0,0-.162.016V224.1a.486.486,0,0,0,.973,0v-.324A.811.811,0,0,0,338.743,222.968Z" transform="translate(-325.284 -214.214)" fill="#9c6846"/>
      <path id="Path_1527" data-name="Path 1527" d="M11.511,73.767a10.05,10.05,0,0,1-7.8-16.391A10.051,10.051,0,1,0,17.851,71.514,10.009,10.009,0,0,1,11.511,73.767Z" transform="translate(0.002 -55.123)" fill="#ffd164"/>
      <g id="Group_1057" data-name="Group 1057" transform="translate(4.785 6.403)">
        <path id="Path_1528" data-name="Path 1528" d="M125.129,164.876a.409.409,0,0,1-.128-.021l-2.918-.973a.405.405,0,0,1,.256-.769l2.918.973a.405.405,0,0,1-.128.79Z" transform="translate(-121.805 -163.092)" fill="#794921"/>
        <path id="Path_1529" data-name="Path 1529" d="M295.63,164.876a.405.405,0,0,1-.128-.79l2.918-.973a.405.405,0,0,1,.256.769l-2.918.973A.407.407,0,0,1,295.63,164.876Z" transform="translate(-288.415 -163.093)" fill="#794921"/>
      </g>
      <path id="Path_1530" data-name="Path 1530" d="M190.527,324.054a12.1,12.1,0,0,1,2.331.222.292.292,0,0,0,.318-.407,2.847,2.847,0,0,0-5.3,0,.293.293,0,0,0,.318.407A12.1,12.1,0,0,1,190.527,324.054Z" transform="translate(-180.475 -309.419)" fill="#9c6846"/>
      <path id="Path_1531" data-name="Path 1531" d="M192.817,323.038a5.028,5.028,0,0,1,2.58.678,2.841,2.841,0,0,0-5.16,0A5.028,5.028,0,0,1,192.817,323.038Z" transform="translate(-182.765 -309.42)" fill="#7d5046"/>
    </g>
  </svg>
`;

export default ({width, height}) => (
  <SvgCss xml={xml} width={width} height={height} />
);
