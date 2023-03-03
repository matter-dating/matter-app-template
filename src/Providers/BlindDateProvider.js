import React, {useContext, useState, useEffect, useRef} from 'react';
import 'react-native-get-random-values';
import Realm from 'realm';
import {BlindDateState} from '../Schemas/BlindDateState';

const BlindDateContext = React.createContext(null);

const BlindDateProvider = ({children}) => {
  const realmRef = useRef(
    new Realm({
      path: 'blinddate',
      schema: [BlindDateState.schema],
      schemaVersion: 3,
    }),
  );

  const currentStateRef = useRef(
    realmRef.current.objects('BlindDateState').sorted('timestamp', true)[0],
  );
  const [currentState, setCurrentState] = useState(currentStateRef.current);
  useEffect(() => {
    const syncBlindDateState = realmRef.current
      .objects('BlindDateState')
      .sorted('timestamp', true);
    syncBlindDateState.addListener(() => {
      currentStateRef.current = syncBlindDateState[0];
      setCurrentState(currentStateRef.current);
    });
  }, []);

  const updateState = (state, extraData = null) => {
    const realm = realmRef.current;
    realm.write(() => {
      realm.create(
        'BlindDateState',
        new BlindDateState({
          currentState: currentStateRef.current,
          state,
          extraData,
        }),
      );
    });
  };

  const blindDateCount = () => {
    return realmRef.current
      .objects('BlindDateState')
      .filtered('state == "JOINED_TALKING"').length;
  };

  return (
    <BlindDateContext.Provider
      value={{
        currentState,
        updateState,
        currentStateRef,
        blindDateCount,
      }}>
      {children}
    </BlindDateContext.Provider>
  );
};

const useBlindDate = () => {
  const blindDate = useContext(BlindDateContext);
  if (blindDate == null) {
    throw new Error('useMessages() called outside of a BlindDateProvider?');
  }
  return blindDate;
};

export {BlindDateProvider, useBlindDate};
