import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';

import SuccessToast from './components/success';
import ErrorToast from './components/error';
import InfoToast from './components/info';
import NotifToast from './components/notif';
import AlertToast from './components/alert';
import LikeToast from './components/like';
import MatchToast from './components/match';
import MessageToast from './components/message';
import ReviewToast from './components/review';
import WidenToast from './components/widen';
import { complement } from './utils/arr';
import { includeKeys } from './utils/obj';
import styles from './styles';

const FRICTION = 8;

const defaultComponentsConfig = {
  success: ({ hide, text1, text2 }) => (
    <SuccessToast onClose={hide} text1={text1} text2={text2} />
  ),
  error: ({ hide, text1, text2 }) => (
    <ErrorToast onClose={hide} text1={text1} text2={text2} />
  ),
  info: ({ hide, text1, text2 }) => (
    <InfoToast onClose={hide} text1={text1} text2={text2} />
  ),
  notif: ({ hide, text1, text2, image, onClick }) => (
    <NotifToast onClose={hide} onClick={onClick} text1={text1} text2={text2} />
  ),
  widen: ({ hide, text1, text2, image, onClick }) => (
    <WidenToast onClose={hide} onClick={onClick} text1={text1} text2={text2} />
  ),
  alert: ({ hide, text1, text2, image, onClick }) => (
    <AlertToast onClose={hide} onClick={onClick} text1={text1} text2={text2} />
  ),
  like: ({ hide, text, image, onClick }) => (
    <LikeToast onClose={hide} onClick={onClick} text={text} image={image} />
  ),
  match: ({ hide, text, image, image1, onClick }) => (
    <MatchToast onClose={hide} onClick={onClick} text={text} image={image} image1={image1} />
  ),
  message: ({ hide, text, image, onClick, textBody }) => (
    <MessageToast onClose={hide} onClick={onClick} text={text} image={image} textBody={textBody}/>
  ),
  review: ({ hide, text1, text2, onClick }) => (
    <ReviewToast onClose={hide} onClick={onClick} text1={text1} text2={text2}/>
  )
};

const getInitialState = (props) => {
  const {
    topOffset = 30,
    bottomOffset = 40,
    visibilityTime = 4000,
    onShow,
    onHide,
    onClick
  } = props;

  return {
    // layout
    topOffset,
    bottomOffset,
    height: 100,
    position: 'top',
    type: 'success',

    // timing (in ms)
    visibilityTime,
    autoHide: true,

    // content
    text: undefined,
    text1: undefined,
    text2: undefined,
    textBody: undefined,

    image: undefined,
    image1: undefined,

    onShow,
    onHide,
    onClick: undefined,
  };
};

class Toast extends Component {
  static _ref = null;

  static setRef(ref = {}) {
    this._ref = ref;
  }

  static getRef() {
    return this._ref;
  }

  static clearRef() {
    this._ref = null;
  }

  static show(options = {}) {
    this._ref.show(options);
  }

  static hide() {
    this._ref.hide();
  }

