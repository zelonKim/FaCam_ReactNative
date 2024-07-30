import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FeedListItem } from './src/components/FeedListItem';
import { RootApp } from './src/RootApp';
import { Provider } from 'react-redux';
import { store } from './src/store';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FeedListItem 
          image='https://docs.expo.dev/static/images/tutorial/background-image.png'
          likeCount={10}
          writer='Zelon'
          comment='This is for test'
          isLiked={false}
          onPressFeed={() => { console.log('온프레스')}}
        />
      </View> */}
      <Provider store={store}>
         <RootApp />
      </Provider>
    </SafeAreaProvider>
  );
}
