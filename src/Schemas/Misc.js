import { ObjectId } from "bson";

export class Misc {
    constructor({
      partition = 'PUBLIC',
      id = new ObjectId(),
      type,
      slug_list
    }) {
      this._partition = partition;
      this._id = id;
      this.type = type;
      this.slug_list = slug_list;
    }
  
    static schema = {
      name: "Misc",
      properties: {
        _id: "objectId",
        _partition: "string",
        type: "string",
        slug_list: "string[]"
      },
      primaryKey: "_id",
    };
  }
  