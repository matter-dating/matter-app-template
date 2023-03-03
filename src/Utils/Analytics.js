import {Amplitude, Identify} from '@amplitude/react-native';
import {amplitude_key} from './EnvironmentVariables';
import dayjs from 'dayjs';

// Analytics framework start
export const initAnalytics = () => {
  const ampInstance = Amplitude.getInstance();
  ampInstance.init(amplitude_key);
};

// AMPLITUDE PROPERTIES

export const setAmplitudeUserProperty = (
  user_id,
  date_of_birth,
  gender,
  interest,
) => {
  Amplitude.getInstance().setUserId(user_id);
  Amplitude.getInstance().setUserProperties({
    v1_age: dayjs().diff(dayjs(date_of_birth), 'year'),
    v1_gender: gender,
    v1_interest: interest,
  });
};

export const updateAmplitudeUserProperty = (name, count) => {
  const identify = new Identify();
  identify.add(name, count);
  Amplitude.getInstance().identify(identify);
};

////////////////////////////////////
/////////V2 US LAUNCH///////////////
////////////////////////////////////

//GENERAL LOGS

export const logScreenPresent = (screen_name) => {
  Amplitude.getInstance().logEvent('V2_SCREEN_PRESENT_' + screen_name);
};

// ONBOARDING LOGS

export const logClickRegister = () => {
  Amplitude.getInstance().logEvent('V2_CLICK_REGISTER');
};

export const logClickLogin = () => {
  Amplitude.getInstance().logEvent('V2_CLICK_LOGIN');
};

export const logSetupPhone = () => {
  Amplitude.getInstance().logEvent('V2_SETUP_PHONE');
};

export const logVerifyPhone = () => {
  Amplitude.getInstance().logEvent('V2_VERIFY_PHONE');
};

export const logOnboardStart = () => {
  Amplitude.getInstance().logEvent('V2_ONBOARD_START');
};

export const logLogin = () => {
  Amplitude.getInstance().logEvent('V2_LOGGED_IN');
};

export const logProfileSetup = () => {
  Amplitude.getInstance().logEvent('V2_PROFILE_SETUP');
};

export const logLocationPermission = (permission_type) => {
  Amplitude.getInstance().logEvent('V2_LOCATION_PERMISSION', {permission_type});
};

export const logNotificationPermission = (permission_type) => {
  Amplitude.getInstance().logEvent('V2_NOTIFICATION_PERMISSION', {
    permission_type,
  });
};

export const logActiveRegistration = () => {
  Amplitude.getInstance().logEvent('V2_ACTIVE_REGISTRATION');
};

export const logWaitlistRegistration = () => {
  Amplitude.getInstance().logEvent('V2_WAITLIST_REGISTRATION');
};

export const logClickWaitlistAbout = () => {
  Amplitude.getInstance().logEvent('V2_CLICK_WAITLIST_ABOUT');
};

export const logPhotoPermissionDenied = () => {
  Amplitude.getInstance().logEvent('V2_PHOTO_PERMISSION_DENIED');
};

export const logPhotoUpload = (number_of_pics) => {
  Amplitude.getInstance().logEvent('V2_PHOTO_UPLOAD', {number_of_pics});
};

export const logPhotoVerify = (action) => {
  Amplitude.getInstance().logEvent('V2_PHOTO_VERIFY', {action});
};

export const logUserInfoSelected = (selected_items) => {
  Amplitude.getInstance().logEvent('V2_USER_INFO_SELECTED', {selected_items});
};

export const logCardsSelected = (selected_items) => {
  Amplitude.getInstance().logEvent('V2_CARDS_SELECTED', {selected_items});
};

export const logOnboardVoiceIntro = (action) => {
  Amplitude.getInstance().logEvent('V2_ONBOARD_VOICE_INTRO', {action});
};

export const logOnboardEnded = () => {
  Amplitude.getInstance().logEvent('V2_ONBOARD_ENDED');
};

// VOICE INTRO
export const logClickTips = () => {
  Amplitude.getInstance().logEvent('V2_VOICE_INTRO_TIPS_CLICKED');
};

export const logSelectedTip = (tip) => {
  Amplitude.getInstance().logEvent('V2_VOICE_INTRO_TIPS_SELECTED', {tip});
};

