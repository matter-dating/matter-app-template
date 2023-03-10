import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
    <style type="text/css">
      .st0{fill-rule:evenodd;clip-rule:evenodd;fill:currentColor;}
    </style>
    <path class="st0" d="M48.6,94.3l-6.8,3.1c-3,1.3-6.5,0.4-8.4-2.2L29,89.1c-0.6-0.8-1.5-1.3-2.4-1.4l-7.4-0.8
      c-3.2-0.3-5.8-2.9-6.1-6.1l-0.8-7.4c-0.1-1-0.6-1.9-1.4-2.4l-6.1-4.4c-2.6-1.9-3.6-5.4-2.2-8.4l3.1-6.8c0.4-0.9,0.4-1.9,0-2.8
      l-3.1-6.8c-1.3-3-0.4-6.5,2.2-8.4l6.1-4.4c0.8-0.6,1.3-1.5,1.4-2.4l0.8-7.4c0.3-3.2,2.9-5.8,6.1-6.1l7.4-0.8c1-0.1,1.9-0.6,2.4-1.4
      l4.4-6.1c1.9-2.6,5.4-3.6,8.4-2.2l6.8,3.1c0.9,0.4,1.9,0.4,2.8,0l6.8-3.1c3-1.3,6.5-0.4,8.4,2.2l4.4,6.1c0.6,0.8,1.5,1.3,2.4,1.4
      l7.4,0.8c3.2,0.3,5.8,2.9,6.1,6.1l0.8,7.4c0.1,1,0.6,1.9,1.4,2.4l6.1,4.4c2.6,1.9,3.6,5.4,2.2,8.4l-3.1,6.8c-0.4,0.9-0.4,1.9,0,2.8
      l3.1,6.8c1.3,3,0.4,6.5-2.2,8.4L89.1,71c-0.8,0.6-1.3,1.5-1.4,2.4l-0.8,7.4c-0.3,3.2-2.9,5.8-6.1,6.1l-7.4,0.8
      c-1,0.1-1.9,0.6-2.4,1.4l-4.4,6.1c-1.9,2.6-5.4,3.6-8.4,2.2l-6.8-3.1C50.5,93.9,49.5,93.9,48.6,94.3z M31.5,43.5l-5.8,5.8l19.5,19.5
      l30-30l-5.8-5.8L45.2,57.2L31.5,43.5z"/>
  </svg>


`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
