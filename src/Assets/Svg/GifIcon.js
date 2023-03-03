import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="25.244" height="22.56" viewBox="0 0 25.244 22.56">
    <g id="gif" transform="translate(-2 -47.573)" opacity="0.862">
      <g id="Group_1015" data-name="Group 1015" transform="translate(2 47.573)">
        <g id="Group_1014" data-name="Group 1014">
          <path id="Path_1497" data-name="Path 1497" d="M20.45,44.763H4.794A5.011,5.011,0,0,0,0,49.955V62.131a5.011,5.011,0,0,0,4.794,5.192H20.45a5.011,5.011,0,0,0,4.794-5.192V49.955A5.011,5.011,0,0,0,20.45,44.763ZM23.7,62.131a3.4,3.4,0,0,1-3.255,3.525H4.794a3.4,3.4,0,0,1-3.255-3.525V49.955A3.4,3.4,0,0,1,4.794,46.43H20.45A3.4,3.4,0,0,1,23.7,49.955Z" transform="translate(0 -44.763)" fill="currentColor"/>
        </g>
      </g>
      <g id="Group_1017" data-name="Group 1017" transform="translate(5.387 54.165)">
        <g id="Group_1016" data-name="Group 1016">
          <path id="Path_1498" data-name="Path 1498" d="M76.246,159.93h-1.8a.732.732,0,1,0,0,1.463h1a2.744,2.744,0,0,1-2.443,2.493c-1.383,0-2.508-1.447-2.508-3.225s1.125-3.225,2.508-3.225a2.266,2.266,0,0,1,1.809,1,.732.732,0,0,0,1.173-.875,3.741,3.741,0,0,0-2.982-1.586A3.674,3.674,0,0,0,70.15,157.4a5.328,5.328,0,0,0,0,6.522,3.574,3.574,0,0,0,5.714,0,5.142,5.142,0,0,0,1.115-3.261A.732.732,0,0,0,76.246,159.93Z" transform="translate(-69.035 -155.974)" fill="currentColor"/>
        </g>
      </g>
      <g id="Group_1019" data-name="Group 1019" transform="translate(15.32 54.165)">
        <g id="Group_1018" data-name="Group 1018">
          <path id="Path_1499" data-name="Path 1499" d="M271.616,155.974a.732.732,0,0,0-.732.732v7.913a.732.732,0,1,0,1.463,0v-7.913A.732.732,0,0,0,271.616,155.974Z" transform="translate(-270.884 -155.974)" fill="currentColor"/>
        </g>
      </g>
      <g id="Group_1021" data-name="Group 1021" transform="translate(18.773 54.165)">
        <g id="Group_1020" data-name="Group 1020" transform="translate(0 0)">
          <path id="Path_1500" data-name="Path 1500" d="M338.83,159h-2.89v-1.559h2.89a.732.732,0,1,0,0-1.463h-3.621a.732.732,0,0,0-.732.732v7.913a.732.732,0,1,0,1.463,0V160.46h2.89a.732.732,0,0,0,0-1.463Z" transform="translate(-334.477 -155.975)" fill="currentColor"/>
        </g>
      </g>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
