import React from 'react';

import CustomToast from './voice';
import colors from '../colors';

const ReviewToast = (props) => {
  return <CustomToast {...props} color={colors.blazeOrange} />;
};

export default ReviewToast;
