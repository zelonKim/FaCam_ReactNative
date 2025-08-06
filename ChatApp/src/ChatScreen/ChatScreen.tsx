import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import Screen from '../component/Screen';
import { RootStackParamList } from '../types';
import useChat from './useChat';
import { StyleSheet, View } from 'react-native';

const ChatScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const { other, userIds } = params;
  const { loadingChat, chat } = useChat(userIds);

  return (
    <Screen title={other.name}>
      <View></View>
    </Screen>
  );
};

export default ChatScreen;
