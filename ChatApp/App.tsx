import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './src/types';
import SignupScreen from './src/SignupScreen/SignupScreen';
import { Screen } from 'react-native-screens';
import AuthProvider from './src/component/AuthProvider';
import SigninScreen from './src/SigninScreen/SigninScreen';
import { useCallback, useContext } from 'react';
import AuthContext from './src/component/AuthContext';
import HomeScreen from './src/HomeScreen/HomeScreen';
import LoadingScreen from './src/LoadingScreen/LoadingScreen';
import ChatScreen from './src/ChatScreen/ChatScreen';
import usePushNotification from './src/hooks/usePushNotification';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens = () => {
  const { user, processingSignin, processingSignup, initialized } =
    useContext(AuthContext);
  usePushNotification();

  const renderRootStack = useCallback(() => {
    if (!initialized) {
      return <Stack.Screen name="Loading" component={LoadingScreen} />;
    }

    if (user != null && !processingSignin && !processingSignup) {
      // 로그인 상태
      return (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />;
          <Stack.Screen name="Chat" component={ChatScreen} />;
        </>
      );
    }

    return (
      // 로그아웃 상태
      <>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
      </>
    );
  }, [user, processingSignin, processingSignup]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {renderRootStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Screens />
    </AuthProvider>
  );
};

export default App;
