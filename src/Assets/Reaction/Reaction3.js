import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20.104" height="20.103" viewBox="0 0 20.104 20.103">
    <g id="Group_1060" data-name="Group 1060" transform="translate(0)">
      <g id="Layer_2" data-name="Layer 2" transform="translate(0 0)">
        <g id="Filled">
          <g id="_39.Surprise" data-name="39.Surprise">
            <ellipse id="Background" cx="10.052" cy="10.051" rx="10.052" ry="10.051" fill="#ffe17d"/>
            <g id="Face" transform="translate(5.058 5.822)">
              <ellipse id="Mouth" cx="2.513" cy="2.544" rx="2.513" ry="2.544" transform="translate(2.133 4.963)" fill="#9c6846"/>
              <ellipse id="Ellipse_557" data-name="Ellipse 557" cx="1.272" cy="1.272" rx="1.272" ry="1.272" transform="translate(6.699)" fill="#9c6846"/>
              <ellipse id="Ellipse_558" data-name="Ellipse 558" cx="1.272" cy="1.272" rx="1.272" ry="1.272" fill="#9c6846"/>
            </g>
          </g>
        </g>
      </g>
      <path id="Path_1532" data-name="Path 1532" d="M11.537,73.8A10.073,10.073,0,0,1,3.721,57.376a10.074,10.074,0,1,0,14.171,14.17A10.032,10.032,0,0,1,11.537,73.8Z" transform="translate(0 -55.164)" fill="#ffd164"/>
    </g>
  </svg>
`;

export default ({width, height}) => (
  <SvgCss xml={xml} width={width} height={height} />
);
