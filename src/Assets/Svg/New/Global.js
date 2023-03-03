import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" viewBox="0 0 15 15">
    <defs>
      <linearGradient id="linear-gradient" x1="-0.024" y1="0.5" x2="0.989" y2="0.5" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#00c4ff"/>
        <stop offset="1" stop-color="#07a1cf"/>
      </linearGradient>
      <linearGradient id="linear-gradient-2" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#49c1e5"/>
        <stop offset="1" stop-color="#2a67cb"/>
      </linearGradient>
      <linearGradient id="linear-gradient-3" x1="-0.024" y1="0.5" x2="0.989" y2="0.5" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#b0e7c9"/>
        <stop offset="0.593" stop-color="#46cc8d"/>
        <stop offset="1" stop-color="#0ab69f"/>
      </linearGradient>
      <linearGradient id="linear-gradient-4" x1="-0.081" y1="0.5" x2="0.91" y2="0.5" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#46cc8d"/>
        <stop offset="0.548" stop-color="#0ab69f"/>
        <stop offset="1" stop-color="#01998d"/>
      </linearGradient>
      <linearGradient id="linear-gradient-5" x1="-0.066" x2="0.966" xlink:href="#linear-gradient-3">
        <stop offset="0" stop-color="#00c4ff"/>
        <stop offset="1" stop-color="#07a1cf"/>
      </linearGradient>
      <linearGradient id="linear-gradient-6" x1="-0.066" y1="0.5" x2="0.966" y2="0.5" xlink:href="#linear-gradient-4">
        <stop offset="0" stop-color="#00c4ff"/>
        <stop offset="1" stop-color="#07a1cf"/>
      </linearGradient>
      <linearGradient id="linear-gradient-7" x1="0.16" y1="0.5" x2="1.284" y2="0.5" xlink:href="#linear-gradient-4">
        <stop offset="0" stop-color="#00c4ff"/>
        <stop offset="1" stop-color="#07a1cf"/>
      </linearGradient>
      <linearGradient id="linear-gradient-8" x1="-0.138" x2="1.209" xlink:href="#linear-gradient-3">
        <stop offset="0" stop-color="#00c4ff"/>
        <stop offset="1" stop-color="#07a1cf"/>
      </linearGradient>
      <linearGradient id="linear-gradient-9" x1="-0.16" x2="0.833" xlink:href="#linear-gradient-3">
        <stop offset="0" stop-color="#00c4ff"/>
        <stop offset="1" stop-color="#07a1cf"/>
      </linearGradient>
      <linearGradient id="linear-gradient-10" x1="-0.16" y1="0.5" x2="0.833" y2="0.5" xlink:href="#linear-gradient-4">
        <stop offset="0" stop-color="#00c4ff"/>
        <stop offset="1" stop-color="#07a1cf"/>
      </linearGradient>
      <linearGradient id="linear-gradient-11" x1="-0.024" y1="0.5" x2="0.97" y2="0.5" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#fff9df"/>
        <stop offset="0.593" stop-color="#ffe177"/>
        <stop offset="1" stop-color="#feb137"/>
      </linearGradient>
    </defs>
    <g id="world" transform="translate(0 0)">
      <g id="Group_792" data-name="Group 792" transform="translate(0 0)">
        <g id="Group_791" data-name="Group 791" transform="translate(0 0)">
          <g id="Group_790" data-name="Group 790">
            <path id="Path_1234" data-name="Path 1234" d="M14.884,7.5A7.41,7.41,0,0,1,4.066,14.169a7.6,7.6,0,0,1-2.6-2.529A7.019,7.019,0,0,1,.211,9.273,7.507,7.507,0,0,1,7.5,0C10.714.021,14.884,3.358,14.884,7.5Z" transform="translate(0)" fill="url(#linear-gradient)"/>
          </g>
        </g>
        <path id="Path_1235" data-name="Path 1235" d="M126.121,0q-.3,0-.592.023a7.539,7.539,0,0,1,6.484,4.883l0,.006a20.736,20.736,0,0,1-3.7,4.771,20.827,20.827,0,0,1-4.8,3.676,6.918,6.918,0,0,1-1.325.545,7.516,7.516,0,0,0,2.1.874,22.505,22.505,0,0,0,5.169-3.953,25.555,25.555,0,0,0,3.01-3.562c0,.079,0,.159,0,.238a7.516,7.516,0,0,1-6.947,7.477q.293.023.592.023a7.533,7.533,0,0,0,5.035-1.918,7.59,7.59,0,0,0,1.24-1.531,7.306,7.306,0,0,0,.98-2.007,7.483,7.483,0,0,0-1.564-6.962A7.675,7.675,0,0,0,129.569.963,7.255,7.255,0,0,0,126.121,0Z" transform="translate(-118.66 0)" fill="url(#linear-gradient-2)"/>
        <path id="Path_1236" data-name="Path 1236" d="M9.64,219.9l-.485-.485A2.294,2.294,0,0,0,5.3,221.574a7.388,7.388,0,0,0,3.27,4.484,2.114,2.114,0,0,0,2.613-.3,1.921,1.921,0,0,1,1.358-.563,1.143,1.143,0,0,0,1.143-1.143,1.853,1.853,0,0,0-1.853-1.853h-.45a1.351,1.351,0,0,1-1.351-1.351A1.351,1.351,0,0,0,9.64,219.9Z" transform="translate(-5.087 -212.166)" fill="url(#linear-gradient-3)"/>
        <path id="Path_1237" data-name="Path 1237" d="M124.815,371.09a1.921,1.921,0,0,1,1.358-.563,1.143,1.143,0,0,0,1.143-1.143,1.844,1.844,0,0,0-.284-.986,18.2,18.2,0,0,1-3.487,2.482,6.752,6.752,0,0,1-1.295.535A2.114,2.114,0,0,0,124.815,371.09Z" transform="translate(-118.625 -357.494)" fill="url(#linear-gradient-4)"/>
        <path id="Path_1238" data-name="Path 1238" d="M206.24,6.741A2.021,2.021,0,0,0,208,3.722,7.373,7.373,0,0,0,201.591,0h-.069a1.534,1.534,0,0,0-1.073,2.619l1.37,1.37a.957.957,0,0,0,1.354,0,.957.957,0,0,1,1.354,0,2.947,2.947,0,0,1,.863,2.084.668.668,0,0,0,.668.668h.183Z" transform="translate(-193.968 0)" fill="url(#linear-gradient-5)"/>
        <path id="Path_1239" data-name="Path 1239" d="M241.24.039A7.383,7.383,0,0,1,247.4,4.826l0,.005a15,15,0,0,1-1.207,1.909h.094a2.021,2.021,0,0,0,1.759-3.019A7.373,7.373,0,0,0,241.638,0h-.084a1.542,1.542,0,0,0-.314.038Z" transform="translate(-234.015 0)" fill="url(#linear-gradient-6)"/>
        <circle id="Ellipse_312" data-name="Ellipse 312" cx="1.128" cy="1.128" r="1.128" transform="translate(8.543 5.554)" fill="url(#linear-gradient-7)"/>
        <circle id="Ellipse_313" data-name="Ellipse 313" cx="0.93" cy="0.93" r="0.93" transform="translate(1.24 4.068)" fill="url(#linear-gradient-8)"/>
        <path id="Path_1240" data-name="Path 1240" d="M365.238,324.5h-.789a3.257,3.257,0,0,0-2.3.954l-.789.789a.5.5,0,0,0,.351.847.509.509,0,0,1,.509.509.509.509,0,0,0,.848.381A7.377,7.377,0,0,0,365.238,324.5Z" transform="translate(-350.516 -314.866)" fill="url(#linear-gradient-9)"/>
        <path id="Path_1241" data-name="Path 1241" d="M398.429,324.5a3.249,3.249,0,0,0-.375.022,7.37,7.37,0,0,1-1.85,3.157.509.509,0,0,0,.842.3,7.376,7.376,0,0,0,2.173-3.48h-.789Z" transform="translate(-384.496 -314.866)" fill="url(#linear-gradient-10)"/>
      </g>
      <path id="Path_1242" data-name="Path 1242" d="M20.122,6.545c-.514-.514-1.545-.9-3.572.009a7.485,7.485,0,0,1,1.7,1.115,2.088,2.088,0,0,1,.418-.049.871.871,0,0,1,.212.022.22.22,0,0,1,.1.044c.047.047.113.267.018.727a6.136,6.136,0,0,1-.6,1.536,20.734,20.734,0,0,1-3.678,4.773A20.741,20.741,0,0,1,9.949,18.4a6.137,6.137,0,0,1-1.536.6c-.46.1-.68.029-.727-.018s-.113-.267-.018-.727a7.486,7.486,0,0,1-1.115-1.7c-.907,2.026-.523,3.057-.009,3.572a1.952,1.952,0,0,0,1.444.538,5.316,5.316,0,0,0,2.127-.547q.277-.124.58-.281a22.358,22.358,0,0,0,5.169-3.968A22.359,22.359,0,0,0,19.832,10.7q.157-.3.281-.579a5.317,5.317,0,0,0,.547-2.128,1.95,1.95,0,0,0-.538-1.444Z" transform="translate(-5.833 -5.834)" fill="url(#linear-gradient-11)"/>
    </g>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
