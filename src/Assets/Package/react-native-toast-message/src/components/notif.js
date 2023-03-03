import React from 'react';

import CustomToast from './custom';
import { icons } from '../assets';
import colors from '../colors';

const NotifToast = (props) => {
  return <CustomToast {...props} color={colors.blazeOrange} />;
};

export default NotifToast;
