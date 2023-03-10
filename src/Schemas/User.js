export class User {
  static schema = {
    name: "User",
    properties: {
      _id: "objectId",
      _partition: "string",
      first_name: "string",
      last_name:'string',
      email: "string",
      is_hidden: "boolean",
      is_online: "boolean",
      is_seo_result: "boolean",
      date_of_birth: 'date',
      age_visible: 'boolean',
      location: "string[]",
      gender: 'string',
      interest: 'string',
      profile_hd_images: 'string[]',
      is_photo_verified: 'boolean',
      last_active_timestamp: 'date',
      fcm_token: 'string',
      status: 'int',
      preference: 'string[]',
      user_info: 'string[]',
      notification: 'string[]',
      created_at: 'date',
      updated_at: 'date',
      subscription_expire_date: 'date?',
    },
    primaryKey: "_id",
  };
}