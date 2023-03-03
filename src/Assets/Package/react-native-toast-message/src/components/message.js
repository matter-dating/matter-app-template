import React from 'react';

import ImageToast from './image';
import colors from '../colors';

const MessageToast = (props) => {
  return <ImageToast {...props} color={colors.blazeOrange} match={true} message={true}/>;
};

export default MessageToast;
