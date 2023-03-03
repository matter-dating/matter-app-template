import React, {useContext, useState, useEffect, useRef} from 'react';
import 'react-native-get-random-values';
import Realm from 'realm';
// import {getRealmApp} from '../getRealmApp';
import {Misc} from '../Schemas/Misc';
import {AppContent} from '../Schemas/AppContent';
import {Topic} from '../Schemas/Topic';
import {ObjectId} from 'bson';

import {useAuth} from './AuthProvider';
import {AppVersion} from '../Schemas/AppVersion';
import {BlindDateSession, LocationSchema} from '../Schemas/BlindDateSession';
import {calcDistance} from '../Utils/Functions';

// Access the Realm App.
// const app = getRealmApp();

const AppContentContext = React.createContext(null);

const AppContentProvider = ({children}) => {
  const {user, userData, updateInvitation} = useAuth();
  const [miscs, setMiscs] = useState([]);
  const [topics, setTopics] = useState([]);
  const [contents, setContents] = useState([]);
  const realmRef = useRef(null);
  const [appVersion, setAppVersion] = useState(null);
  const [latestHappyHour, setLatestHappyHour] = useState(null);
  const [activeSpeakeasy, setActiveSpeakeasy] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const errorSync = (_session, error) => {
      if (error.name === 'ClientReset') {
        // const realmPath = "<Your Realm Path>";
        // Realm.App.Sync.initiateClientReset(app, realmPath); // pass your realm app instance, and realm path to initiateClientReset()
      } else {
        console.error(`Received error ${error.message}`);
      }
    };

    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };

    const config = {
      schema: [
        Misc.schema,
        AppContent.schema,
        AppVersion.schema,
        BlindDateSession.schema,
        LocationSchema,
        Topic.schema,
      ],
      sync: {
        user: user,
        partitionValue: 'PUBLIC',
        error: errorSync,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };

    Realm.open(config).then((currentRealm) => {
      realmRef.current = currentRealm;
      const syncMiscs = currentRealm
        .objects('Misc')
        .filtered(
          'type == "hobby" || type == "prompt" || type == "sticker" || type == "switch_flag" || type == "voice_intro"',
        );
      setMiscs([...syncMiscs]);
      syncMiscs.addListener(() => {
        setMiscs([...syncMiscs]);
      });

      const synContents = currentRealm
        .objects('AppContent')
        .sorted('priority', true);
      setContents([...synContents]);
      synContents.addListener(() => {
        setContents([...synContents]);
      });

      const syncTopics = currentRealm.objects('Topic');
      setTopics([...syncTopics]);
      syncTopics.addListener(() => {
        setTopics([...syncTopics]);
      });

      // const latestHappy = currentRealm.objects('BlindDateSession').filtered('start_time < $0', new Date()).filtered('end_time > $0', new Date())
      const latestHappy = currentRealm
        .objects('BlindDateSession')
        .filtered('status == "scheduled" || status == "happening"')
        .filtered('end_time > $0', new Date())
        .sorted('end_time');
      latestHappy.addListener(() => {
        if (
          user &&
          user.customData &&
          user.customData.location &&
          user.customData.location.coordinates
        ) {
          const nearbyHappyHours = latestHappy.filter((happy) => {
            return (
              calcDistance(
                happy.location.coordinates[1],
                happy.location.coordinates[0],
                user.customData.location.coordinates[1],
                user.customData.location.coordinates[0],
              ) <
              happy.radius / 1000
            );
          });
          setLatestHappyHour(
            nearbyHappyHours.length > 0 ? nearbyHappyHours[0] : null,
          );
        } else {
          setLatestHappyHour(null);
        }
      });

      const appV = currentRealm.objects('AppVersion').sorted('timestamp', true);
      setAppVersion(appV[0]);
    });

    return () => {
      const currentRealm = realmRef.current;
      if (currentRealm) {
        currentRealm.close();
        realmRef.current = null;
        setContents([]);
        setMiscs([]);
        setTopics([]);
        setLatestHappyHour(null);
        setAppVersion(null);
      }
    };
  }, [user]);

  useEffect(() => {
    // // const code = '';
    // const activeSpeakeEasyInstance = currentRealm
    //   .objects('BlindDateSession')
    //   .filtered('status == "scheduled" || status == "happening"')
    //   .filtered('end_time > $0', new Date());
    // activeSpeakeEasyInstance.addListener(() => {
    //   setActiveSpeakeasy(activeSpeakeEasyInstance[0]);
    // });
    // console.log('speakeasy', activeSpeakeasy);
  }, [activeSpeakeasy]);

  useEffect(() => {
    const currentRealm = realmRef.current;
    if (currentRealm) {
      const latestHappy = currentRealm
        .objects('BlindDateSession')
        .filtered('status == "scheduled" || status == "happening"')
        .filtered('end_time > $0', new Date())
        .sorted('end_time');
      if (
        user &&
        userData &&
        userData.location &&
        userData.location.coordinates &&
        (userData.status === 0 || userData.status === 1)
      ) {
        const nearbyHappyHours = latestHappy.filter((happy) => {
          return (
            calcDistance(
              happy.location.coordinates[1],
              happy.location.coordinates[0],
              userData.location.coordinates[1],
              userData.location.coordinates[0],
            ) <
            happy.radius / 1000
          );
        });
        setLatestHappyHour(
          nearbyHappyHours.length > 0 ? nearbyHappyHours[0] : null,
        );
      } else {
        setLatestHappyHour(null);
      }
    }
  }, [user, userData]);

  //MISC FUNCTIONS
  const createMisc = (type, slug_list) => {
    const miscsRealm = realmRef.current;
    miscsRealm.write(() => {
      miscsRealm.create(
        'Misc',
        new Misc({
          type,
          slug_list,
        }),
      );
    });
  };

  //CONTENT FUNCTIONS
  const createContent = (
    type,
    category_slug,
    question,
    option_list = [],
    option_type = '',
    long_question = '',
    long_long_question = '',
    priority = 0,
    editable = true,
    hidable = false,
  ) => {
    const contentsRealm = realmRef.current;
    contentsRealm.write(() => {
      contentsRealm.create(
        'AppContent',
        new AppContent({
          type,
          category_slug,
          question,
          option_list,
          option_type,
          long_question,
          long_long_question,
          priority,
          editable,
          hidable,
        }),
      );
    });
  };

  // UPDOWNVOTE FOR TOPICS
  const voteTopic = (topic, property_name, property_value) => {
    const topicsRealm = realmRef.current;
    topicsRealm.write(() => {
      const realmTopic = topicsRealm.objectForPrimaryKey(
        'Topic',
        new ObjectId(topic._id),
      );
      if (parseInt(property_value, 10) > 0) {
        realmTopic[property_name] = realmTopic[property_name] + 1;
      } else {
        realmTopic[property_name] = realmTopic[property_name] - 1;
      }
    });
  };

  const getLatestHappyHour = () => {
    const realm = realmRef.current;
    if (realm) {
      const happyHours = realm
        .objects('BlindDateSession')
        .filtered('start_time < $0', new Date())
        .filtered('end_time > $0', new Date());
      return happyHours.length;
    }
    return 0;
  };

  const getCommunityTopics = (community_name) => {
    const realm = realmRef.current;
    if (realm) {
      //  console.log('getCommunityTopics function call params:', community_name);
      const topics = realm
        .objects('Topic')
        .filtered('community == $0', community_name);
      return topics;
    }
    return [];
  };

  const checkSpeakeasyCode = (speakeasy_code) => {
    const realm = realmRef.current;
    if (realm) {
      const speakEasy = realm
        .objects('BlindDateSession')
        .filtered('speakeasy_code == $0', speakeasy_code);
      // console.log('slect', speakEasy);
      // console.log('code is success:', speakeasy_code);
      if (speakEasy.length > 0) {
        setActiveSpeakeasy(speakEasy[0]);
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const getSpeakeasy = (speakeasy_code) => {
    const realm = realmRef.current;
    if (realm) {
      const speakEasy = realm
        .objects('BlindDateSession')
        .filtered('speakeasy_code == $0', speakeasy_code.toUpperCase())
        .sorted('end_time', true);
      if (speakEasy.length > 0) {
        return speakEasy[0];
      } else {
        return null;
      }
    }
    return null;
  };

  const getSpeakeasyById = (_id) => {
    const realm = realmRef.current;
    if (realm) {
      const speakEasy = realm.objectForPrimaryKey(
        'BlindDateSession',
        new ObjectId(_id),
      );
      if (speakEasy && speakEasy.speakeasy_code) {
        return speakEasy;
      } else {
        return null;
      }
    }
    return null;
  };

  return (
    <AppContentContext.Provider
      value={{
        createContent,
        createMisc,
        miscs,
        contents,
        topics,
        voteTopic,
        appVersion,
        getLatestHappyHour,
        latestHappyHour,
        checkSpeakeasyCode,
        activeSpeakeasy,
        getSpeakeasy,
        getSpeakeasyById,
        getCommunityTopics,
      }}>
      {children}
    </AppContentContext.Provider>
  );
};

const useAppContent = () => {
  const appContent = useContext(AppContentContext);
  if (appContent == null) {
    throw new Error('useAuth() called outside of a AppContentProvider?');
  }
  return appContent;
};

export {AppContentProvider, useAppContent};
