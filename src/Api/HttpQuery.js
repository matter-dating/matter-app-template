import {getRealmApp} from '../getRealmApp';
import {recommendation_server_address} from '../Utils/EnvironmentVariables';
import {makeid} from '../Utils/Functions';
export default class HttpQuery {
  constructor() {
    this.server = recommendation_server_address;
    this.url = '/api/v1/feed/simple';
    this.singleUrl = '/api/v1/user/profile';
    this.nextUrl = '/api/v1/feed/next';
    this.speakEasyUrl = '/api/v1/feed/speakeasy';
    this.session_id = makeid(20);
    this.pageNumber = 0;
    this.headers = new Headers();
    this.headers.set('Accept', 'application/json');
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('X-API-KEY', '2f7924a9-e0e2-48c1-8b44-6410c4343323');
  }

  get(
    cachedUserIds,
    success,
    subscription_expire_date,
    widen_preference = false,
  ) {
    fetch(this.server + this.url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        location: [0, 0],
        uid: getRealmApp().currentUser.id,
        cached_users: cachedUserIds,
        widen_preference: widen_preference,
        premium_expiration: subscription_expire_date
          ? subscription_expire_date.toISOString().split('.')[0]
          : new Date().toISOString().split('.')[0],
        config: {},
        api_version: '3.0.0',
      }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            success(data);
            this.pageNumber = this.pageNumber + 1;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  getSingle(uid, success) {
    fetch(this.server + this.singleUrl + '?uid=' + uid + '&api_version=3.0.0', {
      method: 'GET',
      headers: this.headers,
    })
      .then((response) => {
        response.json().then((data) => {
          success(data.data);
        });
      })
      .catch((e) => console.error(e));
  }

  getNextBatch(
    cachedUserIds,
    success,
    subscription_expire_date,
    widen_preference = false,
  ) {
    fetch(this.server + this.nextUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        location: [0, 0],
        uid: getRealmApp().currentUser.id,
        cached_users: cachedUserIds,
        widen_preference: widen_preference,
        premium_expiration: subscription_expire_date
          ? subscription_expire_date.toISOString().split('.')[0]
          : new Date().toISOString().split('.')[0],
        config: {},
        api_version: '3.0.0',
      }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            success(data);
            this.pageNumber = this.pageNumber + 1;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  getSpeakeasyUsers(code, success) {
    fetch(this.server + this.speakEasyUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        user_id: getRealmApp().currentUser.id,
        speakeasy_code: code.toLowerCase(),
        api_version: '3.0.0',
      }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            success(data);
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}
