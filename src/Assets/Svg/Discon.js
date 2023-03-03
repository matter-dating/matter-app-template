import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="21.107" height="18.114" viewBox="0 0 21.107 18.114">
    <g id="Group_810" data-name="Group 810" transform="translate(-53.697 -34.732)">
      <g id="no-wifi" transform="translate(36.189 18.277)">
        <g id="Group_588" data-name="Group 588" transform="translate(22.663 26.757)">
          <path id="Path_730" data-name="Path 730" d="M180.232,268.565a.743.743,0,0,1-.623-.248,4.294,4.294,0,0,0-.5-.38,3.722,3.722,0,0,0-4.811.38,1.045,1.045,0,0,1-1.477-1.477,5.816,5.816,0,0,1,7.4-.679,5.384,5.384,0,0,1,.756.679.976.976,0,0,1,0,1.419A1.041,1.041,0,0,1,180.232,268.565Z" transform="translate(-172.512 -265.142)" fill="currentColor"/>
        </g>
        <g id="Group_589" data-name="Group 589" transform="translate(20.762 22.306)">
          <path id="Path_731" data-name="Path 731" d="M151.352,187.743a.86.86,0,0,1-.681-.248c-.162-.162-.388-.313-.562-.454a6.413,6.413,0,0,0-8.553.454,1.045,1.045,0,1,1-1.477-1.478,8.506,8.506,0,0,1,11.3-.635,7.882,7.882,0,0,1,.652.635.976.976,0,0,1,0,1.419A.915.915,0,0,1,151.352,187.743Z" transform="translate(-139.773 -183.534)" fill="currentColor"/>
        </g>
        <g id="Group_590" data-name="Group 590" transform="translate(18.914 17.904)">
          <path id="Path_732" data-name="Path 732" d="M123.207,107.149a.86.86,0,0,1-.681-.248,9.957,9.957,0,0,0-.8-.67,9.021,9.021,0,0,0-12.007.67,1.045,1.045,0,0,1-1.477-1.478,11.112,11.112,0,0,1,14.647-.937,11.967,11.967,0,0,1,1.062,1,1.02,1.02,0,0,1-.739,1.667Z" transform="translate(-107.93 -102.17)" fill="#fff"/>
        </g>
        <path id="Path_733" data-name="Path 733" d="M218.75,341.455c0,1.058-.277,1.858-1.335,1.858a1.941,1.941,0,0,1-.494-.006,1.917,1.917,0,0,1,0-3.7,1.942,1.942,0,0,1,.494-.006C218.473,339.6,218.75,340.4,218.75,341.455Z" transform="translate(-190.341 -308.802)" fill="currentColor"/>
        <path id="Path_737" data-name="Path 737" d="M240.493,338.827a1.916,1.916,0,0,0-.493.064,1.916,1.916,0,0,1,0,3.7,1.916,1.916,0,1,0,.493-3.767Z" transform="translate(-213.419 -308.09)" fill="currentColor"/>
      </g>
      <line id="Line_212" data-name="Line 212" y1="15" x2="19" transform="translate(54.75 35.785)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
