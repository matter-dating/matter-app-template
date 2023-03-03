import React from 'react';

import CustomToast from './widenn';
import colors from '../colors';

const WidenToast = (props) => {
  return <CustomToast {...props} color={colors.blazeOrange} />;
};

export default WidenToast;
