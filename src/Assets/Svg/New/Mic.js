import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357.23 512"><defs><style>.cls-1{fill:#7a7989;}.cls-2{fill:#615f6d;}.cls-3{fill:#bdc2d1;}.cls-4{fill:#9297a5;}</style></defs><path class="cls-1" d="M255.61,313.75c-50.66,0-92.11-41.45-92.11-92.12V92.12C163.5,41.45,205,0,255.61,0s92.12,41.45,92.12,92.12V221.63C347.73,272.3,306.28,313.75,255.61,313.75Z" transform="translate(-77 0)"/><path class="cls-2" d="M254.3,66.72c18.2-17.86,29-42.6,34.8-60.38A91.25,91.25,0,0,0,255.61,0C205,0,163.5,41.45,163.5,92.12V221.63c0,50.67,41.45,92.12,92.11,92.12a91.35,91.35,0,0,0,23.05-2.94C229.57,284.38,223.87,192.45,225.41,134A97.79,97.79,0,0,1,254.3,66.72Z" transform="translate(-77 0)"/><path class="cls-3" d="M163.5,156.88v64.75c0,50.67,41.45,92.12,92.11,92.12s92.12-41.45,92.12-92.12V156.88Z" transform="translate(-77 0)"/><path class="cls-3" d="M255.23,512a26.69,26.69,0,0,1-26.61-26.62V374.44h53.23V485.38A26.69,26.69,0,0,1,255.23,512Z" transform="translate(-77 0)"/><path class="cls-4" d="M228.62,452.64a162.32,162.32,0,0,0,53.23-16.75V374.44H228.62Z" transform="translate(-77 0)"/><path class="cls-3" d="M255.61,400.25C157.12,400.25,77,320.12,77,221.63V156.88a21.63,21.63,0,1,1,43.25,0v64.75C120.25,296.27,181,357,255.61,357S391,296.27,391,221.63V156.88a21.63,21.63,0,1,1,43.25,0v64.75C434.23,320.12,354.1,400.25,255.61,400.25Z" transform="translate(-77 0)"/><path class="cls-4" d="M163.5,221.63c0,50.67,41.45,92.12,92.11,92.12a91.35,91.35,0,0,0,23.05-2.94c-43.07-23.19-52.74-96.79-53.43-153.93H163.5Z" transform="translate(-77 0)"/></svg>
`;
export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);