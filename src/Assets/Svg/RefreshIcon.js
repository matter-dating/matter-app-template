import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16.91" height="17.996" viewBox="0 0 16.91 17.996">
    <g id="refresh" transform="translate(-3.547 -3)">
      <path id="Path_1506" data-name="Path 1506" d="M19.6,12.635a.99.99,0,0,0-1.135.844,6.4,6.4,0,0,1-1.83,3.618A6.5,6.5,0,0,1,7.446,7.905a6.414,6.414,0,0,1,3.5-1.8A6.187,6.187,0,0,1,12.8,6.05a6.414,6.414,0,0,1,2.466.828l-1.3.222a1,1,0,0,0,.168,1.986,1.01,1.01,0,0,0,.17-.014l3.49-.6a1,1,0,0,0,.816-1.155l-.6-3.49a1,1,0,1,0-1.971.338l.157.918a8.423,8.423,0,0,0-3.17-1.025,8.1,8.1,0,0,0-2.428.075A8.379,8.379,0,0,0,6.032,6.491a8.5,8.5,0,0,0,12.02,12.019,8.391,8.391,0,0,0,2.395-4.741,1,1,0,0,0-.844-1.135Z" fill="currentColor"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
