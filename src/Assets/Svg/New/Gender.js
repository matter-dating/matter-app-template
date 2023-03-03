import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20">
    <g id="Group_789" data-name="Group 789" transform="translate(-20 -547)">
      <circle id="Ellipse_309" data-name="Ellipse 309" cx="6" cy="6" r="6" transform="translate(20 555)" fill="#4c8af7"/>
      <circle id="Ellipse_310" data-name="Ellipse 310" cx="6" cy="6" r="6" transform="translate(30 555)" fill="#dd92de"/>
      <circle id="Ellipse_311" data-name="Ellipse 311" cx="6" cy="6" r="6" transform="translate(25 547)" fill="#e3df5c"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