export const logVoiceIntroAdded = () => {
  Amplitude.getInstance().logEvent('V2_VOICE_INTRO_ADDED');
};

export const logVoiceIntroUpdated = () => {
  Amplitude.getInstance().logEvent('V2_VOICE_INTRO_UPDATED');
};

export const logVoiceIntroDeleted = () => {
  Amplitude.getInstance().logEvent('V2_VOICE_INTRO_DELETED');
};

// EXPLORE TAB LOGs

export const logReject = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_REJECT', {other_user_id});
};

export const logSendLike = (other_user_id, with_sound) => {
  Amplitude.getInstance().logEvent('V2_LIKE', {other_user_id, with_sound});
};

export const logAppMatch = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_APP_MATCH', {other_user_id});
};

export const logReport = (other_user_id, reason) => {
  Amplitude.getInstance().logEvent('V2_REPORT', {other_user_id, reason});
};

export const logBlock = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_BLOCK', {other_user_id});
};

export const logUnmatch = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_UNMATCH', {other_user_id});
};

export const logPlayVoiceIntro = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_PLAY_VOICE_INTRO', {other_user_id});
};

export const logClickListenAll = () => {
  Amplitude.getInstance().logEvent('V2_CLICK_LISTEN_ALL');
};

export const logClickProfile = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_CLICK_PROFILE', {other_user_id});
};

export const logSeekNext = () => {
  Amplitude.getInstance().logEvent('V2_SEEK_NEXT');
};

export const logSeekPrevious = () => {
  Amplitude.getInstance().logEvent('V2_SEEK_PREVIOUS');
};

export const logProfilePresent = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_PROFILE_PRESENTED', {other_user_id});
};

// HAPPY TAB LOGs
export const logHappyHourTips = () => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_TIPS');
};

export const logJoinHappyHour = (blind_date_group_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_JOIN', {blind_date_group_id});
};

export const logLeaveHappyHour = (blind_date_group_id, talking) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_LEAVE', {
    blind_date_group_id,
    talking,
  });
};

export const logMatchServerHappyHour = (blind_date_group_id, other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_MATCH_SERVER', {
    blind_date_group_id,
    other_user_id,
  });
};

export const logStartHappyHour = (blind_date_group_id, other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_START', {
    blind_date_group_id,
    other_user_id,
  });
};

export const logEndHappyHour = (blind_date_group_id, other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_END', {
    blind_date_group_id,
    other_user_id,
  });
};

export const logEndPrematureHappyHour = (
  blind_date_group_id,
  other_user_id,
) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_PREMATURE_END', {
    blind_date_group_id,
    other_user_id,
  });
};

export const logLikeHappyHour = (blind_date_group_id, other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_LIKE', {
    blind_date_group_id,
    other_user_id,
  });
};

export const logRejectHappyHour = (blind_date_group_id, other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_REJECT', {
    blind_date_group_id,
    other_user_id,
  });
};

export const logMatchHappyHour = (blind_date_group_id, other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_MATCH', {
    blind_date_group_id,
    other_user_id,
  });
};

export const logReportHappyHour = (other_user_id, reason) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_REPORT', {
    other_user_id,
    reason,
  });
};

export const logBlockHappyHour = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_BLOCK', {other_user_id});
};

export const logExtendRequestHappyHour = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_EXTEND_REQUEST', {
    other_user_id,
  });
};

export const logExtendAcceptHappyHour = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_EXTEND_ACCEPT', {
    other_user_id,
  });
};

export const logExtendRejectHappyHour = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_EXTEND_REJECT', {
    other_user_id,
  });
};

export const logHappyHourPending = (blind_date_group_id, other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_PENDING', {
    blind_date_group_id,
    other_user_id,
  });
};

export const logHappyHourDecline = (blind_date_group_id, other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_KINDLY_DECLINE', {
    blind_date_group_id,
    other_user_id,
  });
};

export const logHappyHourAccept = (blind_date_group_id, other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_YES_WAITING', {
    blind_date_group_id,
    other_user_id,
  });
};

export const logHappyHourExpire = (blind_date_group_id, other_user_id) => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_EXPIRE', {
    blind_date_group_id,
    other_user_id,
  });
};

//Modal

