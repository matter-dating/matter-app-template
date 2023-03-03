import React, {useContext, useEffect, useRef} from 'react';
import 'react-native-get-random-values';
import Realm from 'realm';
import AppFlag from '../Schemas/AppFlag';
import {makeid} from '../Utils/Functions';

const AppFlagContext = React.createContext(null);

const AppFlagProvider = ({children}) => {
  const realmRef = useRef(null);

  useEffect(() => {
    realmRef.current = new Realm({
      path: 'appflag',
      schema: [AppFlag],
    });

    return () => {
      // cleanup function
      const realm = realmRef.current;
      if (realm) {
        realm.close();
        realmRef.current = null;
      }
    };
  }, []);

  const checkFlag = (name) => {
    const realm = realmRef.current;
    const flag = realm.objects('AppFlag').filtered(`name = "${name}"`);
    if (flag.length === 0) {
      return null;
    } else {
      return flag[0];
    }
  };

  const setFlag = (name, value) => {
    const realm = realmRef.current;
    realm.write(() => {
      realm.create(
        'AppFlag',
        {
          id: makeid(10),
          name: name,
          value: value,
          timestamp: new Date(),
        },
        true,
      );
    });
  };

  const updateFlag = (name, value) => {
    const realm = realmRef.current;
    realm.write(() => {
      const flag = realm.objects('AppFlag').filtered(`name = "${name}"`)[0];
      if (flag) {
        flag.value = value;
      } else {
        realm.create(
          'AppFlag',
          {
            id: makeid(10),
            name: name,
            value: value,
            timestamp: new Date(),
          },
          true,
        );
      }
    });
  };

  return (
    <AppFlagContext.Provider
      value={{
        checkFlag,
        setFlag,
        updateFlag,
      }}>
      {children}
    </AppFlagContext.Provider>
  );
};

const useAppFlag = () => {
  const appFlag = useContext(AppFlagContext);
  if (appFlag == null) {
    throw new Error('useAppFlag() called outside of a AppFlagProvider?');
  }
  return appFlag;
};

export {AppFlagProvider, useAppFlag};