  constructor(props) {
    super(props);
    this._setState = this._setState.bind(this);
    this._animateMovement = this._animateMovement.bind(this);
    this._animateRelease = this._animateRelease.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.animate = this.animate.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.state = {
      ...getInitialState(props),

      inProgress: false,
      isVisible: false,
      animation: new Animated.Value(0)
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this._animateMovement(gesture);
      },
      onPanResponderRelease: (event, gesture) => {
        this._animateRelease(gesture);
      }
    });
  }

  _setState(reducer) {
    return new Promise((resolve) => this.setState(reducer, () => resolve()));
  }

  _animateMovement(gesture) {
    const { position, animation } = this.state;
    const { dy } = gesture;
    let value = 1 + dy / 100;

    if (position === 'bottom') {
      value = 1 - dy / 100;
    }

    if (value < 1) {
      animation.setValue(value);
    }
  }

  _animateRelease(gesture) {
    const { position, animation } = this.state;
    const { dy, vy } = gesture;
    let value = 1 + dy / 100;

    if (position === 'bottom') {
      value = 1 - dy / 100;
    }

    if (value < 0.65) {
      Animated.spring(animation, {
        toValue: -2,
        speed: position === 'bottom' ? vy : -vy,
        useNativeDriver: true
      }).start(() => {
        const { onHide } = this.state;
        if (onHide) {
          onHide();
        }
      });
    } else if (value < 0.95) {
      Animated.spring(animation, {
        toValue: 1,
        velocity: vy,
        useNativeDriver: true
      }).start();
    }
  }

  async show(options = {}) {
    const { inProgress, isVisible } = this.state;
    if (inProgress || isVisible) {
      await this.hide();
    }

    await this._setState((prevState) => ({
      ...prevState,
      ...getInitialState(this.props), // Reset layout
      /*
          Preserve the previously computed height (via onLayout).
          If the height of the component corresponding to this `show` call is different,
          onLayout will be called again and `height` state will adjust.

          This fixes an issue where a succession of calls to components with custom heights (custom Toast types)
          fails to hide them completely due to always resetting to the default component height
      */
      height: prevState.height,
      inProgress: true,
      ...options
    }));
    await this.animateShow();
    await this._setState((prevState) => ({
      ...prevState,
      isVisible: true,
      inProgress: false
    }));
    this.clearTimer();

    const { autoHide, onShow } = this.state;

    if (autoHide) {
      this.startTimer();
    }

    if (onShow) {
      onShow();
    }
  }

  async hide() {
    await this._setState((prevState) => ({
      ...prevState,
      inProgress: true
    }));
    await this.animateHide();
    this.clearTimer();
    await this._setState((prevState) => ({
      ...prevState,
      isVisible: false,
      inProgress: false
    }));

    const { onHide } = this.state;
    if (onHide) {
      onHide();
    }
  }

  animateShow() {
    return this.animate({ toValue: 1 });
  }

  animateHide() {
    return this.animate({ toValue: 0 });
  }

  animate({ toValue }) {
    const { animation } = this.state;
    return new Promise((resolve) => {
      Animated.spring(animation, {
        toValue,
        friction: FRICTION,
        useNativeDriver: true
      }).start(() => resolve());
    });
  }

  startTimer() {
    const { visibilityTime } = this.state;
    this.timer = setTimeout(() => this.hide(), visibilityTime);
  }

  clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  renderContent({ config }) {
    const componentsConfig = {
      ...defaultComponentsConfig,
      ...config
    };

    const { type } = this.state;
    const toastComponent = componentsConfig[type];

    if (!toastComponent) {
      console.error(
        `Type '${type}' does not exist. Make sure to add it to your 'config'. You can read the documentation here: https://github.com/calintamas/react-native-toast-message/blob/master/README.md`
      );
      return null;
    }

    return toastComponent({
      ...includeKeys({
        obj: this.state,
        keys: [
          'position',
          'type',
          'inProgress',
          'isVisible',
          'text',
          'text1',
          'text2',
          'textBody',
          'image',
          'image1',
          'onClick',
          'hide',
          'show'
        ]
      }),
      hide: this.hide,
      show: this.show, 
    });
  }

  getBaseStyle(position = 'bottom') {
    const { topOffset, bottomOffset, height, animation } = this.state;
    const offset = position === 'bottom' ? bottomOffset : topOffset;
    const range = [height, -offset];
    const outputRange = position === 'bottom' ? range : complement(range);

    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange
    });

    return [
      styles.base,
      styles[position],
      {
        transform: [{ translateY }]
      }
    ];
  }

  onLayout(e) {
    this.setState({ height: e.nativeEvent.layout.height });
  }

  render() {
    const { position } = this.state;
    const baseStyle = this.getBaseStyle(position);

    return (
      <Animated.View
        onLayout={this.onLayout}
        style={baseStyle}
        {...this.panResponder.panHandlers}>
        {this.renderContent(this.props)}
      </Animated.View>
    );
  }
}

export default Toast;
