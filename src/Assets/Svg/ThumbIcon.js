import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="15.005" height="14.998" viewBox="0 0 15.005 14.998">
    <path id="like_2_" data-name="like (2)" d="M13.2,6.46h-2.57l.357-3.045a2.114,2.114,0,0,0-4.125-.878L6.476,3.908A6.012,6.012,0,0,1,4.83,6.617a.67.67,0,0,0-.42-.158H1.682A.682.682,0,0,0,1,7.142v8.185a.682.682,0,0,0,.682.682H4.41a.682.682,0,0,0,.682-.682v-.09l.068.047a4.3,4.3,0,0,0,2.4.725h3.495a2.223,2.223,0,0,0,1.9-1.052l2.631-4.21A2.8,2.8,0,0,0,13.2,6.46ZM3.728,14.645H2.364V7.824H3.728Zm10.694-4.62-2.631,4.211a.867.867,0,0,1-.739.409H7.556a2.942,2.942,0,0,1-1.637-.5L5.092,13.6V8.169a7.376,7.376,0,0,0,2.7-3.888L8.18,2.913a.75.75,0,0,1,.72-.546.739.739,0,0,1,.565.258.75.75,0,0,1,.173.614L9.189,7.063a.682.682,0,0,0,.677.761H13.2a1.438,1.438,0,0,1,1.219,2.2Z" transform="translate(-1 -1.011)" fill="currentColor"/>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
