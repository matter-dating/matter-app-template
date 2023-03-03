import * as React from 'react';
import {SvgCss} from 'react-native-svg';

const like = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="23.999" height="24" viewBox="0 0 23.999 24"><g transform="translate(0 0)"><path d="M1907-2058a11.921,11.921,0,0,1-8.485-3.515A11.921,11.921,0,0,1,1895-2070a11.922,11.922,0,0,1,3.514-8.485A11.922,11.922,0,0,1,1907-2082a11.921,11.921,0,0,1,8.485,3.514A11.921,11.921,0,0,1,1919-2070a11.921,11.921,0,0,1-3.515,8.485A11.921,11.921,0,0,1,1907-2058Zm-5.745-12.532a1.233,1.233,0,0,0-1,.508,1.324,1.324,0,0,0,.192,1.783l4.8,3.965a1.225,1.225,0,0,0,.778.278,1.247,1.247,0,0,0,1-.5l.008-.01.007-.009,6.719-9.415a1.326,1.326,0,0,0-.27-1.811,1.216,1.216,0,0,0-.742-.252,1.245,1.245,0,0,0-1.009.526l-5.942,8.331-3.777-3.123A1.219,1.219,0,0,0,1901.255-2070.533Z" transform="translate(-1895 2082)"/></g></svg>
`;

const liked = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"><defs><style>.a{fill:url(#a);}</style><linearGradient id="a" x1="1" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#fc0"/><stop offset="1" stop-color="#ff6d00"/></linearGradient></defs><path class="a" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.416.2l-.014-.011L5.764,13.769a1,1,0,0,1,1.25-1.562l4.076,3.261,6.227-8.451a1,1,0,1,1,1.665,1.109C18.964,8.152,18.946,8.176,18.927,8.2Z"/></svg>
`;

const empty = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="44" height="44" viewBox="0 0 44 44"><defs><style>.a{fill:none;}.b{fill:url(#a);}</style><linearGradient id="a" y1="1" x2="1" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#00ce28"/><stop offset="1" stop-color="#aefd5d"/></linearGradient></defs><g transform="translate(-286 -160)"><rect class="a" width="44" height="44" rx="22" transform="translate(286 160)"/><g transform="translate(286 160)"><path class="b" d="M22,0A22,22,0,1,0,44,22,22,22,0,0,0,22,0ZM34.7,15.033,22.15,32.063a1.854,1.854,0,0,1-2.6.365l-.026-.02-8.961-7.165a1.834,1.834,0,1,1,2.292-2.864l7.473,5.979L31.748,12.864A1.834,1.834,0,1,1,34.8,14.9C34.767,14.945,34.734,14.989,34.7,15.033Z"/></g></g></svg>
`;

export default ({width, height, color, active, green}) => {
  const text = active ? liked : like;
  const textLast = green ? empty : text;
  return <SvgCss xml={textLast} width={width} height={height} color={color} />;
};
