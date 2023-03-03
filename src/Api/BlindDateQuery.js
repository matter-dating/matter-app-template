import {getRealmApp} from '../getRealmApp';
import {blind_date_server_address} from '../Utils/EnvironmentVariables';
import dayjs from 'dayjs';
import {logMatchServerHappyHour} from '../Utils/Analytics';

export default class BlindDateQuery {
  constructor() {
    this.server = blind_date_server_address;
    this.joinUrl = '/api/v1/user/join';
    this.leaveUrl = '/api/v1/user/leave';
    this.blindDateUrl = '/api/v1/blinddate/status';
    this.questionUrl = '/api/v1/user/fetch_question';
    this.statusUrl = '/api/v1/user/status';
    this.startUrl = '/api/v1/user/started';
    this.endUrl = '/api/v1/user/ended';
    this.joinAgoraUrl = '/api/v1/user/agora';
    this.speakeasyUrl = '/api/v1/user/speakeasy';
    this.endUrl = '/api/v1/user/ended';
    this.headers = new Headers();
    this.headers.set('Accept', 'application/json');
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('X-API-KEY', '2f7924a9-e0e2-48c1-8b44-6410c4343323');
  }

  getBlindDate(location, success) {
    fetch(this.server + this.blindDateUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        location,
      }),
    })
      .then((resp) => {
        resp.json().then((res) => {
          success(res);
        });
      })
      .catch((e) => console.error(e));
  }

  getQuestions(
    first_user_id = '621dd9225d3d2554163e55fd',
    second_user_id = '62341def29231e91e9a7271e',
    success,
  ) {
    fetch(this.server + this.questionUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        first_user_id: first_user_id,
        second_user_id: second_user_id,
      }),
    })
      .then((resp) => {
        resp.json().then((res) => {
          success(res);
        });
      })
      .catch((e) => console.error(e));
  }

  join(
    userData,
    blind_date_group_id,
    agora_room_id,
    subscription_expire_date,
    success,
  ) {
    fetch(this.server + this.joinUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        user_id: userData.user_id,
        blind_date_group_id: blind_date_group_id,
        gender: userData.gender,
        interest: userData.interest,
        user_info: {
          age: dayjs().diff(dayjs(userData.date_of_birth), 'year'),
        },
        agora_room_id: agora_room_id,
        premium_expiration: subscription_expire_date
          ? subscription_expire_date.toISOString().split('.')[0]
          : new Date().toISOString().split('.')[0],
      }),
    })
      .then((response) => {
        // console.log(response);
        response.json().then((res) => {
          if (!res.data.should_wait) {
            logMatchServerHappyHour(blind_date_group_id);
          }
          success(res);
        });
      })
      .catch((e) => console.error(e));
  }

  leave(agora_room_id, success) {
    fetch(this.server + this.leaveUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        user_id: getRealmApp().currentUser.id,
        agora_room_id,
      }),
    })
      .then((response) => {
        success();
      })
      .catch((e) => console.error(e));
  }

  status(success) {
    fetch(this.server + this.statusUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        user_id: getRealmApp().currentUser.id,
      }),
    })
      .then((response) => {
        response.json().then((res) => {
          success(res.data);
        });
      })
      .catch((e) => console.error(e));
  }

  start(user_id, other_user_id, blind_date_group_id, agora_room_id) {
    fetch(this.server + this.startUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        user_id,
        other_user_id,
        blind_date_group_id,
        agora_room_id,
      }),
    })
      .then((response) => {
        response.json().then((res) => {
          // console.log(res.data);
        });
      })
      .catch((e) => console.error(e));
  }

  join_agora(user_id, blind_date_group_id, agora_room_id) {
    fetch(this.server + this.joinAgoraUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        user_id,
        agora_room_id,
        blind_date_group_id,
      }),
    })
      .then((response) => {
        response.json().then((res) => {
          // console.log(res.data);
        });
      })
      .catch((e) => console.error(e));
  }

  end(
    user_id,
    other_user_id,
    blind_date_group_id,
    reason,
    extend_applied,
    elapsed_time,
    agora_room_id,
  ) {
    fetch(this.server + this.endUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        user_id,
        other_user_id,
        blind_date_group_id,
        reason,
        extend_applied,
        elapsed_time,
        agora_room_id,
      }),
    })
      .then((response) => {
        response.json().then((res) => {
          // console.log(res.data);
        });
      })
      .catch((e) => console.error(e));
  }

  speakeasy(user_id, blind_date_group_id, speakeasy_code) {
    fetch(this.server + this.speakeasyUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        user_id,
        blind_date_group_id,
        speakeasy_code,
      }),
    })
      .then((response) => {
        response.json().then((res) => {
          // console.log(res.data);
        });
      })
      .catch((e) => console.error(e));
  }
}
