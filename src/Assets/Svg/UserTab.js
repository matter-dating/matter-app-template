import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
	<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
	<style type="text/css">
		.st0{fill:currentColor}
	</style>
	<g>
		<g>
			<path class="st0" d="M51.2,47.2c18,0,32.7,14.7,32.7,32.7c0,4.6-3.8,8.4-8.4,8.4H22.1c-3.3,0-6-2.7-6-6
				C16.1,63,31.9,47.2,51.2,47.2 M51.2,38.6L51.2,38.6c-24.1,0-43.7,19.6-43.7,43.7l0,0c0,8.1,6.5,14.6,14.6,14.6h53.4
				c9.4,0,17-7.6,17-17l0,0C92.5,57.1,74,38.6,51.2,38.6L51.2,38.6z"/>
		</g>
		<g>
			<path class="st0" d="M50,11.5c4.5,0,8.1,3.7,8.1,8.1s-3.7,8.1-8.1,8.1s-8.1-3.7-8.1-8.1S45.5,11.5,50,11.5 M50,2.9
				c-9.3,0-16.7,7.5-16.7,16.7S40.8,36.4,50,36.4s16.7-7.5,16.7-16.7S59.3,2.9,50,2.9L50,2.9z"/>
		</g>
		<circle class="st0" cx="50" cy="19.9" r="11.8"/>
		<path class="st0" d="M45.6,45.1h8.1c18.2,0,32.9,14.7,32.9,32.9v0c0,7.1-5.7,12.8-12.8,12.8H25.4c-7.1,0-12.8-5.7-12.8-12.8v0
			C12.6,59.9,27.4,45.1,45.6,45.1z"/>
	</g>
	</svg>

`;
const aml = `
	<?xml version="1.0" encoding="utf-8"?>
	<!-- Generator: Adobe Illustrator 25.2.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
	<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
	<style type="text/css">
		.st0{fill:currentColor;}
	</style>
	<g>
		<path class="st0" d="M51.2,47.2c18,0,32.7,14.7,32.7,32.7c0,4.6-3.8,8.4-8.4,8.4H22.1c-3.3,0-6-2.7-6-6
			C16.1,63,31.9,47.2,51.2,47.2 M51.2,38.6L51.2,38.6c-24.1,0-43.7,19.6-43.7,43.7v0c0,8.1,6.5,14.6,14.6,14.6h53.4
			c9.4,0,17-7.6,17-17v0C92.5,57.1,74,38.6,51.2,38.6L51.2,38.6z"/>
	</g>
	<g>
		<path class="st0" d="M50,11.5c4.5,0,8.1,3.7,8.1,8.1s-3.7,8.1-8.1,8.1s-8.1-3.7-8.1-8.1S45.5,11.5,50,11.5 M50,2.9
			c-9.3,0-16.7,7.5-16.7,16.7S40.8,36.4,50,36.4s16.7-7.5,16.7-16.7S59.3,2.9,50,2.9L50,2.9z"/>
	</g>
	</svg>

`;

export default ({width, height, color, active}) => (
  <SvgCss
    xml={active ? xml : aml}
    width={width}
    height={height}
    color={color}
  />
);
