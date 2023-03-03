import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="13.088" height="14.805" viewBox="0 0 13.088 14.805">
  <path id="padlock" d="M14.452,5.552h-.545V3.7C13.907,1.66,11.95,0,9.544,0S5.181,1.66,5.181,3.7V5.552H4.636A1.529,1.529,0,0,0,3,6.94v6.477a1.529,1.529,0,0,0,1.636,1.388h9.816a1.529,1.529,0,0,0,1.636-1.388V6.94A1.529,1.529,0,0,0,14.452,5.552ZM6.636,3.7A2.718,2.718,0,0,1,9.544,1.234,2.718,2.718,0,0,1,12.452,3.7V5.552H6.636Zm3.636,6.614v1.405a.679.679,0,0,1-.727.617.679.679,0,0,1-.727-.617V10.316A1.212,1.212,0,0,1,8.09,9.253,1.359,1.359,0,0,1,9.544,8.02,1.359,1.359,0,0,1,11,9.253,1.212,1.212,0,0,1,10.271,10.316Z" transform="translate(-3)" fill="currentColor"/>
</svg>
`;

export default ({width, height, color}) => (
  <SvgCss xml={xml} width={width} height={height} color={color} />
);
