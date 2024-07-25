import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScreenA } from './src/ScreenA';
import { ScreenB } from './src/ScreenB';
import { Ionicons } from '@expo/vector-icons';
import { TabIcon } from './src/components/TabIcon';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Typography } from './src/components/Typography';
import { LocalImage } from './src/components/LocalImage';
import { RemoteImage } from './src/components/RemoteImage';
import { Spacer } from './src/components/Spacer';
import { Divider } from './src/components/Divider';
import { TabA } from './src/TabA';
import { TabB } from './src/TabB';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigation, BottomTabnavigations } from './src/navigation/BottomTabNavigations';
import { RootStackNavigations } from './src/navigation/RootStackNavigations';
import { NestedStackNavigator } from './src/NestedStackNavigator';
import { CounterScreen } from './src/screens/CounterScreen';
import { Provider } from 'react-redux';
import { RootNavigation } from './src/navigation/RootNavigation';
import { RecoilRoot } from 'recoil';
import { RecoilCustomPersist } from './src/components/RecoilCustomPersist';


/* 
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='ScreenA' component={ScreenA} />
        <Stack.Screen name='ScreenB' component={ScreenB} />
        <Stack.Screen name='NestedStack' component={NestedStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}   
 */

//////////////////////



/* const Tab = createBottomTabNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen 
          name='TabA' 
          component={TabA} 
          options={{ tabBarIcon: () => <Ionicons name="home" size={20} /> }}
      />
      <Tab.Screen 
          name='TabB' 
          component={TabB} 
          options={{ tabBarIcon: () => <Ionicons name="settings" size={20} /> }}
      />
    </Tab.Navigator>
  </NavigationContainer>
  );
}  */


//////////////////////



/*
 import { TabA } from './src/TabA';
import { TabB } from './src/TabB';
import { BottomTabNavigator } from './src/BottomTabNavigator';


const Stack = createNativeStackNavigator();


export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='NestedBottomTab' component={BottomTabNavigator} />
        <Stack.Screen name='ScreenB' component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
 */


/////////////////////


/*
import { Typography } from './src/components/Typography';
import { LocalImage } from './src/components/LocalImage';
import { RemoteImage } from './src/components/RemoteImage';
import { Icon } from './src/components/Icons';
import { Badge } from './src/components/Badge';
import { Button } from './src/components/Button'
import { Divider } from './src/components/Divider';
import { Spacer } from './src/components/Spacer';

export default function App() {
  return(
    <View style={styles.container}>
      <Typography color='red' fontSize={20} >
        이것은 텍스트 입니다.
      </Typography>

      <Spacer space={20} />
      <Divider />
      <Spacer space={20} />

      <LocalImage 
        localAsset={require('./assets/favicon.png')}
        width={50}
        height={50}
       />

      <Spacer space={20} />
      <Divider />

      <RemoteImage 
        url={'https://img.freepik.com/free-photo/fresh-coffee-steams-on-wooden-table-close-up-generative-ai_188544-8923.jpg'}
        width={200}
        height={100}
       />

      <Icon name='home' size={20} color='red' />

      <View style={{ flexDirection: 'row' }}>
        <Badge fontSize={10}>
          <Typography> BADGE </Typography>
        </Badge>

        <Badge fontSize={10}>
          <Icon name='home' size={50} color='black' />
        </Badge>
      </View>
 

      <View style={{ flexDirection: 'row', marginTop: 32 }}>
        <Button onPress={()=>{
          console.log('텍스트 버튼 눌림')
        }}>
          <Typography> TEXT BUTTON </Typography>
        </Button>

        <Button onPress={() => {
          console.log('아이콘 버튼 눌림.')
        }}>
          <Icon name='home' size={50} color='green' />
        </Button>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

*/


/////////////////////////


/* 
export default function App() {
  return(
    <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
      <TabIcon iconName='home'> </TabIcon>
      <TabIcon iconName='home' visibleBadge> </TabIcon>
    </View>
  )
} 
*/


/////////////////////


/* 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HeaderWithoutCompound } from './src/components/HeaderWithoutCompound';
import { Header } from './src/components/Header/Header';


export default function App() {
  return(
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
          // <HeaderWithoutCompound title="HEADER" /> 
        <Header>
          <Header.Group>
            <Header.Icon iconName='arrow-back'></Header.Icon>
            <Header.Title title='Hello'></Header.Title>
          </Header.Group>

          <Header.Icon iconName='close'></Header.Icon>
        </Header>
      </View>
    </SafeAreaProvider>
  )
} 
*/


//////////////////////

/* 
export default function App() {
  return(
    <SafeAreaProvider>
      <View style={{ flex:1, alignItems:'center', justifyContent: 'center' }} >
        <Typography fontSize={12} color='black'>
          TEXT
        </Typography>
        
      <Spacer space={40} />
      <View style={{ flexDirection: 'row' }}>

        <LocalImage 
          localAsset={require('./assets/favicon.png')} 
          width={100}
          height={100} 
        />
        <Spacer horizontal={true} space={40} />

        <LocalImage 
          localAsset={require('./assets/favicon.png')} 
          width={100}
          height={100} 
        />

      </View>

     <Divider />
     <Spacer space={40} />

        <RemoteImage 
          url={'https://img.freepik.com/free-photo/fresh-coffee-steams-on-wooden-table-close-up-generative-ai_188544-8923.jpg'}
          width={200}
          height={100}
        />

      </View>
    </SafeAreaProvider>
  )
} 
*/


/////////////////////


/* 
import { Header } from './src/components/Header/Header';
import { HookTest } from './src/components/HookTest';
import { useCallback, useState } from 'react';
import { Button } from './src/components/Button';

export default function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const doSum = useCallback(() => {
    return (a + b)
  }, [a, b])

  return(
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <Header>
          <Header.Title title='Hello' />
        </Header>

        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
          <HookTest a={a} b={b} />

          <Typography> 현재 callback으로 계산된 값: {doSum()} </Typography>

          <Button onPress={() => {
            setA(a+1)
          }}>
            <Typography>A 더하기 1</Typography>
          </Button>

        </View>
      </View>
    </SafeAreaProvider>
  )
} 
 */


////////////////////////




/* export default function App() {
  return (
    <NavigationContainer>
        <RootStackNavigations />
    </NavigationContainer>
  )
}   */


////////////////////////




/* 
import { createContext, useState } from 'react';


export const CounterContext = createContext(); // 컨텍스트를 생성함.

 export default function App() {
  const counterState = useState(0);

  return (
   <SafeAreaProvider> 
    <CounterContext.Provider value={counterState}>
        <CounterScreen />
    </CounterContext.Provider>
   </SafeAreaProvider>
  )
}   
 */



/////////////////



// import { RecoilRoot } from 'recoil';
 
//  export default function App() {
//   return (
//    <SafeAreaProvider> 
//       <RecoilRoot>
//         <CounterScreen />
//       </RecoilRoot>
//    </SafeAreaProvider>
//   )
// }   


//////////////////



/* 
export default function App() {
  return (
    <NavigationContainer>
        <Provider store={store}>
          <RootStackNavigations />
        </Provider>
    </NavigationContainer>
  )
} 
*/


////////////////////



/*
 import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';


export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <BottomTabNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}   
*/



///////////////////////




export default function App() {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <RecoilCustomPersist>
          <NavigationContainer>
              <RootNavigation />
          </NavigationContainer>
        </RecoilCustomPersist>
      </SafeAreaProvider>
    </RecoilRoot>
    
  )
} 


