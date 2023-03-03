import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 792 792" style="enable-background:new 0 0 792 792;" xml:space="preserve">
    <style type="text/css">
      .st0{fill:currentColor;}
    </style>
    <g>
      <g id="_x38_">
        <g>
          <path class="st0" d="M396,496c3.9,0.2,7.9-1.1,10.8-4.1l156-171.3c5.6-5.6,5.6-14.7,0-20.4c-5.6-5.6-14.7-5.6-20.2,0L396,461.2
            l-146.6-161c-5.6-5.6-14.7-5.6-20.2,0c-5.6,5.6-5.6,14.7,0,20.4l156,171.3C388.1,494.9,392.1,496.1,396,496z"/>
        </g>
      </g>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
