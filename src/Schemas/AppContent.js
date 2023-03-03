import { ObjectId } from "bson";

export class AppContent {
    constructor({
      partition = 'PUBLIC',
      id = new ObjectId(),
      type,
      category_slug,
      question,
      option_list,
      option_type,
      long_question,
      long_long_question,
      priority,
      editable,
      hidable
    }) {
      this._partition = partition;
      this._id = id;
      this.type = type;
      this.category_slug = category_slug;
      this.question = question;
      this.option_list = option_list;
      this.option_type = option_type;
      this.long_question = long_question;
      this.long_long_question = long_long_question;
      this.priority = priority;
      this.editable = editable;
      this.hidable = hidable;
    }
  
    static schema = {
      name: "AppContent",
      properties: {
        _id: "objectId",
        _partition: "string",
        type: "string",
        category_slug: "string",
        option_list: "string[]",
        question: "string",
        option_type: "string",
        long_question: 'string',
        long_long_question: 'string',
        priority: 'int',
        editable: 'bool',
        hidable: 'bool',
      },
      primaryKey: "_id",
    };
}
 