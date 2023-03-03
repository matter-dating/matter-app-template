import React from 'react';

import ImageToast from './image';
import colors from '../colors';

const MatchToast = (props) => {
  return <ImageToast {...props} color={colors.blazeOrange} match={true} />;
};

export default MatchToast;
