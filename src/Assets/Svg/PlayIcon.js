import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><defs><style>.a{fill:none;}.b{stroke:#fff;}.c{fill:currentColor;}.d{stroke:none;}</style></defs><g transform="translate(-30 -78)"><rect class="a" width="36" height="36" transform="translate(30 78)"/><g class="b" transform="translate(34 82)"><rect class="d" width="28" height="28" rx="14"/><rect class="a" x="0.5" y="0.5" width="27" height="27" rx="13.5"/></g><path class="c" d="M97.245,84a1.153,1.153,0,0,1-.571-.152,1.282,1.282,0,0,1-.635-1.119V73.27a1.281,1.281,0,0,1,.635-1.119,1.146,1.146,0,0,1,1.166.015L105.923,77a1.174,1.174,0,0,1,0,1.989L97.84,83.831A1.158,1.158,0,0,1,97.245,84Z" transform="translate(-52.126 18.002)"/></g></svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
