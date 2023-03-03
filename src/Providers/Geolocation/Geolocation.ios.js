import Geolocation from 'react-native-geolocation-service';
import {ios_build_number} from '../../Utils/EnvironmentVariables';

export const GetLocation = (success, error, user, updateUserData) => {
  Geolocation.requestAuthorization('whenInUse').then((permission) => {
    if (permission === 'granted') {
      Geolocation.getCurrentPosition(
        (info) => {
          user
            .callFunction('updateLocationRefactor', [
              info.coords,
              ios_build_number,
            ])
            .then((res) => {
              updateUserData().then((uud) => {
                success();
              });
            });
        },
        (e) => {
          // console.log('error', e);
          error();
        },
        {timeout: 5000},
      );
    } else error();
  });
};
