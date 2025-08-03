import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './src/types';
import SignupScreen from './src/SignupScreen/SignupScreen';
import { Screen } from 'react-native-screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return <Screens />;
};

const styles = StyleSheet.create({});

export default App;
