import {ObjectId} from 'bson';

export const LocationSchema = {
  name: 'Location',
  embedded: true, // default: false
  properties: {
    type: 'string?',
    coordinates: {type: 'list', objectType: 'double'},
  },
};

export class BlindDateSession {
  constructor(partition = 'PUBLIC', id = new ObjectId()) {
    this._partition = partition;
    this._id = id;
  }

  static schema = {
    name: 'BlindDateSession',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      start_time: 'date?',
      duration: 'double?',
      end_time: 'date?',
      filter_users: 'bool?',
      blind_date_duration: 'int?',
      radius: 'int?',
      status: 'string?',
      location: 'Location?',
      type: 'string?',
      speakeasy_code: 'string?',
      speakeasy_name: 'string?',
      speakeasy_url: 'string?',
      speakeasy_color: 'string?',
      speakeasy_logo: 'string?',
    },
    primaryKey: '_id',
  };
}
