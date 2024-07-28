import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, Platform, StyleSheet, Text, View } from 'react-native';
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
import { NewsTabNavigation } from './src/navigation/NewsTabNavigation';
import store from './src/store/store';
import { RootApp } from './src/RootApp';


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



/* 
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
*/


////////////////////////



/* 
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
 */


///////////////////////////////////////////////






import { GoogleSigninButton, GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { useCallback, useEffect, useState } from 'react';
import firebaseAuth from '@react-native-firebase/auth'


GoogleSignin.configure(); // GoogleSignin.configure(): 구글 사인인을 설정함.

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const onPressGoogleSignin = useCallback(async()=>{
    try{
      await GoogleSignin.hasPlayServices({  // GoogleSignin.hasPlayServices(): 구글 사인인을 작동시킴.
        showPlayServicesUpdateDialog: true
      }) 

      const userInfo = await GoogleSignin.signIn(); // GoogleSignin.signIn(): 사용자가 구글 계정으로 로그인을 시도하면 사용자 계정 정보를 반환함.
      const UserIdToken = userInfo.idToken // 사용자 계정 정보.idToken: 사용자의 아이디 토큰값을 가짐.

      const credential = firebaseAuth.GoogleAuthProvider.credential(UserIdToken); // firebaseAuth.GoogleAuthProvider.credential(사용자 아이디 토큰): 사용자에 대한 인증서를 반환함.
      const result = await firebaseAuth().signInWithCredential(credential); // firebaseAuth().signInWithCredential(사용자 인증서): 사용자를 로그인 시켜주며, 사용자 인증 정보를 반환함.
      console.log(result);

      setUserInfo({
        name: result.additionalUserInfo.profile.name, // 사용자 인증 정보.additionalUserInfo.profile.name: 사용자의 프로필 이름값을 가짐.
        profileImage: result.additionalUserInfo.profile.picture, // 사용자 인증 정보.additionalUserInfo.profile.picture: 사용자의 프로필 사진값을 가짐.
      })

    } catch(ex) {

    }
  }, [])


  const getCurrentUserInfo = useCallback(async() => {
    try {
      setLoading(true);
      const userInfo = await GoogleSignin.signInSilently(); // GoogleSignin.signInSilently(): 이미 로그인된 사용자의 계정 정보를 반환함.
      const UserIdToken = userInfo.idToken
      const credential = firebaseAuth.GoogleAuthProvider.credential(UserIdToken);
      const result = await firebaseAuth().signInWithCredential(credential);

      setUserInfo({
        name: result.additionalUserInfo.profile.name,
        profileImage: result.additionalUserInfo.profile.picture,
      })

      setLoading(false);
    } catch(ex) {
      if(error.code === statusCodes.SIGN_IN_REQUIRED) {

      } else {

      }
    }
  })

  useEffect(() => {
    getCurrentUserInfo();
  },[])


  retrun (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      {loading ? (
        <ActivityIndicator />
        ) : (
        userInfo !== null ? 
          (
            <View style={{flex:1}}>
              <Image source={{uri: userInfo.profileImage}} style={{width: 100, height: 100, borderRadius: 50}} />
              <Text style={{fontSize:24, marginTop:20}}> {userInfo.name} </Text>
            </View>
          ) : (
          <GoogleSigninButton onPress={onPressGoogleSignin}/>
          )
     )}
    </View>
  )
}



//////////////////////



import { View } from 'react-native';
import { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage'

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lastUploadImage, setLastUploadImage] = useState(null);

  const onPressPickFile = useCallback(async() => {
    const pickResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })
    if(pickResult.canceled) {
      return;
    }
    
    const image = pickResult.assets[0]; // 이미지 선택결과.assets: 이미지 자산을 반환함. 
    setSelectedImage(image);

    const uri = image.uri; // 이미지 자산.uri: 이미지의 uri를 반환함.
    const fileNameArray = uri.split('/');
    const fileName = fileNameArray[fileNameArray.length-1]
    console.log(fileName);

    // storage().ref(파일명).putFile(이미지 uri): 스토리지에 해당 파일명으로 이미지를 저장하고, 저장 결과를 반환함.
    const putResult = await storage().ref(fileName).putFile(Platform.OS === 'ios' ? uri.replace('file://', '') : uri);
    console.log(putResult);
    setLastUploadImage(putResult);
  }, [])


  const onPressDownloadImage = useCallback(async() => {
    const downloadUrl = await storage().ref(lastUploadImage.metadata.fullPath).getDownloadURL(); // storage().ref(이미지 저장결과.metadata.fullPath).getDownloadURL(): 이미지 다운로드 URL을 반환함.
    console.log(downloadUrl);


    const {uri} = await FileSystem.createDownloadResumable(
      downloadUrl,
      FileSystem.documentDirectory + lastUploadImage.metadata.name,
      {}
    ).downloadAsync();

      console.log(uri);
    
  }, [lastUploadImage])


  return (
    <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
      {selectedImage !== null && (
        <Image source={{uri: selectedImage.uri}} style={{width: 200, height: 200 }} />
      )}
      <Button title="PICK FILE" onPress={onPressPickFile}></Button>
      <Button title='DOWNLOAD FILE' onPress={onPressDownloadImage} />
    </View>
  )
} 


//////////////////////





GoogleSignin.configure();

export default function App() {
  return(
    <SafeAreaProvider>
      <RecoilRoot>
        <RootApp />
      </RecoilRoot>
    </SafeAreaProvider>
  )
} 
