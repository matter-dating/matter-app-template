import {ObjectId} from 'bson';

export class BlindDateState {
  constructor({currentState, state, extraData, id = new ObjectId()}) {
    this._id = id;
    this.state = state;
    this.timestamp = new Date();

    this.setStateVariables(currentState, state, extraData);
  }

  setStateVariables(currentState, state, extraData) {
    if (state === 'BLIND_ACTIVE') {
      if (extraData) {
        this.blind_date_group_id = extraData.blind_date_group_id;
        this.stale_time = extraData.blind_date_end_time;
        this.blind_date_duration = extraData.blind_date_duration;
      } else {
        this.blind_date_group_id = currentState.blind_date_group_id;
        this.stale_time = currentState.stale_time;
        this.blind_date_duration = currentState.blind_date_duration;
      }
    } else if (
      currentState &&
      currentState.state === 'BLIND_ACTIVE' &&
      state === 'JOINED_WAITING'
    ) {
      this.stale_time = currentState.stale_time;
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.blind_date_duration = currentState.blind_date_duration;

      this.other_user_id = extraData && extraData.should_wait ? null : 'exists';
      this.agora_room_id = extraData.agora_info.agora_room_id;
      this.agora_room_topic = extraData.agora_info.room_topic;
      // console.log(extraData);
      this.total_blind_dates = extraData.total_blind_dates;
      this.blind_dates_left = extraData.blind_dates_left;
    } else if (
      currentState &&
      currentState.state === 'JOINED_WAITING' &&
      state === 'JOINED_TALKING'
    ) {
      this.stale_time = currentState.stale_time;
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.blind_date_duration = currentState.blind_date_duration;

      this.other_user_id = extraData.other_user_id;
      this.agora_room_id = currentState.agora_room_id;
      this.agora_room_topic = currentState.agora_room_topic;
      this.end_time = new Date(
        new Date().getTime() + currentState.blind_date_duration * 1000,
      );
      this.total_blind_dates = currentState.total_blind_dates;
      this.blind_dates_left = currentState.blind_dates_left;
    } else if (
      currentState &&
      currentState.state === 'JOINED_WAITING' &&
      state === 'FEEDBACK'
    ) {
      this.stale_time = currentState.stale_time;
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.blind_date_duration = currentState.blind_date_duration;

      this.other_user_id = currentState.other_user_id;
      this.agora_room_id = currentState.agora_room_id;
      this.agora_room_topic = currentState.agora_room_topic;

      this.total_blind_dates = currentState.total_blind_dates;
      this.blind_dates_left = currentState.blind_dates_left;
    } else if (
      currentState &&
      currentState.state === 'JOINED_WAITING' &&
      state === 'JOINED_WAITING'
    ) {
      // console.log(currentState.blind_date_group_id);
      this.stale_time = currentState.stale_time;
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.blind_date_duration = currentState.blind_date_duration;

      this.agora_room_id = currentState.agora_room_id;
      this.total_blind_dates = currentState.total_blind_dates;
      this.blind_dates_left = currentState.blind_dates_left;
    } else if (
      currentState &&
      currentState.state === 'JOINED_TALKING' &&
      state === 'JOINED_WAITING'
    ) {
      // console.log(currentState.blind_date_group_id);
      this.stale_time = currentState.stale_time;
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.blind_date_duration = currentState.blind_date_duration;

      this.other_user_id = currentState.other_user_id;
      this.agora_room_id = currentState.agora_room_id;
      this.agora_room_topic = currentState.agora_room_topic;
      this.total_blind_dates = currentState.total_blind_dates;
      this.blind_dates_left = currentState.blind_dates_left;
    } else if (
      currentState &&
      currentState.state === 'JOINED_TALKING' &&
      state === 'FEEDBACK'
    ) {
      this.stale_time = currentState.stale_time;
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.blind_date_duration = currentState.blind_date_duration;

      this.other_user_id = currentState.other_user_id;
      this.agora_room_id = currentState.agora_room_id;
      this.agora_room_topic = currentState.agora_room_topic;
      this.total_blind_dates = currentState.total_blind_dates;
      this.blind_dates_left = currentState.blind_dates_left;
    } else if (
      currentState &&
      currentState.state === 'FEEDBACK' &&
      state === 'JOINED_WAITING'
    ) {
      this.stale_time = currentState.stale_time;
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.blind_date_duration = currentState.blind_date_duration;

      this.other_user_id = extraData && extraData.should_wait ? null : 'exists';
      this.agora_room_id = extraData.agora_info.agora_room_id;
      this.agora_room_topic = extraData.agora_info.room_topic;
      this.total_blind_dates = extraData.total_blind_dates;
      this.blind_dates_left = extraData.blind_dates_left;
    } else if (
      currentState &&
      currentState.state === 'FEEDBACK' &&
      state === 'FEEDBACK'
    ) {
      this.stale_time = currentState.stale_time;
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.blind_date_duration = currentState.blind_date_duration;

      this.other_user_id = currentState.other_user_id;
      this.agora_room_id = currentState.agora_room_id;
      this.agora_room_topic = currentState.agora_room_topic;
      this.total_blind_dates = currentState.total_blind_dates;
      this.blind_dates_left = currentState.blind_dates_left;
    } else if (state === 'NOT_ACTIVE') {
      this.stale_time = new Date();
      this.blind_date_group_id = '';
      this.blind_date_duration = 0;
    }
  }

  static schema = {
    name: 'BlindDateState',
    properties: {
      _id: 'objectId',
      state: 'string',
      timestamp: 'date',
      blind_date_group_id: 'string',
      blind_date_duration: 'int',
      stale_time: 'date',

      total_blind_dates: 'int?',
      blind_dates_left: 'int?',

      agora_room_id: 'string?',
      agora_room_topic: 'string?',
      other_user_id: 'string?',
      end_time: 'date?',
    },
    primaryKey: '_id',
  };
}
