import React, {useEffect, useRef} from 'react';
import {Dimensions, Platform} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PubNubProvider} from 'pubnub-react';
import RNBootSplash from 'react-native-bootsplash';
import * as Sentry from '@sentry/react-native';
import messaging from '@react-native-firebase/messaging';
import PubNub from 'pubnub';
import {LogBox} from 'react-native';

import {AuthProvider, useAuth} from './Providers/AuthProvider';
import {
  AppContentProvider,
  useAppContent,
} from './Providers/AppContentProvider';
import {MessagesProvider} from './Providers/MessagesProvider';
import {AppFlagProvider} from './Providers/AppFlagProvider';
import {BlindDateProvider, useBlindDate} from './Providers/BlindDateProvider';

import Toast from './Assets/Package/react-native-toast-message';

import * as Screens from './Screens';
import * as Modals from './Screens/Modals';
import TabBar from './Navigation/TabBar';

import {
  android_build_number,
  apple_subscribtion_api_key,
  google_subscribtion_api_key,
  ios_build_number,
  publish_key,
  sentry_dsn,
  sentry_env,
  subscribe_key,
} from './Utils/EnvironmentVariables';
// import BlindDateQuery from './Api/BlindDateQuery';
import {initAnalytics, logScreenPresent} from './Utils/Analytics';
import {S3_MAIN_URL} from './Utils/Constants';
import {getActiveRouteParams} from './Utils/Functions';
import {PremiumProvider} from './Providers/PremiumProvider';
import Purchases from 'react-native-purchases';

import './Localization/i18n';

const ModalStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

initAnalytics();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

