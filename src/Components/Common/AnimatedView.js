import React, {FunctionComponent, useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';

const AnimatedView: FunctionComponent = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    if (props.deleted) {
      ref.current
        .animate(
          {
            0: {opacity: 1, height: 80, transform: [{translateX: 0}]},
            1: {opacity: 0, height: 0, transform: [{translateX: -200}]},
          },
          300,
        )
        .then((endState) => endState.finished && props.endSate(props.index));
    }
    if (props.added) {
      props.endSate(props.index);
      ref.current.animate(
        {
          0: {transform: [{translateY: 150}]},
          1: {transform: [{translateY: 0}]},
        },
        500,
      );
    }
  }, [props]);

  return <Animatable.View ref={ref}>{props.children}</Animatable.View>;
};

export default AnimatedView;
