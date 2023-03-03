import React from 'react';

import CustomToast from './custom';
import { icons } from '../assets';
import colors from '../colors';

const AlertToast = (props) => {
  return <CustomToast {...props} color={colors.blazeOrange} icon={props.image} alert={true} />;
};

export default AlertToast;
