import { ObjectId } from "bson";

export class Match {
  static schema = {
    name: "Match",
    properties: {
      _id: "objectId",
      _partition: "string",
      user_id: "string",
      other_user_id: "string",
      other_user_fname: 'string',
      other_user_lname: 'string',
      other_user_dob: 'date',
      other_user_verified: 'bool',
      pubnub_room_id: 'string',
      agora_room_id: 'string',
      source: 'string?',
      note: 'string?',
      content: 'string?',
      last_seen_time: 'date?',
      enable_text: 'bool?',
      created_at: 'date',
      updated_at: 'date'
    },
    primaryKey: "_id",
  };
}