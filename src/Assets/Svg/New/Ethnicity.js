import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg id="worldwide" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="104" height="104" viewBox="0 0 104 104">
    <defs>
      <linearGradient id="linear-gradient" x1="0.258" y1="0.258" x2="0.864" y2="0.864" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#50bfe2"/>
        <stop offset="1" stop-color="#36a2c3"/>
      </linearGradient>
      <linearGradient id="linear-gradient-2" x1="0.576" y1="1.051" x2="0.396" y2="-0.246" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#18cffc" stop-opacity="0"/>
        <stop offset="1" stop-color="#80e1ff"/>
      </linearGradient>
      <linearGradient id="linear-gradient-3" x1="0.621" y1="0.621" x2="0.063" y2="0.063" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#18cffc" stop-opacity="0"/>
        <stop offset="1" stop-color="#65e1dc"/>
      </linearGradient>
    </defs>
    <circle id="Ellipse_231" data-name="Ellipse 231" cx="52" cy="52" r="52" fill="url(#linear-gradient)"/>
    <path id="Path_598" data-name="Path 598" d="M85.6,23.868a49.764,49.764,0,0,0-5.462-3.479,49.769,49.769,0,0,0-3.479-5.462C69.637,5.365,60.262.1,50.265.1s-19.372,5.267-26.4,14.83a49.75,49.75,0,0,0-3.479,5.462,49.786,49.786,0,0,0-5.462,3.479C5.365,30.893.1,40.268.1,50.265s5.267,19.372,14.83,26.4a49.75,49.75,0,0,0,5.462,3.479A49.788,49.788,0,0,0,23.868,85.6c7.025,9.563,16.4,14.83,26.4,14.83s19.372-5.267,26.4-14.83a49.75,49.75,0,0,0,3.479-5.462A49.794,49.794,0,0,0,85.6,76.662c9.563-7.025,14.83-16.4,14.83-26.4s-5.267-19.372-14.83-26.4Zm-35.338,74.2c-2.755,0-5.675-4.1-7.984-11.107a68.422,68.422,0,0,0,15.968,0C55.941,93.966,53.02,98.071,50.265,98.071Zm0-13a65.3,65.3,0,0,1-8.741-.585,108.973,108.973,0,0,1-3.369-19.532c3.914.28,7.974.424,12.11.424s8.2-.144,12.11-.424a108.977,108.977,0,0,1-3.369,19.532A65.3,65.3,0,0,1,50.265,85.069Zm0-82.609c2.755,0,5.675,4.1,7.984,11.107a68.422,68.422,0,0,0-15.968,0c2.309-7,5.229-11.107,7.984-11.107Zm0,13a65.3,65.3,0,0,1,8.741.585,108.977,108.977,0,0,1,3.369,19.532c-3.914-.28-7.974-.424-12.11-.424s-8.2.144-12.11.424a108.974,108.974,0,0,1,3.369-19.532A65.3,65.3,0,0,1,50.265,15.461Zm-12.749,34.8c0-4.211.152-8.337.444-12.3,3.967-.293,8.094-.444,12.3-.444s8.337.152,12.3.444c.293,3.967.444,8.094.444,12.3s-.152,8.337-.444,12.3c-3.967.293-8.094.444-12.3.444s-8.337-.152-12.3-.444C37.668,58.6,37.516,54.476,37.516,50.265Zm-1.938,12.11a108.973,108.973,0,0,1-19.532-3.369,65.585,65.585,0,0,1,0-17.482,108.974,108.974,0,0,1,19.532-3.369c-.28,3.914-.424,7.974-.424,12.11S35.3,58.462,35.578,62.375ZM64.952,38.155a108.976,108.976,0,0,1,19.532,3.369,65.585,65.585,0,0,1,0,17.482,108.976,108.976,0,0,1-19.532,3.369c.28-3.914.424-7.974.424-12.11S65.232,42.068,64.952,38.155Zm-.189-2.387a114.7,114.7,0,0,0-3.2-19.322A57.15,57.15,0,0,1,78.39,22.14a57.151,57.151,0,0,1,5.694,16.825A114.7,114.7,0,0,0,64.763,35.768Zm-29,0a114.7,114.7,0,0,0-19.322,3.2A57.149,57.149,0,0,1,22.14,22.14a57.151,57.151,0,0,1,16.825-5.694A114.744,114.744,0,0,0,35.767,35.768Zm-22.2,22.482c-7-2.309-11.107-5.229-11.107-7.984s4.1-5.675,11.107-7.984a68.42,68.42,0,0,0,0,15.968Zm22.2,6.514a114.7,114.7,0,0,0,3.2,19.322A57.148,57.148,0,0,1,22.14,78.39a57.15,57.15,0,0,1-5.694-16.825A114.73,114.73,0,0,0,35.767,64.763Zm29,0a114.7,114.7,0,0,0,19.322-3.2A57.151,57.151,0,0,1,78.39,78.39a57.15,57.15,0,0,1-16.825,5.694A114.7,114.7,0,0,0,64.763,64.763Zm22.2-22.482c7,2.309,11.107,5.229,11.107,7.984s-4.1,5.675-11.107,7.984a68.42,68.42,0,0,0,0-15.968Zm10.549,2.665c-2.311-1.97-5.974-3.742-10.906-5.258A60.746,60.746,0,0,0,82.1,24.325C90.175,29.583,95.79,36.8,97.513,44.947ZM76.206,18.431a60.745,60.745,0,0,0-15.364-4.507c-1.516-4.932-3.287-8.6-5.258-10.906,8.144,1.722,15.364,7.338,20.622,15.413ZM44.947,3.017c-1.97,2.311-3.742,5.974-5.258,10.906A60.746,60.746,0,0,0,24.325,18.43C29.583,10.356,36.8,4.74,44.947,3.017ZM18.43,24.325a60.746,60.746,0,0,0-4.507,15.364c-4.932,1.516-8.6,3.287-10.906,5.258C4.74,36.8,10.356,29.583,18.43,24.325ZM3.017,55.584c2.311,1.97,5.974,3.742,10.906,5.258A60.746,60.746,0,0,0,18.43,76.206C10.356,70.947,4.74,63.727,3.017,55.584ZM24.325,82.1a60.746,60.746,0,0,0,15.364,4.507c1.516,4.932,3.287,8.6,5.258,10.906C36.8,95.79,29.583,90.175,24.325,82.1ZM55.584,97.513c1.971-2.311,3.742-5.974,5.258-10.906A60.745,60.745,0,0,0,76.206,82.1c-5.258,8.075-12.478,13.69-20.622,15.413ZM82.1,76.205a60.743,60.743,0,0,0,4.507-15.364c4.932-1.516,8.6-3.287,10.906-5.258C95.79,63.727,90.175,70.947,82.1,76.205Z" transform="translate(-0.079 -0.079)" fill="url(#linear-gradient-2)"/>
    <circle id="Ellipse_232" data-name="Ellipse 232" cx="44.797" cy="44.797" r="44.797" transform="translate(5.389 5.389)" fill="url(#linear-gradient-3)"/>
    <path id="Path_600" data-name="Path 600" d="M158.816,245.245l1.943,1.943a3.79,3.79,0,0,1,1.11,2.68,3.79,3.79,0,0,0,3.789,3.79,3.952,3.952,0,0,1,3.952,3.952,20.4,20.4,0,0,1-1.739,8.241l-7,15.842a3.373,3.373,0,0,1-5.471,1.022,13.028,13.028,0,0,1-3.816-9.212v-1.843a18.114,18.114,0,0,0-5.305-12.808l-.207-.207a17.045,17.045,0,0,1-4.993-12.053v-.66a5.678,5.678,0,0,1,5.678-5.678A17.047,17.047,0,0,1,158.816,245.245Z" transform="translate(-113.319 -192.972)" fill="#5cf8ab"/>
    <path id="Path_602" data-name="Path 602" d="M47.626,14.349A50.352,50.352,0,0,0,19.286,40.5a10.9,10.9,0,0,0-.986,4.566,11.061,11.061,0,0,0,3.24,7.821l1.026,1.026A24.512,24.512,0,0,0,39.9,61.1a1.758,1.758,0,1,0,0-3.517H34.492a4.514,4.514,0,1,1,0-9.028h4.222a19.088,19.088,0,0,0,13.5-5.591l6.519-6.519a7.569,7.569,0,0,1,5.352-2.217A7.569,7.569,0,0,0,70.9,29.95a4.826,4.826,0,0,0-4.346-6.926H58.141a4.477,4.477,0,0,1-4.477-4.477A4.483,4.483,0,0,0,47.626,14.349Z" transform="translate(-14.698 -11.3)" fill="#5cf8ab"/>
    <path id="Path_603" data-name="Path 603" d="M77.67,39.525H69.259a4.477,4.477,0,0,1-4.477-4.477c0-.147-.009-.291-.022-.433A44.865,44.865,0,0,0,32.142,68.837c.166.19.336.377.515.556l1.026,1.026A24.512,24.512,0,0,0,51.015,77.6a1.758,1.758,0,1,0,0-3.517H45.61a4.514,4.514,0,1,1,0-9.028h4.222a19.088,19.088,0,0,0,13.5-5.591l6.519-6.519A7.569,7.569,0,0,1,75.2,50.727a7.569,7.569,0,0,0,6.815-4.276A4.826,4.826,0,0,0,77.67,39.525Z" transform="translate(-25.816 -27.801)" fill="#5cf8ab"/>
    <path id="Path_604" data-name="Path 604" d="M384.732,178.068a6.9,6.9,0,0,0-6.747-5.388H367.129a11.639,11.639,0,0,0-11.639,11.639v1.416a10.223,10.223,0,0,0,10.223,10.223,5.2,5.2,0,0,1,5.2,5.2V214.73a3.585,3.585,0,0,0,6.558,2.005,49.888,49.888,0,0,0,7.938-20.777,50.736,50.736,0,0,0-.674-17.89Z" transform="translate(-285.528 -138.696)" fill="#5cf8ab"/>
    <path id="Path_605" data-name="Path 605" d="M401.627,100.3H386.635a4.856,4.856,0,0,1,0-9.711h8.558A50.2,50.2,0,0,1,401.627,100.3Z" transform="translate(-306.644 -72.761)" fill="#5cf8ab"/>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);