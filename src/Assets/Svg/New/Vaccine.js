import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
  <svg id="vaccine" xmlns="http://www.w3.org/2000/svg" width="32.142" height="32.142" viewBox="0 0 32.142 32.142">
    <path id="Path_1454" data-name="Path 1454" d="M78.748,122.085l-3.323-3.323a.838.838,0,0,1,0-1.185l16.311-16.311,4.508,4.508L79.933,122.085A.838.838,0,0,1,78.748,122.085Z" transform="translate(-70.46 -94.908)" fill="#dff6fd"/>
    <path id="Path_1455" data-name="Path 1455" d="M136.253,159.807l-16.312,16.312a.838.838,0,0,1-1.185,0l-.889-.889a.838.838,0,0,0,1.185,0l16.312-16.312Z" transform="translate(-110.469 -148.941)" fill="#c8effe"/>
    <path id="Path_1456" data-name="Path 1456" d="M85.358,279.2l-5.424,5.424a.838.838,0,0,1-1.185,0l-3.323-3.323a.838.838,0,0,1,0-1.185L80.85,274.7Z" transform="translate(-70.461 -257.452)" fill="#ee6161"/>
    <path id="Path_1457" data-name="Path 1457" d="M127.477,332.8l-5.424,5.424a.837.837,0,0,1-1.185,0l-.747-.747a.851.851,0,0,0,1-.152l5.443-5.443Z" transform="translate(-112.579 -311.048)" fill="#e94444"/>
    <g id="Group_932" data-name="Group 932" transform="translate(0 26.916)">
      <path id="Path_1458" data-name="Path 1458" d="M.478,433.986a.478.478,0,0,1-.338-.816l4.27-4.27a.478.478,0,0,1,.676.676l-4.27,4.27a.476.476,0,0,1-.338.14Z" transform="translate(0 -428.76)" fill="#7a8c98"/>
    </g>
    <path id="Path_1459" data-name="Path 1459" d="M59.709,390.721l-1.542-1.542a.664.664,0,0,1,0-.939l1.552-1.552,2.48,2.48-1.552,1.552A.664.664,0,0,1,59.709,390.721Z" transform="translate(-54.333 -362.413)" fill="#c5d3dd"/>
    <path id="Path_1460" data-name="Path 1460" d="M80.308,413.248,78.755,414.8a.665.665,0,0,1-.939,0l-.523-.523a.687.687,0,0,0,.451-.2l1.7-1.7Z" transform="translate(-72.441 -386.492)" fill="#b6c4cf"/>
    <path id="Path_1461" data-name="Path 1461" d="M0,0H2.041V20.217H0Z" transform="translate(27.756 2.939) rotate(45)" fill="#c5d3dd"/>
    <path id="Path_1462" data-name="Path 1462" d="M0,0H1.291V20.217H0Z" transform="translate(28.286 3.469) rotate(45)" fill="#b6c4cf"/>
    <path id="Path_1463" data-name="Path 1463" d="M0,0H6.376V2.179H0Z" transform="translate(11.931 15.701) rotate(45)" fill="#7a8c98"/>
    <path id="Path_1464" data-name="Path 1464" d="M0,0H1.251V2.179H0Z" transform="translate(15.554 19.324) rotate(45)" fill="#596c76"/>
    <path id="Path_1465" data-name="Path 1465" d="M424.483,5.63l-3.935-3.935a.405.405,0,0,1,0-.573l1-1a.405.405,0,0,1,.573,0l3.935,3.935a.405.405,0,0,1,0,.573l-1,1A.405.405,0,0,1,424.483,5.63Z" transform="translate(-394.036 0)" fill="#7a8c98"/>
    <path id="Path_1466" data-name="Path 1466" d="M475.233,53.659l-1,1a.406.406,0,0,1-.573,0l-.76-.76a.425.425,0,0,0,.4-.115l1.059-1.059a.424.424,0,0,0,.111-.412l.77.77A.405.405,0,0,1,475.233,53.659Z" transform="translate(-443.21 -49.032)" fill="#596c76"/>
    <path id="Path_1467" data-name="Path 1467" d="M339.206,78.021l-4.86-4.86a.405.405,0,0,1,0-.573l1-1a.405.405,0,0,1,.573,0l4.86,4.86a.405.405,0,0,1,0,.573l-1,1A.405.405,0,0,1,339.206,78.021Z" transform="translate(-313.246 -66.98)" fill="#7a8c98"/>
    <path id="Path_1468" data-name="Path 1468" d="M403.082,139.929l-1,1a.406.406,0,0,1-.573,0l-.806-.806a.417.417,0,0,0,.48-.079l1.035-1.035a.417.417,0,0,0,.1-.422l.765.765A.405.405,0,0,1,403.082,139.929Z" transform="translate(-375.545 -129.89)" fill="#596c76"/>
  </svg>

`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
