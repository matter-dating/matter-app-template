import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="73.128" height="73" viewBox="0 0 73.128 73">
    <g id="layer1" transform="translate(-0.529 -280.6)">
      <path id="rect6040-55-7" d="M5.848,310.973,68.311,291.3a1.771,1.771,0,0,0,1.32-2.538l-1.162-3.64a6.519,6.519,0,0,0-8.191-4.218L5.085,298.286a6.457,6.457,0,0,0-4.247,8.135l1.068,3.345c.443,1.308,1.4,2.007,3.942,1.207Z" transform="translate(0 0)" fill="#666"/>
      <path id="path7765" d="M52.3,2.839,9.422,16.672A7.307,7.307,0,0,0,4.38,13.778a2.422,2.422,0,1,0-.518,4.817A4.968,4.968,0,0,1,7.2,21.257L55.347,5.993A2.61,2.61,0,0,0,52.3,2.839Z" transform="translate(4.17 288.008)" fill="#4d4d4d"/>
      <path id="path7501" d="M.982,290.855V322.9a6.487,6.487,0,0,0,6.523,6.48H65.4a6.487,6.487,0,0,0,6.523-6.48V291.016a3.714,3.714,0,0,0-3.605-3.761H4.612a3.3,3.3,0,0,0-3.629,3.6Z" transform="translate(1.619 24.221)" fill="#8adff8"/>
      <path id="path7758" d="M5.753,9.45a2.423,2.423,0,1,0,0,4.845H63.185V9.45Z" transform="translate(10.472 312.173)" fill="#56c2e3"/>
      <path id="path7683" d="M72.033,18.4l-.007-7.437a3.693,3.693,0,0,0-3.6-3.767H4.619A3.3,3.3,0,0,0,.984,10.806v7.6Z" transform="translate(1.624 304.093)" fill="#666"/>
      <path id="path7515" d="M12.749,292.095a6.11,6.11,0,1,1-6.11-6.11A6.11,6.11,0,0,1,12.749,292.095Z" transform="translate(0.001 19.409)" fill="#fee758"/>
      <g id="Group_693" data-name="Group 693" transform="translate(8.324 282.93)">
        <path id="path7718" d="M11.864,7.2,4.273,18.4H19.991L26.04,7.2Z" transform="translate(5.158 21.193)" fill="#d1dcff"/>
        <path id="path7720" d="M17.506,3.051,2.532,7.8l14.477,8.357L30.6,11.85Z" transform="translate(-1.174 6.124)" fill="#d1dcff"/>
        <path id="path7728" d="M16.277,7.2,10.623,18.4H25.057L30.588,7.2Z" transform="translate(28.171 21.193)" fill="#d1dcff"/>
        <path id="path7730" d="M23.888,1.043,8.853,5.81l12.869,8.868,14.221-4.507Z" transform="translate(21.855 -1.043)" fill="#d1dcff"/>
        <path id="path7772" d="M18.669,4.383,4.743,8.876,9.12,11.4Q15.914,9.25,22.708,7.1Z" transform="translate(6.849 11.008)" fill="#bfd2ff"/>
        <path id="path7778" d="M19.867,2.84,10.784,5.77,14.83,8.558l8.087-2.563a2.61,2.61,0,0,0-3.05-3.154Z" transform="translate(28.747 5.077)" fill="#bfd2ff"/>
        <path id="path7738" d="M3.473,12.455a1.211,1.211,0,1,0,0,2.421h33.5a1.211,1.211,0,1,0,0-2.421Zm13.512,7.172c-4.528.01-9.1,0-13.63,0a1.211,1.211,0,0,0,.118,2.412H16.853a1.211,1.211,0,1,0,.132-2.417Z" transform="translate(-2.235 40.155)" fill="#666"/>
      </g>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
