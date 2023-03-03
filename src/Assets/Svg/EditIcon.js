import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg version="1.1"
    id="Layer_1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100"
    style="enable-background:new 0 0 100 100;" xml:space="preserve">
    <style type="text/css">
      .st0{fill:currentColor}
    </style>
    <g transform="translate(0,-952.36218)">
      <path class="st0" d="M59.2,962.4c-1,0.1-1.8,0.6-2.3,1.5l-34,59.5c-0.3,0.5-0.4,1.2-0.4,1.8l1.8,14.6c0.2,1.6,1.7,2.8,3.3,2.5
        c0.3,0,0.5-0.1,0.8-0.2l13.4-5.8c0.6-0.2,1.1-0.7,1.4-1.2l34-59.5c0.8-1.4,0.3-3.2-1.1-4c0,0,0,0,0,0l-15.1-8.8
        C60.4,962.5,59.8,962.3,59.2,962.4L59.2,962.4z M60.5,969.3l10.1,5.9l-1,1.7L59.5,971C59.5,971,60.5,969.3,60.5,969.3z M56.6,976.1
        l10.1,5.9l-28.2,49.3l-8.9,3.9l-1.2-9.8L56.6,976.1L56.6,976.1z"/>
    </g>
  </svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
