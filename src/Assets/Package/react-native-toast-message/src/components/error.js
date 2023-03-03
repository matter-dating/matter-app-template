import React from 'react';

import CustomToast from './custom';
import BaseToast from './base';
import { icons } from '../assets';
import colors from '../colors';

const ErrorToast = (props) => {
  return <CustomToast {...props} color={colors.blazeOrange} icon={icons.error_white} error={true} />;
};

export default ErrorToast;
