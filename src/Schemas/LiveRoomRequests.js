import { ObjectId } from "bson";

export class LiveRoomRequests {
  static schema = {
    name: "Match",
    properties: {
      _id: "objectId",
      _partition: "string",
      user_id: "string",
      other_user_id: "string",
      created_at: 'date',
      updated_at: 'date'
    },
    primaryKey: "_id",
  };
}