import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {ios_build_number} from '../../Utils/EnvironmentVariables';

export const GetLocation = async (success, error, user, updateUserData) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition((info) => {
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
      }, error);
    } else {
      error();
    }
  } catch (err) {
    error();
  }
};
