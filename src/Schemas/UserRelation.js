import { ObjectId } from "bson";

export class UserRelation {

  constructor({
    user_id,
    target_id,
    type,
    content,
    user_fname,
    user_location_name,
    id = new ObjectId(),
  }) {
    this._partition = "user=" + user_id;
    this._id = id;
    this.user_id = user_id;
    this.target_id = target_id;
    this.type = type;
    this.content = content;
    this.user_fname = user_fname;
    this.user_location_name = user_location_name;
  }

  static schema = {
    name: "UserRelation",
    properties: {
      _id: "objectId",
      _partition: "string",
      user_id: "string",
      target_id: "string",
      type: 'string',
      content: 'string',
      user_fname: 'string?',
      user_location_name: 'string?',
      source: 'string?',
      note: 'string?',
      created_at: 'date',
      updated_at: 'date'
    },
    primaryKey: "_id",
  };
}