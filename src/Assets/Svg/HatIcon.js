import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="14.818" height="14.79" viewBox="0 0 14.818 14.79">
  <g id="tall-hat" transform="translate(0 -0.5)">
    <g id="Group_1594" data-name="Group 1594" transform="translate(0 0.5)">
      <path id="Path_2041" data-name="Path 2041" d="M12.233,9.923a63.677,63.677,0,0,1,.814-8.049.562.562,0,0,0,0-.1C12.992.55,8.715.5,7.409.5,5.3.5,1.765.669,1.765,1.8a1.407,1.407,0,0,0,.018.142,63.2,63.2,0,0,1,.8,7.978C.939,10.487,0,11.3,0,12.251c0,1.974,3.831,3.039,7.409,3.039s7.409-1.065,7.409-3.039C14.818,11.3,13.879,10.487,12.233,9.923Zm-.917,2.255a9.88,9.88,0,0,1-3.907.536A9.88,9.88,0,0,1,3.5,12.178c0-.27-.014-.541-.018-.811a13.565,13.565,0,0,0,3.925.478,13.565,13.565,0,0,0,3.925-.478C11.33,11.637,11.317,11.908,11.316,12.178ZM7.409,2.237A17.454,17.454,0,0,1,2.95,1.8a17.455,17.455,0,0,1,4.459-.434,17.454,17.454,0,0,1,4.459.434A17.454,17.454,0,0,1,7.409,2.237Z" transform="translate(0 -0.5)" fill="currentColor"/>
    </g>
  </g>
</svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);