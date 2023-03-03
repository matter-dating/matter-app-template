import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="17.492" height="9.475" viewBox="0 0 17.492 9.475">
    <g id="coffee-cup_2_" data-name="coffee-cup (2)" transform="translate(0 -202.654)">
      <g id="Group_1393" data-name="Group 1393" transform="translate(2.186 202.654)">
        <g id="Group_1392" data-name="Group 1392" transform="translate(0 0)">
          <path id="Path_1762" data-name="Path 1762" d="M75.285,202.654h-10.2a1.1,1.1,0,0,0-1.093,1.093v.729a6.907,6.907,0,0,0,3.749,6.155.365.365,0,0,0,.335-.648,6.18,6.18,0,0,1-3.354-5.507v-.729a.365.365,0,0,1,.364-.364h10.2a.365.365,0,0,1,.364.364v.729a6.177,6.177,0,0,1-3.355,5.507.365.365,0,0,0,.168.689.359.359,0,0,0,.167-.041,6.9,6.9,0,0,0,3.749-6.155v-.729A1.1,1.1,0,0,0,75.285,202.654Z" transform="translate(-63.988 -202.654)" fill="currentColor"/>
        </g>
      </g>
      <g id="Group_1395" data-name="Group 1395" transform="translate(0 209.942)">
        <g id="Group_1394" data-name="Group 1394" transform="translate(0)">
          <path id="Path_1763" data-name="Path 1763" d="M16.736,416.191a.365.365,0,0,0-.337-.225H.365a.365.365,0,0,0-.258.622l.817.818a2.536,2.536,0,0,0,1.8.747H14.035a2.54,2.54,0,0,0,1.805-.747l.817-.818A.364.364,0,0,0,16.736,416.191Zm-1.412.7a1.812,1.812,0,0,1-1.289.534H2.728a1.812,1.812,0,0,1-1.289-.534l-.2-.2H15.52Z" transform="translate(0 -415.966)" fill="currentColor"/>
        </g>
      </g>
      <g id="Group_1397" data-name="Group 1397" transform="translate(12.132 204.11)">
        <g id="Group_1396" data-name="Group 1396" transform="translate(0 0)">
          <path id="Path_1764" data-name="Path 1764" d="M359.749,245.537c-.982-.631-2.55.054-2.726.133a.365.365,0,1,0,.3.664c.351-.16,1.478-.538,2.029-.183a1.035,1.035,0,0,1,.37.945c0,1.459-2.943,2.341-4.08,2.558l-.258.051a.364.364,0,0,0,.07.722.336.336,0,0,0,.071-.007l.256-.05c.191-.036,4.67-.915,4.67-3.273A1.719,1.719,0,0,0,359.749,245.537Z" transform="translate(-355.093 -245.272)" fill="currentColor"/>
        </g>
      </g>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
