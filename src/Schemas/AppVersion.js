export class AppVersion {
    static schema = {
      name: "AppVersion",
      properties: {
        _id: "objectId",
        _partition: "string",
        ios_build_number: "int",
        android_build_number: "int",
        timestamp: 'date',
        ios_update_mandatory: 'bool?',
        android_update_mandatory: 'bool?',
        texting_enabled: 'bool?'
      },
      primaryKey: "_id",
    };
  }
  