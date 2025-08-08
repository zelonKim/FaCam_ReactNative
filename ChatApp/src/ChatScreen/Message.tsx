import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MessageProps {
  name: string;
  text: string;
  createdAt: Date;
  isOtherMessage: boolean;
}

const styles = StyleSheet.create({});

const Message = ({ name, text, createdAt, isOtherMessage }: MessageProps) => {
  const renderMessageContainer = useCallback(() => {
    return <Text style={styles.timeText}></Text>;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.messageContainer}>{renderMessageContainer()}</View>
    </View>
  );
};

export default Message;
