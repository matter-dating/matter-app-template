export default Message = {
  name: "Message",
  properties: {
    id: "string",
    user_id: "string",
    room_id: 'string',
    text: "string",
    timetoken: 'string',
    status: 'string',
    type: 'string',
    added: 'bool?',
    payload: 'string?',
    expire_at: 'date?',
    duration: 'int?',
    width: 'string?',
    height: 'string?',
    reaction: 'string?',
  },
  primaryKey: "id",
};