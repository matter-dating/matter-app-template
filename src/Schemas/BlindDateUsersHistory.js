import { ObjectId } from "bson";

export class BlindDateUserHistory {
  constructor({
    user,
    currentState,
    state,
    extraData,
    id = new ObjectId(),
  }) {

    this._id = id;
    this._partition = 'user='+user.id;
    this.user_id = user.id;
    this.state = state;
    this.agora_room_id = '';
    this.blind_date_group_id = '';
    this.timestamp = new Date();
    this.stale_time = new Date();
    try {
      this.setStateVariables(currentState, state, extraData);
    }
    catch(e) {
      console.error(e);
    }

  }

  setStateVariables(currentState, state, extraData) {
    if((currentState === null || currentState === undefined || currentState.state === 'NOT_ACTIVE') && state === 'WAITING_TO_START'){
      if(extraData.blind_date_to_start > 0) {
        //throw exception
      }
      this.blind_date_group_id = extraData.blind_date_group_id;
      this.blind_date_to_end = extraData.blind_date_to_end.toString();
      this.stale_time = new Date(new Date().getTime() + extraData.blind_date_to_end * 60000);
    }
    else if(currentState && currentState.state === 'WAITING_TO_START' && state === 'WAITING_STARTED') {
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.stale_time = currentState.stale_time;
      this.blind_date_to_end = currentState.blind_date_to_end;
    }
    else if(currentState && currentState.state === 'WAITING_STARTED' && state === 'MATCH_FOUND' ) {
        //throw exception
    }
    else if(currentState && currentState.state === 'MATCH_FOUND' && state === 'MATCH_WAITING_TO_JOIN' ) {
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.blind_date_to_end = currentState.blind_date_to_end;
      this.agora_room_id = currentState.agora_room_id;
      this.other_user_id = currentState.other_user_id;
      this.duration = currentState.duration;
      this.user_info = currentState.user_info;
      this.wait_duration = currentState.wait_duration;
      this.topic = currentState.topic;
      this.stale_time = new Date(new Date().getTime() + 10 * 1000);
    }
    else if(currentState && currentState.state === 'MATCH_WAITING_TO_JOIN' && state === 'WAITING_STARTED' ) {
      //server
      // this.blind_date_group_id = extraData.blind_date_group_id;
      // this.stale_time = new Date(new Date().getTime() + parseInt(extraData.blind_date_to_end) * 60000);
    }
    else if(currentState && currentState.state === 'MATCH_FOUND' && state === 'IN_BLIND_DATE' ) {
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.blind_date_to_end = currentState.blind_date_to_end;
      this.agora_room_id = currentState.agora_room_id;
      this.other_user_id = currentState.other_user_id;
      this.duration = currentState.duration;
      this.user_info = currentState.user_info;
      this.topic = currentState.topic;
      this.stale_time = new Date(new Date().getTime() + (parseInt(currentState.duration) + 3) * 1000);
    }
    else if(currentState && currentState.state === 'MATCH_WAITING_TO_JOIN' && state === 'IN_BLIND_DATE' ) {
      this.blind_date_group_id = currentState.blind_date_group_id;
      this.blind_date_to_end = currentState.blind_date_to_end;
      this.agora_room_id = currentState.agora_room_id;
      this.other_user_id = currentState.other_user_id;
      this.duration = currentState.duration;
      this.user_info = currentState.user_info;
      this.topic = currentState.topic;
      this.stale_time = new Date(new Date().getTime() + (parseInt(currentState.duration) + 3) * 1000);
    }
    else if(currentState && currentState.state === 'IN_BLIND_DATE' && state === 'BLIND_DATE_FEEDBACK' ) {
      this.blind_date_to_end = currentState.blind_date_to_end;
      this.agora_room_id = currentState.agora_room_id;
      this.other_user_id = currentState.other_user_id;
      this.duration = currentState.duration;
      this.user_info = currentState.user_info;
    }
    else if(currentState && currentState.state === 'BLIND_DATE_FEEDBACK' && state === 'BLIND_DATE_FEEDBACK_CONFIRMED' ) {
      this.blind_date_to_end = currentState.blind_date_to_end;
      this.user_info = currentState.user_info;
      this.feedback = extraData.feedback;
    }
    else if(currentState && currentState.state === 'BLIND_DATE_FEEDBACK_CONFIRMED' && state === 'WAITING_STARTED' ) {
      //server
    }
    else if(state === 'NOT_ACTIVE'){
      // do nothing
    }
    else{
      //throw exception
    }
  }

  static schema = {
    name: "BlindDateUsersHistory",
    properties: {
      _id: "objectId",
      _partition: "string",
      user_id: "string",
      blind_date_group_id: 'string',
      other_user_id: "string?",
      agora_room_id: 'string',
      timestamp: 'date',
      stale_time: 'date',
      feedback: 'string?',
      duration: 'string?',
      wait_duration: 'string?',
      user_info: 'string?',
      blind_date_to_end: 'string?',
      topic: 'string?',
      state: 'string'
    },
    primaryKey: "_id",
  };
}