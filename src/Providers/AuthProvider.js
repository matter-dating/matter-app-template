import React, {useContext, useState, useEffect, useRef} from 'react';
import 'react-native-get-random-values';
import Realm from 'realm';
import {getRealmApp} from '../getRealmApp';
import messaging from '@react-native-firebase/messaging';
// import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation-service';
import Purchases from 'react-native-purchases';

import {GetLocation} from './Geolocation/Geolocation';

import {Card} from '../Schemas/Card';
import {UserRelation} from '../Schemas/UserRelation';
import {Invitation} from '../Schemas/Invitations';
import {Verification} from '../Schemas/Verification';
import {Match} from '../Schemas/Match';
import {getFormattedCards} from '../Utils/CardsFormatter';
import {ObjectId} from 'bson';
import {makeid} from '../Utils/Functions';
import {setAmplitudeUserProperty} from '../Utils/Analytics';
import {ios_build_number} from '../Utils/EnvironmentVariables';

const authProviderSchemaVersion = 1;

// Access the Realm App.
const app = getRealmApp();

const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
  const appUser =
    app.currentUser &&
    (app.currentUser.identities[0].providerType !== 'anon-user' ||
      app.currentUser.identities.length > 1)
      ? app.currentUser
      : null;
  const [user, setUser] = useState(appUser);
  const [anonUser, setAnonUser] = useState(app.currentUser);
  const [userData, setUserData] = useState(
    appUser ? app.currentUser.customData : null,
  );
  const [userCards, setUserCards] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [userInvitation, setUserInvitation] = useState([]);
  const [userVerification, setUserVerification] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [blindMatches, setBlindMatches] = useState([]);
  const [voiceProblem, setVoiceProblem] = useState(null);

  const realmRef = useRef(null);

  const updateFcmToken = (success = () => {}, error = () => {}) => {
    messaging()
      .requestPermission()
      .then((authStatus) => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          messaging()
            .getToken()
            .then((fcmToken) => {
              success();
              if (user.customData) {
                if (fcmToken !== user.customData.fcm_token) {
                  user.callFunction('updateFcmToken', [fcmToken]);
                }
              } else {
                user.callFunction('updateFcmToken', [fcmToken]);
              }
            });
        } else {
          user.callFunction('updateFcmToken', ['']);
          error();
        }
      })
      .catch((e) => {
        error();
      });
  };
  //USER FUNCTIONS
  const updateUserData = async () => {
    const customUserData = await user.refreshCustomData();
    setUserData(customUserData);
  };

  const updateLocation = (success, error) => {
    GetLocation(success, error, user, updateUserData);
  };

  const updateLastActiveTimestamp = () => {
    user.callFunction('updateLastActiveTimestamp', []);
  };

  useEffect(() => {
    const audioCard = userCards.filter((c) => c.type === 'voice-intro');
    if (audioCard.length > 0) {
      if (audioCard[0].status) {
        setVoiceProblem(audioCard[0].status);
      }
    }
  }, [userCards]);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.customData && user.customData.user_id) {
      setAmplitudeUserProperty(
        user.customData.user_id,
        user.customData.date_of_birth,
        user.customData.gender,
        user.customData.interest,
      );
      Purchases.logIn(user.customData.user_id);
    }
    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };

    const config = {
      schema: [
        Card.schema,
        UserRelation.schema,
        Match.schema,
        Invitation.schema,
        Verification.schema,
      ],
      schemaVersion: authProviderSchemaVersion,
      sync: {
        user: user,
        partitionValue: 'user=' + user.id,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };

    Realm.open(config)
      .then((currentRealm) => {
        realmRef.current = currentRealm;
        const syncCards = currentRealm
          .objects('Card')
          .filtered('user_id == "' + user.id + '"')
          .sorted('created_at', true);
        setUserCards(syncCards.map((card) => JSON.parse(JSON.stringify(card))));
        syncCards.addListener(() => {
          setUserCards(
            syncCards.map((card) => JSON.parse(JSON.stringify(card))),
          );
        });
        const syncLikes = currentRealm
          .objects('UserRelation')
          .filtered('type == "LIKE"')
          .filtered('source == "APP"');
        setUserLikes([...syncLikes]);
        syncLikes.addListener(() => {
          setUserLikes([...syncLikes]);
        });

        const syncMatches = currentRealm
          .objects('Match')
          .filtered('source != "BLIND_UNMATCH" && source != "APP_UNMATCH"');
        setUserMatches([...syncMatches]);
        syncMatches.addListener(() => {
          setUserMatches([...syncMatches]);
        });

        const syncBlindMatches = currentRealm
          .objects('Match')
          .filtered('source == "BLIND"');
        setBlindMatches([...syncBlindMatches]);
        syncBlindMatches.addListener(() => {
          setBlindMatches([...syncBlindMatches]);
        });

        const syncInvitation = currentRealm.objects('Invitation');
        setUserInvitation([...syncInvitation]);
        syncInvitation.addListener(() => {
          setUserInvitation([...syncInvitation]);
        });

        const syncVerification = currentRealm
          .objects('Verification')
          .filtered('type == "photo"');
        setUserVerification([...syncVerification]);
        syncVerification.addListener(() => {
          setUserVerification([...syncVerification]);
        });
      })
      .catch((e) => console.error(e));
    if (user.customData) {
      updateFcmToken();
    }
    updateLastActiveTimestamp();
    updateUserData();

    return () => {
      const currentRealm = realmRef.current;
      if (currentRealm) {
        currentRealm.close();
        realmRef.current = null;
        setUserCards([]);
        setUserLikes([]);
        setUserInvitation([]);
        setUserVerification([]);
        setUserMatches([]);
        setBlindMatches([]);
      }
    };
  }, [user]);

  //AUTH FUNCTIONS
  const signInAnon = async () => {
    if (anonUser) {
      return anonUser;
    } else {
      const credentials = Realm.Credentials.anonymous();
      const newUser = await app.logIn(credentials);
      setAnonUser(newUser);
      return newUser;
    }
  };

  const signInWithNumber = async (phone) => {
    const credentials = Realm.Credentials.function({phone});
    try {
      const newUser = await app.logIn(credentials);
      setUser(newUser);
      return newUser;
    } catch (err) {
      console.error('Failed to log in', err.message);
    }
  };

  const signUpWithNumber = async (userBio) => {
    const credentials = Realm.Credentials.function({phone: userBio.phone});
    const linkedUser = await anonUser.linkCredentials(credentials);
    if (userBio) {
      await linkedUser.callFunction('createNewUserDocumentRefactor', [
        userBio,
        ios_build_number,
      ]);
    }
    setUser(linkedUser);
  };

  const signIn = async (email, password, userBio, imagesUrl) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    if (userBio && imagesUrl) {
      let imageIds = [];
      await Promise.all(
        imagesUrl.map(async (i) => {
          const imageId = makeid(20);
          await newUser.callFunction('uploadImageToS3', [
            i,
            imageId,
            'matter-profile-photos',
          ]);
          imageIds.push(imageId);
        }),
      );
      userBio.profile_hd_images = imageIds;
      await newUser.callFunction('createNewUserDocumentRefactor', [
        userBio,
        ios_build_number,
      ]);
    }
    setUser(newUser);
  };

  const signUp = async (email, password) => {
    await app.emailPasswordAuth.registerUser(email, password);
  };

  const signOut = (deleted = false) => {
    if (!deleted) {
      user.callFunction('removeTokens', []);
    }
    if (user == null) {
      console.error("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    anonUser.logOut();
    setUser(null);
    setAnonUser(null);
  };

  //PROFILE FUNCTIONS
  const getFormattedProfile = () => {
    if (user) {
      return {
        _id: user.id,
        user_info: userData,
        user_cards: getFormattedCards(userCards, userData),
      };
    }
    return null;
  };

  //CARD FUNCTIONS
  const createCard = (
    type,
    content_type,
    content,
    groupable = false,
    priority = 10,
  ) => {
    const cardsRealm = realmRef.current;
    cardsRealm.write(() => {
      cardsRealm.create(
        'Card',
        new Card({
          user_id: user.id,
          content:
            typeof content === 'string' ? content : JSON.stringify(content),
          content_type,
          type,
          groupable,
          priority,
        }),
      );
    });
  };

  const updateCard = (card, content) => {
    const cardsRealm = realmRef.current;
    cardsRealm.write(() => {
      const realmCard = cardsRealm.objectForPrimaryKey(
        'Card',
        new ObjectId(card._id),
      );
      realmCard.content =
        typeof content === 'string' ? content : JSON.stringify(content);
      realmCard.updated_at = new Date();
      realmCard.status = null;
    });
  };

  const updateCardWithOthers = (
    card,
    type,
    content,
    content_type,
    priority = 100,
  ) => {
    const cardsRealm = realmRef.current;
    cardsRealm.write(() => {
      const realmCard = cardsRealm.objectForPrimaryKey(
        'Card',
        new ObjectId(card._id),
      );
      realmCard.content = JSON.stringify(content);
      realmCard.type = type;
      realmCard.priority = priority;
      realmCard.content_type = content_type;
      realmCard.updated_at = new Date();
    });
  };

  const updateCardGroupable = (card_id, groupable) => {
    const cardsRealm = realmRef.current;
    cardsRealm.write(() => {
      const realmCard = cardsRealm.objectForPrimaryKey(
        'Card',
        new ObjectId(card_id),
      );
      realmCard.groupable = groupable;
    });
  };

  const updateCardPriority = (card_id, priority = 100) => {
    const cardsRealm = realmRef.current;
    cardsRealm.write(() => {
      const realmCard = cardsRealm.objectForPrimaryKey(
        'Card',
        new ObjectId(card_id),
      );
      realmCard.priority = priority;
    });
  };

  const updateInvitation = (invitation, seen_report_count) => {
    const invitationsRealm = realmRef.current;
    invitationsRealm.write(() => {
      const realmInvitation = invitationsRealm.objectForPrimaryKey(
        'Invitation',
        new ObjectId(invitation._id),
      );
      realmInvitation.seen_report_count = seen_report_count;
      realmInvitation.updated_at = new Date();
    });
  };

  const updateInvitationProperty = (
    invitation,
    property_name,
    property_value,
  ) => {
    const invitationsRealm = realmRef.current;
    invitationsRealm.write(() => {
      const realmInvitation = invitationsRealm.objectForPrimaryKey(
        'Invitation',
        new ObjectId(invitation._id),
      );
      realmInvitation[property_name] = property_value;
      realmInvitation.updated_at = new Date();
    });
  };

  const deleteCard = (card) => {
    const cardsRealm = realmRef.current;

    cardsRealm.write(() => {
      cardsRealm.delete(
        cardsRealm.objectForPrimaryKey('Card', new ObjectId(card._id)),
      );
    });
  };

  // VERIFICATION FUNCTIONS
  const createVerification = (
    id,
    type,
    pro_pic_url,
    selfie_url,
    status = 0,
    reason = '',
  ) => {
    const verificationRealm = realmRef.current;
    verificationRealm.write(() => {
      verificationRealm.create(
        'Verification',
        new Verification({
          _id: new ObjectId(id),
          user_id: id,
          type: type,
          pro_pic_url: pro_pic_url,
          selfie_url: selfie_url,
          status: status,
          reason: reason,
        }),
      );
    });
  };

  const updateVerification = (verification, status, selfie_url) => {
    const verificationRealm = realmRef.current;
    verificationRealm.write(() => {
      const verificationCard = verificationRealm.objectForPrimaryKey(
        'Verification',
        new ObjectId(verification._id),
      );
      verificationCard.status = status;
      verificationCard.selfie_url = selfie_url;
      verificationCard.updated_at = new Date();
    });
  };

  // MATCH FUNCTIONS
  const getMatch = (pubnub_room_id) => {
    const matchRealm = realmRef.current;
    if (matchRealm) {
      return matchRealm
        .objects('Match')
        .filtered('pubnub_room_id == "' + pubnub_room_id + '"')[0];
    }
  };

  const getBlindDateMatches = (blind_date_group_id) => {
    const matchRealm = realmRef.current;
    return matchRealm
      .objects('Match')
      .filtered('source == "BLIND_' + blind_date_group_id + '"');
  };

  const setLastSeenTime = (room) => {
    const matchRealm = realmRef.current;
    if (matchRealm) {
      if (matchRealm.isInTransaction) {
        room.last_seen_time = new Date();
      } else {
        matchRealm.write(() => {
          room.last_seen_time = new Date();
        });
      }
    }
  };

  const setEnableTextRoom = (room) => {
    const matchRealm = realmRef.current;
    if (matchRealm) {
      if (matchRealm.isInTransaction) {
        room.enable_text = true;
      } else {
        matchRealm.write(() => {
          room.enable_text = true;
        });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        user,
        createCard,
        updateCard,
        updateCardWithOthers,
        updateCardPriority,
        deleteCard,
        userCards,
        getFormattedProfile,
        userData,
        updateUserData,
        userLikes,
        userMatches,
        userInvitation,
        updateInvitation,
        updateInvitationProperty,
        userVerification,
        updateVerification,
        createVerification,
        signInAnon,
        signUpWithNumber,
        signInWithNumber,
        updateFcmToken,
        updateLocation,
        blindMatches,
        getMatch,
        setLastSeenTime,
        setEnableTextRoom,
        getBlindDateMatches,
        voiceProblem,
        setVoiceProblem,
        updateCardGroupable,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error('useAuth() called outside of a AuthProvider?');
  }
  return auth;
};

export {AuthProvider, useAuth};
