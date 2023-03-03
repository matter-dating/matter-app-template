import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="12.906" height="14.775" viewBox="0 0 12.906 14.775">
    <g id="reminder" transform="translate(-31.373 0)" opacity="0.7">
      <path id="Path_1473" data-name="Path 1473" d="M43.683,11.24H43.1c-.136-7.726-2.926-9.372-5.276-9.372s-5.14,1.645-5.276,9.372h-.581a.6.6,0,1,0,0,1.191h2.979a2.939,2.939,0,0,0,5.756,0h2.979a.6.6,0,1,0,0-1.191ZM37.826,3.06c3.384,0,4.023,4.8,4.085,8.18H33.741C33.8,7.861,34.442,3.06,37.826,3.06Zm0,10.523a1.75,1.75,0,0,1-1.643-1.152h3.285A1.75,1.75,0,0,1,37.826,13.583ZM39.626.351a.6.6,0,0,1,.787-.3A7.458,7.458,0,0,1,44.158,4.6a.6.6,0,0,1-1.119.41,6.333,6.333,0,0,0-3.115-3.873.6.6,0,0,1-.3-.787ZM31.494,4.6A7.458,7.458,0,0,1,35.239.052a.6.6,0,0,1,.488,1.087,6.333,6.333,0,0,0-3.115,3.873.6.6,0,0,1-1.119-.41Z" transform="translate(0 0)" fill="currentColor"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
