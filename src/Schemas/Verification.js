import { ObjectId } from "bson";

export class Verification {

  constructor({
    _id,
    user_id,
    type = 'photo',
    pro_pic_url,
    selfie_url,
    status = 0, //pending
    reason = '',
  }) {
    this._id = _id;
    this.user_id = user_id;
    this._partition = "user=" + user_id;
    this.type = type;
    this.pro_pic_url = pro_pic_url;
    this.selfie_url = selfie_url;
    this.status = status;
    this.reason = reason;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static schema = {
    name: "Verification",
    properties: {
      _id: "objectId",
      user_id: 'string',
      _partition: 'string',
      type: "string",
      pro_pic_url: "string",
      selfie_url: "string",
      status: "int",
      reason: "string",
      created_at: 'date',
      updated_at: 'date',
    },
    primaryKey: "_id",
  };
}