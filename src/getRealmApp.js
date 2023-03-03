import 'react-native-get-random-values';
import Realm from 'realm';
import {mongodb_realm_app_id} from './Utils/EnvironmentVariables';

let app;

// Returns the shared instance of the Realm app.
export function getRealmApp() {
  if (app === undefined) {
    const appId = mongodb_realm_app_id; // Set Realm app ID here.
    const appConfig = {
      id: appId,
      timeout: 10000,
      app: {
        name: 'default',
        version: '0',
      },
    };
    app = new Realm.App(appConfig);
  }
  return app;
}
