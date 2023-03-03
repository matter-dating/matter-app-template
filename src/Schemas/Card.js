import { ObjectId } from "bson";

export class Card {
  constructor({
    user_id,
    type,
    content_type,
    content,
    groupable,
    priority = 10,
    id = new ObjectId(),
  }) {
    this._id = id;
    this._partition = 'user='+user_id;
    this.user_id = user_id;
    this.groupable = groupable;
    this.priority = priority;
    this.content_type = content_type;
    this.content = content;
    this.type = type;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static schema = {
    name: "Card",
    properties: {
      _id: "objectId",
      _partition: "string",
      user_id: "string",                              
      type:'string',
      content: 'string',
      content_type: 'string',
      groupable: 'bool',
      priority: 'int?',
      created_at: 'date',
      updated_at: 'date',
      status:'string?'
    },
    primaryKey: '_id',
  };
}