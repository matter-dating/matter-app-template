import { ObjectId } from "bson";

export class Invitation {

  constructor({
    _id,
    user_id,
    first_name,
    limit = 5,
    code,
    region = 'noList',
    photo_uploaded = false,
    is_valid_photo = 'notChecked',
    report_count = 0,
    seen_report_count = 0,
    under_age = false,
    banned = false,
    hidden = false,
    game_score = 0,
    joined_speakeasy_list = [],
  }) {
    this._partition = "user=" + user_id;
    this._id = _id;
    this.user_id = user_id;
    this.first_name = first_name;
    this.limit = limit;
    this.code = code;
    this.region = region;
    this.photo_uploaded = photo_uploaded;
    this.is_valid_photo = is_valid_photo;
    this.report_count = report_count;
    this.seen_report_count = seen_report_count;
    this.under_age = under_age;
    this.banned = banned;
    this.hidden = hidden;
    this.game_score = game_score;
    this.joined_speakeasy_list = joined_speakeasy_list;
  }

  static schema = {
    name: "Invitation",
    properties: {
      _id: "objectId",
      _partition: 'string',
      user_id: "string",
      first_name: "string",
      limit: "int",
      code: "string",
      region: "string?",
      photo_uploaded: "bool?",
      is_valid_photo: "string?",
      report_count: "int?",
      seen_report_count: "int?",
      under_age: "bool?",
      banned: "bool?",
      hidden: "bool?",
      game_score: "int?",
      subscription_expire_date: 'date?',
      joined_speakeasy_list: {type: 'list', objectType: 'string'},
    },
    primaryKey: "_id",
  };
  
}
