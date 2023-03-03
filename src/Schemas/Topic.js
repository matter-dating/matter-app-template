import {ObjectId} from 'bson';

export class Topic {
  constructor({
    partition = 'PUBLIC',
    _id = new ObjectId(),
    question,
    category_slug,
    community = '',
  }) {
    this._partition = partition;
    this._id = _id;
    this.question = question;
    this.category_slug = category_slug;
    this.up_vote = 0;
    this.down_vote = 0;
    this.community = community;
  }

  static schema = {
    name: 'Topic',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      question: 'string',
      category_slug: 'string',
      community: 'string?',
      up_vote: 'int',
      down_vote: 'int',
    },
    primaryKey: '_id',
  };
}