export const logHappyHourModalDismiss = () => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_MODAL_DISMISS');
};

export const logHappyHourModalJoin = () => {
  Amplitude.getInstance().logEvent('V2_HAPPY_HOUR_MODAL_JOIN_NOW');
};

// CHAT TAB LOGs

export const logSendVoice = (pubnub_room_id, url, duration) => {
  Amplitude.getInstance().logEvent('V2_SEND_VOICE', {
    pubnub_room_id,
    url,
    duration,
  });
};

export const logUnlockText = (pubnub_room_id) => {
  Amplitude.getInstance().logEvent('V2_UNLOCK_TEXT', {pubnub_room_id});
};

export const logSendText = (pubnub_room_id, msg) => {
  Amplitude.getInstance().logEvent('V2_SEND_TEXT', {pubnub_room_id, msg});
};

export const logSendExpression = (pubnub_room_id, expression) => {
  Amplitude.getInstance().logEvent('V2_SEND_EXPRESSION', {
    pubnub_room_id,
    expression,
  });
};

export const logViewProfile = (other_user_id) => {
  Amplitude.getInstance().logEvent('V2_VIEW_PROFILE', {other_user_id});
};

export const logCreateRoom = (pubnub_room_id) => {
  Amplitude.getInstance().logEvent('V2_CREATE_ROOM', {pubnub_room_id});
};

export const logJoinRoom = (pubnub_room_id) => {
  Amplitude.getInstance().logEvent('V2_JOIN_ROOM', {pubnub_room_id});
};

export const logPlayVoice = (pubnub_room_id) => {
  Amplitude.getInstance().logEvent('V2_PLAY_VOICE', {pubnub_room_id});
};

export const logLikeCount = (count) => {
  Amplitude.getInstance().logEvent('V2_CLIKED_LIKED_YOU', {count});
};

//PROFILE TAB LOGs

export const logDeleteAccount = () => {
  Amplitude.getInstance().logEvent('V2_DELETE_ACCOUNT');
};

export const logLogout = () => {
  Amplitude.getInstance().logEvent('V2_LOGOUT');
};

//PREMIUM LOGs
export const logPremiumFromHome = () => {
  Amplitude.getInstance().logEvent('V2_CLICK_PREMIUM_HOME');
};

export const logClickWeekly = () => {
  Amplitude.getInstance().logEvent('V2_CLICK_PREMIUM_WEEKLY');
};

export const logClickMonthly = () => {
  Amplitude.getInstance().logEvent('V2_CLICK_PREMIUM_MONTHLY');
};

export const logClickQuarterly = () => {
  Amplitude.getInstance().logEvent('V2_CLICK_PREMIUM_QUARTERLY');
};

export const logSuccessfulPurchase = () => {
  Amplitude.getInstance().logEvent('V2_SUCCESSFUL_PURCHASE');
};

export const logDeniedPurchase = () => {
  Amplitude.getInstance().logEvent('V2_DENIED_PURCHASE');
};

export const logClosePremiumScreen = () => {
  Amplitude.getInstance().logEvent('V2_CLOSE_PREMIUM_SCREEN');
};

//Happy Hour QUiZ logs
export const logQuizTips = () => {
  Amplitude.getInstance().logEvent('V2_QUIZ_CLICK_TIPS');
};

export const logQuizStart = () => {
  Amplitude.getInstance().logEvent('V2_QUIZ_START');
};

export const logQuizLeave = () => {
  Amplitude.getInstance().logEvent('V2_QUIZ_LEAVE');
};

export const logQuizEnd = () => {
  Amplitude.getInstance().logEvent('V2_QUIZ_END');
};

export const logQuizClickAnswer = () => {
  Amplitude.getInstance().logEvent('V2_QUIZ_CLICK_ANSWER');
};

export const logQuizSubmitAnswer = () => {
  Amplitude.getInstance().logEvent('V2_QUIZ_CLICK_SUBMIT');
};

export const logQuizNextQuestion = () => {
  Amplitude.getInstance().logEvent('V2_QUIZ_NEXT_QUESTION');
};

//Happy Hour QUiZ logs
export const logClickNext = () => {
  Amplitude.getInstance().logEvent('V2_HOME_CLICK_NEXT');
};
