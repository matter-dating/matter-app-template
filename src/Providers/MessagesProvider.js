import {usePubNub} from 'pubnub-react';
import React, {useContext, useState, useEffect, useRef} from 'react';
import 'react-native-get-random-values';
import Realm from 'realm';
import Message from '../Schemas/Message';
import {useAuth} from './AuthProvider';
import {useNavigation} from '@react-navigation/native';
import {getActiveRouteName, getActiveRouteParams} from '../Utils/Functions';

const messagesRealmSchemaVersion = 3;

const MessagesContext = React.createContext(null);

const MessagesProvider = ({children}) => {
  const {user} = useAuth();
  const realmRef = useRef(null);
  const pubnub = usePubNub();
  const navigation = useNavigation();
  const [lastRecieved, setLastRecieved] = useState(new Date());
  useEffect(() => {
    if (!user) {
      return;
    }
    realmRef.current = new Realm({
      path: 'messages',
      schema: [Message],
      schemaVersion: messagesRealmSchemaVersion,
    });

    pubnub.channelGroups.addChannels(
      {
        channels: ['o_' + user.id],
        channelGroup: user.id,
      },
      (status) => {
        if (status.error) {
          console.error('operation failed w/ error:', status);
        }
      },
    );

    pubnub.subscribe({
      channelGroups: [user.id],
    });

    pubnub.addListener({
      message: (message) => {
        if (message.actualChannel.includes('-state')) {
          updateMessageStates(message);
        } else {
          createMessageFromPubnub(message);
        }
      },
      messageAction: (message) => {
        // handle message action
        if (message.event === 'added') {
          updateMessageReaction(
            message.data.messageTimetoken,
            message.channel,
            {
              value: message.data.value,
              actionTimeToken: message.data.actionTimetoken,
            },
          );
        } else if (message.event === 'removed') {
          removeMessageReactionOnlyRealm(
            message.data.messageTimetoken,
            message.channel,
          );
        }
      },
    });

    pubnub.channelGroups.listChannels(
      {
        channelGroup: user.id,
      },
      (status, response) => {
        if (status.error) {
          console.error('operation failed w/ error:', status);
        } else if (
          response &&
          response.channels &&
          response.channels.length > 0
        ) {
          pubnub.fetchMessages(
            {
              channels: response.channels,
              start: (Date.now() * 10000).toString(),
              count: 100,
            },
            (stat, res) => {
              if (stat.error) {
                console.error('operation failed w/ error:', status);
              } else if (res && res.channels) {
                Object.entries(res.channels)
                  .sort()
                  .forEach(([key, value]) => {
                    clearChatRoomMessages(key);
                    if (key.includes('-state')) {
                      value.forEach((v) => {
                        updateMessageStates(v);
                      });
                    } else {
                      createMessages(value);
                    }
                    pubnub.getMessageActions(
                      {
                        channel: key,
                        start: (Date.now() * 10000).toString(),
                        count: 200,
                      },
                      (actionStatus, actionResponse) => {
                        if (actionStatus.error) {
                          console.error(
                            'operation failed message actions fetch w/ error:',
                            status,
                          );
                        } else if(actionResponse) {
                          actionResponse.data.forEach((ar) => {
                            if (ar.value !== 'smiley_face') {
                              updateMessageReaction(ar.messageTimetoken, key, {
                                value: ar.value,
                                actionTimeToken: ar.actionTimetoken,
                              });
                            }
                          });
                        }
                      },
                    );
                  });
              }
            },
          );
          addTokenToChannels(response.channels);
        }
      },
    );

    const unSentMessages = realmRef.current
      .objects('Message')
      .filtered('status == "0" || status == "-1"');
    unSentMessages.addListener((messages, changes) => {
      changes.insertions.forEach((index) => {
        const insertedMessage = messages[index];
        sendMessage(insertedMessage);
      });
    });

    return () => {
      // cleanup function
      const realm = realmRef.current;
      if (realm) {
        realm.close();
        realmRef.current = null;
      }
    };
  }, [user]);

  const addTokenToChannels = (channels) => {
    if (user.customData.fcm_token) {
      pubnub.push.addChannels(
        {
          channels: channels,
          device: user.customData.fcm_token,
          pushGateway: 'gcm',
        },
        (stat) => {
          if (stat.error) {
            console.error('device added error', stat);
          }
        },
      );
    }
  };

  const sendMessage = (message) => {
    pubnub.publish(
      {
        message: {
          text: message.text,
          publisher_id: message.user_id,
          type: message.type,
          duration: message.duration,
          width: message.width,
          height: message.height,
          payload: message.payload,
          pn_gcm: {
            notification: {
              title: user.customData.first_name,
              body:
                message.type === 'VOICE_NOTE'
                  ? 'Sent you a voice note'
                  : message.type === 'EXPRESSION'
                  ? 'Sent you a sticker'
                  : message.type === 'GIF'
                  ? 'Sent you a GIF'
                  : message.type === 'PHOTO'
                  ? 'Sent you a photo'
                  : message.text,
              sound: 'default',
            },
            data: {
              type: 'MESSAGE',
              payload: message.room_id,
              user_id: message.user_id,
              user_name: user.customData.first_name,
            },
            pn_exceptions: [user.customData.fcm_token],
          },
        },
        channel: message.room_id,
        sendByPost: true,
        storeInHistory: true,
      },
      (status, response) => {
        const realm = realmRef.current;
        if (status.error) {
          realm.write(() => {
            realm.create('Message', {id: message.id, status: '-1'}, true);
          });
        } else {
          realm.write(() => {
            realm.create(
              'Message',
              {
                id: message.id,
                timetoken: response.timetoken,
                status: '1',
              },
              true,
            );
          });
          setLastRecieved(new Date());
        }
      },
    );
  };

  const updateMessage = (message) => {
    const realm = realmRef.current;
    if (realm) {
      if (realm.isInTransaction) {
        message.added = false;
      } else {
        realm.write(() => {
          message.added = false;
        });
      }
    }
  };

  const updateMessageStatus = (message, url) => {
    const realm = realmRef.current;
    realm.write(() => {
      message.status = '0';
      message.payload = url;
    });
  };

  const updateMessageStatusFail = (message, status) => {
    const realm = realmRef.current;
    realm.write(() => {
      message.status = status;
    });
  };

  const createMessage = (
    room_id,
    message,
    type,
    payload = '',
    duration = 0,
    width = '0',
    height = '0',
    reaction = '',
  ) => {
    const realm = realmRef.current;
    let realmMessage;
    const status = type === 'VOICE_NOTE' || type === 'PHOTO' ? '4' : '0';
    realm.write(() => {
      realmMessage = realm.create(
        'Message',
        {
          id: (Date.now() * 10000).toString(),
          timetoken: (Date.now() * 10000).toString(),
          text: message.trimStart().trimEnd(),
          user_id: user.id,
          room_id: room_id,
          status: status,
          type: type,
          added: true,
          payload: payload,
          duration: duration,
          width: width,
          height: height,
          reaction: reaction,
        },
        true,
      );
    });
    return realmMessage;
  };

  const createMessageFromPubnub = (pubnubMessage) => {
    let added = false;
    const routeParams = getActiveRouteParams(navigation.dangerouslyGetState());
    const routeName = getActiveRouteName(navigation.dangerouslyGetState());
    if (
      routeName === 'ChatDetail' &&
      routeParams &&
      routeParams.pubnub_room_id === pubnubMessage.actualChannel
    ) {
      added = true;
    }
    if (pubnubMessage.publisher !== user.id) {
      const realm = realmRef.current;
      realm.write(() => {
        realm.create(
          'Message',
          {
            id: pubnubMessage.timetoken,
            timetoken: pubnubMessage.timetoken,
            text: pubnubMessage.message.text,
            user_id: pubnubMessage.message.publisher_id,
            room_id: pubnubMessage.actualChannel,
            status: '2',
            type: pubnubMessage.message.type
              ? pubnubMessage.message.type
              : 'TEXT_MESSAGE',
            added: added,
            payload: pubnubMessage.message.payload,
            duration: pubnubMessage.message.duration,
            width: pubnubMessage.message.width,
            height: pubnubMessage.message.height,
            reaction: pubnubMessage.message.reaction,
          },
          true,
        );
      });
      setLastRecieved(new Date());
    }
  };

  const createMessages = (messages) => {
    const realm = realmRef.current;
    realm.write(() => {
      messages.forEach((m) => {
        if (m.message && m.message.publisher_id) {
          realm.create(
            'Message',
            {
              id: m.timetoken,
              timetoken: m.timetoken,
              text: m.message.text,
              user_id: m.message.publisher_id,
              room_id: m.channel,
              status: '2',
              type: m.message.type ? m.message.type : 'TEXT_MESSAGE',
              added: false,
              payload: m.message.payload,
              duration: m.message.duration,
              width: m.message.width,
              height: m.message.height,
              reaction: m.message.reaction,
            },
            true,
          );
        }
      });
    });
  };

  const updateMessageReaction = (messageTimeToken, roomId, reaction) => {
    const realm = realmRef.current;
    const message = realm
      .objects('Message')
      .filtered(`room_id = "${roomId}"`)
      .filtered(`timetoken = "${messageTimeToken}"`)[0];
    realm.write(() => {
      if (reaction === null) {
        message.reaction = '';
      } else {
        message.reaction = JSON.stringify(reaction);
      }
    });
  };

  const updateMessageStates = (messageState) => {
    const realm = realmRef.current;
    let room_id = messageState.actualChannel
      ? messageState.actualChannel
      : messageState.channel;
    room_id = room_id.split('-')[0];
    const message = realm
      .objects('Message')
      .filtered(`room_id = "${room_id}"`)
      .filtered(`timetoken = "${messageState.message.message_timetoken}"`)[0];
    if (message) {
      realm.write(() => {
        message.expire_at = new Date(messageState.message.expire_at);
      });
    }
  };

  const seenExpressionMessages = (room_id) => {
    const expressionMessages = realmRef.current
      .objects('Message')
      .filtered(`room_id = "${room_id}"`)
      .filtered(
        'type = "EXPRESSION" || type = "TEXT_MESSAGE" || type = "PHOTO" || type = "GIF"',
      )
      .filtered('expire_at = null')
      .filtered(`user_id != "${user.id}"`)
      .sorted('timetoken', true);
    expressionMessages.forEach((message) => {
      pubnub.publish(
        {
          message: {
            message_timetoken: message.timetoken,
            expire_at: Date.now() + 12 * 60 * 60 * 1000,
          },
          channel: message.room_id + '-state',
          sendByPost: true,
          storeInHistory: true,
        },
        (status, error) => {
          // console.log(error);
        },
      );
    });
  };

  const seenMessage = (message) => {
    pubnub.publish(
      {
        message: {
          message_timetoken: message.timetoken,
          expire_at: Date.now() + 12 * 60 * 60 * 1000,
        },
        channel: message.room_id + '-state',
        sendByPost: true,
        storeInHistory: true,
      },
      (status, error) => {
        // console.log(error);
      },
    );
  };

  const clearChatRoomMessages = (room_id) => {
    const realm = realmRef.current;
    realm.write(() => {
      const allMessages = realm
        .objects('Message')
        .filtered(`room_id = "${room_id}"`);
      realm.delete(allMessages);
    });
  };

  const roomMessages = (id) => {
    return realmRef.current
      .objects('Message')
      .filtered(`room_id = "${id}"`)
      .sorted('timetoken', true);
  };

  const deleteMessage = (message_id) => {
    const realm = realmRef.current;
    realm.write(() => {
      const deletableMessages = realm
        .objects('Message')
        .filtered(`id = "${message_id}"`);
      realm.delete(deletableMessages);
    });
  };
  const loadMore = (channel_id, timetoken) => {
    pubnub.fetchMessages(
      {
        channels: [channel_id],
        start: timetoken,
        count: 100,
      },
      (status, res) => {
        if (status.error) {
          // console.log('operation failed w/ error:', status);
          return;
        }
        Object.entries(res.channels)
          .sort()
          .forEach(([key, value]) => {
            if (key.includes('-state')) {
              value.forEach((v) => {
                updateMessageStates(v);
              });
            } else {
              createMessages(value);
            }
            pubnub.getMessageActions(
              {
                channel: key,
                start: timetoken,
                count: 200,
              },
              (actionStatus, actionResponse) => {
                if (actionStatus.error) {
                  console.error(
                    'operation failed message actions fetch w/ error:',
                    status,
                  );
                } else if(actionResponse) {
                  actionResponse.data.forEach((ar) => {
                    if (ar.value !== 'smiley_face') {
                      updateMessageReaction(ar.messageTimetoken, key, {
                        value: ar.value,
                        actionTimeToken: ar.actionTimetoken,
                      });
                    }
                  });
                }
              },
            );
          });
      },
    );
  };

  const addMessageReaction = (message, reaction) => {
    //send reaction notification here
    pubnub.addMessageAction(
      {
        channel: message.room_id,
        messageTimetoken: message.timetoken,
        action: {
          type: 'reaction',
          value: reaction,
        },
      },
      (status, response) => {
        const realm = realmRef.current;
        realm.write(() => {
          message.reaction = JSON.stringify({
            value: reaction,
            actionTimeToken: (Date.now() * 10000).toString(),
          });
        });
        //Notification Start
        let messageText =
          message.type === 'VOICE_NOTE'
            ? 'to your voice message'
            : message.type === 'EXPRESSION'
            ? 'to your sticker'
            : message.type === 'GIF'
            ? 'to your GIF'
            : message.type === 'PHOTO'
            ? 'to your photo'
            : 'to your message: ' + message.text;

        pubnub.publish(
          {
            message: {
              text: message.text,
              publisher_id: message.user_id,
              expire_at: Date.now() + 36500 * 60 * 60 * 1000,
              message_timetoken: message.timetoken,
              type: 'REACTION',
              pn_gcm: {
                notification: {
                  title: user.customData.first_name,
                  body:
                    reaction === 'Reaction1'
                      ? 'reacted ❤️ ' + messageText
                      : reaction === 'Reaction2'
                      ? 'reacted 😀 ' + messageText
                      : reaction === 'Reaction3'
                      ? 'reacted 😮 ' + messageText
                      : reaction === 'Reaction4'
                      ? 'reacted 😞 ' + messageText
                      : reaction === 'Reaction5'
                      ? 'reacted 👍 ' + messageText
                      : reaction + messageText,
                  sound: 'default',
                },
                data: {
                  type: 'MESSAGE',
                  payload: message.room_id,
                  user_id: message.user_id,
                  user_name: user.customData.first_name,
                },
                pn_exceptions: [user.customData.fcm_token],
              },
            },
            channel: message.room_id + '-state',
            sendByPost: true,
            storeInHistory: true,
          },
          (stat, error) => {
            // console.log(stat, error);
          },
        );
        //Notification End
      },
    );
  };
  const removeMessageReaction = (message, reaction) => {
    pubnub.removeMessageAction(
      {
        channel: message.room_id,
        messageTimetoken: message.timetoken,
        actionTimetoken: reaction.actionTimeToken,
      },
      (status, response) => {
        const realm = realmRef.current;
        realm.write(() => {
          message.reaction = '';
        });
      },
    );
  };

  const removeMessageReactionOnlyRealm = (messageTimeToken, roomId) => {
    const realm = realmRef.current;
    const message = realm
      .objects('Message')
      .filtered(`room_id = "${roomId}"`)
      .filtered(`timetoken = "${messageTimeToken}"`)[0];

    realm.write(() => {
      message.reaction = '';
    });
  };

  return (
    <MessagesContext.Provider
      value={{
        roomMessages,
        createMessage,
        updateMessage,
        lastRecieved,
        updateMessageStatus,
        updateMessageStatusFail,
        seenMessage,
        addMessageReaction,
        removeMessageReaction,
        seenExpressionMessages,
        loadMore,
        deleteMessage,
      }}>
      {children}
    </MessagesContext.Provider>
  );
};

const useMessages = () => {
  const messages = useContext(MessagesContext);
  if (messages == null) {
    throw new Error('useMessages() called outside of a MessageProvider?');
  }
  return messages;
};

export {MessagesProvider, useMessages};