function AppNavigation() {
  const {user, userData, voiceProblem} = useAuth();
  const {appVersion, latestHappyHour} = useAppContent();
  const latestHappyHourRef = useRef(null);
  const {currentStateRef} = useBlindDate();
  // const {checkFlag, updateFlag} = useAppFlag();
  const navigation = useNavigation();

  const pubnub = new PubNub({
    publishKey: publish_key,
    subscribeKey: subscribe_key,
    uuid: user && user.id,
    restore: true,
  });

  const navigateOnNotification = (remoteMessage) => {
    switch (remoteMessage.data.type) {
      case 'LIKE':
        navigation.navigate('LikedYou');
        break;
      case 'MATCH':
        navigation.navigate('Chat');
        break;
      case 'MESSAGE':
        navigation.navigate('ChatDetail', {
          pubnub_room_id: remoteMessage.data.payload,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const setupRevenueCat = async () => {
      Purchases.setDebugLogsEnabled(true);
      if (Platform.OS === 'ios') {
        await Purchases.setup(apple_subscribtion_api_key);
      } else if (Platform.OS === 'android') {
        await Purchases.setup(google_subscribtion_api_key);
      }
    };
    setupRevenueCat();
    RNBootSplash.hide({fade: true});

    const unsubscribe = messaging().onMessage((remoteMessage) => {
      switch (remoteMessage.data.type) {
        case 'LIKE':
          if (
            user &&
            remoteMessage.data.user_name &&
            remoteMessage.data.user_id
          ) {
            Toast.show({
              position: 'top',
              type: 'like',
              text:
                'You received a like from ' +
                remoteMessage.data.user_name +
                '!',
              image: {uri: S3_MAIN_URL + remoteMessage.data.user_id + '.jpg'},
              topOffset: 0,
              visibilityTime: 2000,
              onClick: () => {
                navigation.navigate('LikedYou');
              },
            });
          }
          break;
        case 'MATCH':
          if (
            user &&
            remoteMessage.data.user_name &&
            remoteMessage.data.user_id
          ) {
            Toast.show({
              position: 'top',
              type: 'match',
              text: 'You matched with ' + remoteMessage.data.user_name + '!',
              image: {uri: S3_MAIN_URL + user.id + '.jpg'},
              image1: {uri: S3_MAIN_URL + remoteMessage.data.user_id + '.jpg'},
              topOffset: 0,
              visibilityTime: 2000,
              onClick: () => {
                navigation.navigate('Chat');
              },
            });
          }
          break;
        case 'MESSAGE':
          const routeParams = getActiveRouteParams(
            navigation.dangerouslyGetState(),
          );
          if (
            user &&
            remoteMessage.data.user_name &&
            remoteMessage.data.user_id &&
            user.id !== remoteMessage.data.user_id &&
            (routeParams === undefined ||
              (routeParams &&
                routeParams.pubnub_room_id !== remoteMessage.data.payload))
          ) {
            Toast.show({
              position: 'top',
              type: 'message',
              text: remoteMessage.data.user_name,
              textBody: remoteMessage.notification.body,
              image: {uri: S3_MAIN_URL + remoteMessage.data.user_id + '.jpg'},
              topOffset: 0,
              visibilityTime: 2000,
              onClick: () => {
                navigation.navigate('ChatDetail', {
                  pubnub_room_id: remoteMessage.data.payload,
                });
              },
            });
          }
          break;
        default:
          break;
      }
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        navigateOnNotification(remoteMessage);
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          navigateOnNotification(remoteMessage);
        }
      });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (voiceProblem && voiceProblem !== 'PASSED') {
      navigation.push('VoiceIntroReview');
    } else if (voiceProblem === 'PASSED') {
      // Toast.show({
      //   position: 'top',
      //   type: 'review',
      //   text1: 'Voice Intro upload was successful',
      //   topOffset: 0,
      //   visibilityTime: 2000,
      // });
    }
  }, [voiceProblem]);

  useEffect(() => {
    if (user && user.customData && user.customData.status === 0) {
      if (
        latestHappyHour !== undefined &&
        latestHappyHour !== null &&
        latestHappyHour.isValid() &&
        latestHappyHour.status === 'happening'
      ) {
        if (
          latestHappyHourRef.current === null ||
          latestHappyHourRef.current._id.toString() !==
            latestHappyHour._id.toString()
        ) {
          if (
            currentStateRef.current === null ||
            currentStateRef.current === undefined ||
            currentStateRef.current.state === 'NOT_ACTIVE' ||
            currentStateRef.current.state === 'BLIND_ACTIVE'
          ) {
            navigation.push('HappyHourStarted');
          }
        }
      }
      latestHappyHourRef.current = latestHappyHour;
    }
  }, [latestHappyHour, user, userData]);

  useEffect(() => {
    if (user) {
      Sentry.setUser({id: user.id});
      if (
        appVersion !== undefined &&
        appVersion !== null &&
        appVersion.isValid()
      ) {
        if (Platform.OS === 'ios') {
          if (appVersion.ios_build_number > ios_build_number) {
            if (user.customData && user.customData.status === 0) {
              navigation.navigate('UpdateAvailable');
            }
          }
        } else if (Platform.OS === 'android') {
          if (appVersion.android_build_number > android_build_number) {
            if (user.customData && user.customData.status === 0) {
              navigation.navigate('UpdateAvailable');
            }
          }
        }
      }
    }
  }, [appVersion, user]);

  return (
    <PubNubProvider client={pubnub}>
      <MessagesProvider>
        <Stack.Navigator headerMode="none">
          {user && (
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{
                gestureEnabled: false,
              }}
            />
          )}
          <Stack.Screen
            name="Welcome"
            component={Screens.WelcomeScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="WaitList"
            component={Screens.WaitListScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="AvailableScreen"
            component={Screens.AvailableScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="InviteFriend"
            component={Screens.InviteFriendsScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="WaitThank"
            component={Screens.WaitThanksScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="TimeOutScreen"
            component={Screens.TimeOutScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="BlindDateScreen"
            component={Screens.BlindDateScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="BlindDateInstruction"
            component={Screens.BlindDateInstruction}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="BlindFeedBack"
            component={Screens.BlindFeedBack}
            initialParams={{otherUserInfo: null}}
            options={{
              gestureEnabled: false,
              gestureVelocityImpact: 0.1,
              gestureResponseDistance: {
                vertical: Dimensions.get('window').height,
              },
              gestureDirection: 'vertical',
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="BlindFeedBackEnd"
            component={Screens.BlindFeedBackEnd}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="ListenModeEnd"
            component={Screens.ListenModeEnd}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="MyMovie" component={Screens.MyMovieScreen} />
          <Stack.Screen name="MyInsta" component={Screens.MyInstaScreen} />
          <Stack.Screen
            name="SelectPrompt"
            component={Screens.SelectPromptScreen}
          />
          <Stack.Screen
            name="CreatePrompt"
            component={Screens.CreatePromptScreen}
          />
          <Stack.Screen
            name="CreateMovie"
            component={Screens.CreateMovieScreen}
          />
          <Stack.Screen
            name="CreateHobbies"
            component={Screens.CreateHobbiesScreen}
          />
          <Stack.Screen
            name="AddVoiceIntro"
            component={Screens.AddVoiceIntro}
            options={{
              gestureEnabled: false,
              gestureVelocityImpact: 0.1,
              gestureResponseDistance: {
                vertical: Dimensions.get('window').height,
              },
              gestureDirection: 'vertical',
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="PreviewIntro"
            component={Screens.PreviewVoiceIntro}
          />
          <Stack.Screen
            name="PreviewPrompt"
            component={Screens.PreviewPromptScreen}
          />
          <Stack.Screen name="MyMusic" component={Screens.MyMusicScreen} />
          <Stack.Screen
            name="CreateMusic"
            component={Screens.CreateMusicScreen}
          />
          <Stack.Screen
            name="Information"
            component={Screens.InformationScreen}
          />
          <Stack.Screen
            name="EditProfile"
            component={Screens.EditProfileScreen}
          />
          <Stack.Screen name="MyProfile" component={Screens.MyProfileScreen} />
          <Stack.Screen name="LikedYou" component={Screens.LikedYouScreen} />
          <Stack.Screen
            name="EditInformation"
            component={Screens.EditInformationScreen}
          />
          <Stack.Screen
            name="Preferences"
            component={Screens.PreferencesScreen}
          />
          <Stack.Screen name="Settings" component={Screens.SettingScreen} />
          <Stack.Screen
            name="SettingNotification"
            component={Screens.Notification}
          />
          <Stack.Screen name="SettingAccount" component={Screens.Account} />
          <Stack.Screen name="SettingPrivacy" component={Screens.Privacy} />
          <Stack.Screen name="SettingPremium" component={Screens.Premium} />
          <Stack.Screen name="SettingFeedback" component={Screens.Feedback} />
          <Stack.Screen
            name="ImageViewer"
            component={Modals.SingleImageViewer}
            options={{
              gestureVelocityImpact: 0.1,
              gestureResponseDistance: {
                vertical: Dimensions.get('window').height,
              },
              gestureDirection: 'vertical',
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="ShowSingle"
            component={Screens.ShowSingleProfile}
          />
          <Stack.Screen name="SpeakEasy" component={Screens.SpeakEasyScreen} />
          <Stack.Screen
            name="ChatDetail"
            component={Screens.ChatDetailScreen}
          />
          <Stack.Screen
            name="AudioChatScreen"
            component={Screens.AudioChatScreen}
          />
          <Stack.Screen
            name="ReachedModal"
            component={Modals.ReachedModal}
            options={{
              gestureVelocityImpact: 0.1,
              gestureResponseDistance: {
                vertical: Dimensions.get('window').height,
              },
              gestureDirection: 'vertical',
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="MicPermissionModal"
            component={Modals.MicPermissionModal}
            options={{
              gestureVelocityImpact: 0.1,
              gestureResponseDistance: {
                vertical: Dimensions.get('window').height,
              },
              gestureDirection: 'vertical',
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="SeeMoreProfile"
            component={Screens.SeeMoreProfile}
            options={{
              gestureVelocityImpact: 0.1,
              gestureResponseDistance: {
                vertical: Dimensions.get('window').height,
              },
              gestureDirection: 'vertical',
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="ListenMode"
            component={Screens.ListenMode}
            options={{
              gestureVelocityImpact: 0.1,
              gestureResponseDistance: {
                vertical: Dimensions.get('window').height,
              },
              gestureDirection: 'vertical',
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="CameraPermissionModal"
            component={Modals.CameraPermissionModal}
            options={{
              gestureVelocityImpact: 0.1,
              gestureResponseDistance: {
                vertical: Dimensions.get('window').height,
              },
              gestureDirection: 'vertical',
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="CommunityRules"
            component={Screens.CommunityRules}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="IntroAudio"
            component={Screens.IntroAudioScreen}
          />
          <Stack.Screen
            name="Intro"
            component={Screens.IntroScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="RegisterPhone"
            component={Screens.RegisterPhone}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="RegisterPhoneVerify"
            component={Screens.RegisterPhoneVerify}
            options={{
              gestureEnabled: false,
            }}
            initialParams={{
              phone: null,
              verification: null,
            }}
          />
          <Stack.Screen
            name="RegisterCreateUser"
            component={Screens.RegisterCreateUser}
            options={{
              gestureEnabled: false,
            }}
            initialParams={{
              phone: null,
              verification: null,
            }}
          />
          <Stack.Screen
            name="RegisterLocation"
            component={Screens.RegisterLocation}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="RegisterNotification"
            component={Screens.RegisterNotification}
            initialParams={{waitList: 'Normal'}}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="RegisterPhoto"
            component={Screens.RegisterPhoto}
            initialParams={{waitList: 'Normal'}}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="RegisterPhotoVerify"
            component={Screens.RegisterPhotoVerify}
            initialParams={{isFromProfile: false}}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="HappyHourStarted"
            component={Modals.HappyHourStarted}
            options={{
              gestureVelocityImpact: 0.1,
              gestureResponseDistance: {
                vertical: Dimensions.get('window').height,
              },
              gestureDirection: 'vertical',
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          {/* <Stack.Screen name="LiveIntro" component={Screens.LiveIntroScreen} /> */}
          {/* <Stack.Screen
            name="LiveLocation"
            component={Screens.LiveLocationScreen}
            options={{
              gestureEnabled: false,
            }}
          /> */}
          {/* <Stack.Screen
            name="LiveNotification"
            component={Screens.LiveNotificationScreen}
            options={{
              gestureEnabled: false,
            }}
          /> */}
          {/* <Stack.Screen
            name="VideoChatScreen"
            component={Screens.VideoChatScreen}
          /> */}
          {/* <Stack.Screen
            name="LivePhotoVerification"
            component={Screens.LivePhotoVerification}
          /> */}
        </Stack.Navigator>
      </MessagesProvider>
    </PubNubProvider>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      tabBarOptions={{
        style: {
          backgroundColor: 'transparent',
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Screens.HomeScreen}
        initialParams={{scrollToTop: false}}
        options={{tabBarVisible: true}}
      />
      <Tab.Screen
        name="Chat"
        component={Screens.ChatScreen}
        options={{tabBarVisible: true}}
      />
      <Tab.Screen
        name="NewProfile"
        component={Screens.NewProfileScreen}
        options={{tabBarVisible: true}}
      />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {
  const navigationRef = useRef();
  const routeNameRef = useRef();
  const routeTimeRef = useRef(Date.now());

  const {user} = useAuth();
  const {currentStateRef} = useBlindDate();

  const decideWhichScreenToShowFirst = () => {
    if (user) {
      if (
        user.customData &&
        (user.customData.status === 6 || user.customData.status === 7)
      ) {
        return {
          index: 0,
          routes: [
            {
              name: 'AppNavigation',
              state: {
                index: 0,
                routes: [{name: 'WaitList'}],
              },
            },
          ],
        };
      } else if (
        user.customData &&
        user.customData.profile_hd_images.length === 0
      ) {
        return {
          index: 0,
          routes: [
            {
              name: 'AppNavigation',
              state: {
                index: 0,
                routes: [{name: 'RegisterPhoto'}],
              },
            },
          ],
        };
      } else {
        if (currentStateRef.current) {
          switch (currentStateRef.current.state) {
            case 'NOT_ACTIVE':
              return {
                index: 0,
                routes: [
                  {
                    name: 'AppNavigation',
                    state: {
                      index: 0,
                      routes: [{name: 'TabNavigator'}],
                    },
                  },
                ],
              };
            case 'BLIND_ACTIVE':
              return {
                index: 0,
                routes: [
                  {
                    name: 'AppNavigation',
                    state: {
                      index: 0,
                      routes: [{name: 'TabNavigator'}],
                    },
                  },
                ],
              };
            case 'JOINED_WAITING':
              return {
                index: 0,
                routes: [
                  {
                    name: 'AppNavigation',
                    state: {
                      index: 0,
                      routes: [{name: 'TabNavigator'}],
                    },
                  },
                ],
              };
            case 'JOINED_TALKING':
              return {
                index: 0,
                routes: [
                  {
                    name: 'AppNavigation',
                    state: {
                      index: 0,
                      routes: [{name: 'TabNavigator'}],
                    },
                  },
                ],
              };
            case 'FEEDBACK':
              return {
                index: 0,
                routes: [
                  {
                    name: 'AppNavigation',
                    state: {
                      index: 2,
                      routes: [{name: 'TabNavigator'}, {name: 'BlindFeedBack'}],
                    },
                  },
                ],
              };
          }
        } else {
          return {
            index: 0,
            routes: [
              {
                name: 'AppNavigation',
                state: {
                  index: 0,
                  routes: [{name: 'TabNavigator'}],
                },
              },
            ],
          };
        }
      }
    } else {
      return {
        index: 0,
        routes: [
          {
            name: 'AppNavigation',
            state: {
              index: 0,
              routes: [{name: 'TabNavigator'}],
            },
          },
        ],
      };
    }
  };

  const initialState = decideWhichScreenToShowFirst();

  return (
    <NavigationContainer
      initialState={initialState}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async (state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        // const timeDiff = Date.now() - routeTimeRef.current;
        routeTimeRef.current = Date.now();
        if (previousRouteName !== currentRouteName) {
          logScreenPresent(currentRouteName);
        }
        routeNameRef.current = currentRouteName;
      }}>
      <ModalStack.Navigator
        screenOptions={{
          cardStyle: {backgroundColor: 'transparent'},
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({current: {progress}}) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
              }),
            },
          }),
        }}
        mode="modal"
        headerMode="none">
        <ModalStack.Screen name="AppNavigation" component={AppNavigation} />

        <ModalStack.Screen name="MatchModal" component={Modals.MatchModal} />
        <ModalStack.Screen
          name="EndHappyHour"
          component={Modals.EndHappyHourModal}
        />
        <ModalStack.Screen
          name="UpdateAvailable"
          component={Modals.UpdateAvailableModal}
        />
        <ModalStack.Screen name="BannedModal" component={Modals.BannedModal} />
        <ModalStack.Screen name="StrikeModal" component={Modals.StrikeModal} />
        <ModalStack.Screen name="UnderAge" component={Modals.UnderAgeModal} />
        <ModalStack.Screen name="RealPhoto" component={Modals.RealPhotoModal} />
        <ModalStack.Screen name="GifModal" component={Modals.GifModal} />
        <ModalStack.Screen
          name="HomeTutorial"
          component={Modals.HomeTutorial}
        />
        <ModalStack.Screen
          name="BenefitsModal"
          component={Modals.BenefitsModal}
        />
        <ModalStack.Screen
          name="SpeakEasyModal"
          component={Modals.SpeakEasyModal}
        />
        <ModalStack.Screen
          name="UpgradeModal"
          component={Modals.UpgradeModal}
        />
        <ModalStack.Screen
          name="VoiceIntroReview"
          component={Modals.VoiceIntroReview}
        />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
};

function App() {
  if (__DEV__) {
  } else {
    Sentry.init({
      dsn: sentry_dsn,
      environment: sentry_env,
    });
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <BlindDateProvider>
          <AppFlagProvider>
            <AppContentProvider>
              <PremiumProvider>
                <MainNavigation />
              </PremiumProvider>
            </AppContentProvider>
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </AppFlagProvider>
        </BlindDateProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(App);
