import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import Colors from '../modules/Colors';
import UserPhoto from '../component/userPhoto';
import ImageMessage from './ImageMessage';

interface TextMessage {
  text: string;
}

interface ImageMessage {
  url: string;
}

interface MessageProps {
  name: string;
  message: TextMessage | ImageMessage;
  createdAt: Date;
  isOtherMessage: boolean;
  userImageUrl?: string;
  unreadCount?: number;
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    alignItems: 'flex-end',
  },
  nameText: {
    fontSize: 12,
    color: Colors.GRAY,
    marginBottom: 4,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: Colors.GRAY,
  },
  bubble: {
    backgroundColor: Colors.BLACK,
    borderRadius: 12,
    padding: 12,
    flexShrink: 1,
  },
  messageText: {
    fontSize: 14,
    color: Colors.WHITE,
  },
  userPhoto: {
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCountText: {
    fontSize: 12,
    color: Colors.GRAY,
  },
  metaInfo: {
    marginRight: 4,
    alignItems: 'flex-end',
  },
});

const otherMessageStyles = {
  container: [styles.container, { alignItems: 'flex-start' as const }],
  bubble: [styles.bubble, { backgroundColor: Colors.LIGHT_GRAY }],
  messageText: [styles.messageText, { color: Colors.BLACK }],
  timeText: [styles.timeText],
  metaInfo: [
    styles.metaInfo,
    { alignItems: 'flex-start' as const, marginRight: 0, marginLeft: 4 },
  ],
};

const Message = ({
  name,
  message,
  createdAt,
  isOtherMessage,
  userImageUrl,
  unreadCount = 0,
}: MessageProps) => {
  const messageStyles = isOtherMessage ? otherMessageStyles : styles;

  const renderMessage = useCallback(() => {
    if ('text' in message) {
      return <Text style={messageStyles.messageText}>{message.text}</Text>;
    }
    if ('url' in message) {
      return <ImageMessage url={message.url} />;
    }
  }, [message, messageStyles.messageText]);

  const renderMessageContainer = useCallback(() => {
    const components = [
      <View key="metaInfo" style={messageStyles.metaInfo}>
        {unreadCount > 0 && (
          <Text style={styles.unreadCountText}>{unreadCount}</Text>
        )}
        <Text key="timeText" style={messageStyles.timeText}>
          {moment(createdAt).format('HH:mm')}
        </Text>
      </View>,
      <View key="message" style={messageStyles.bubble}>
        <Text style={styles.messageText}>{renderMessage()}</Text>
      </View>,
    ];
    return isOtherMessage ? components.reverse() : components;
  }, [createdAt, messageStyles, isOtherMessage, unreadCount, renderMessage]);

  return (
    <View style={styles.root}>
      {isOtherMessage && (
        <UserPhoto
          style={styles.userPhoto}
          imageUrl={userImageUrl}
          name={name}
          nameStyle={nameStyle}
          size={34}
        />
      )}
      <View style={messageStyles.container}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.messageContainer}>{renderMessageContainer()}</View>
      </View>
    </View>
  );
};

export default Message;
