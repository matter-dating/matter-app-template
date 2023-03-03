import React from 'react';

import ImageToast from './image';
import colors from '../colors';

const LikeToast = (props) => {
  return <ImageToast {...props} color={colors.blazeOrange} like={true} />;
};

export default LikeToast;
