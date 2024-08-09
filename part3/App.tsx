/* 
import React, { useCallback, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  NativeModules,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { excuteCalculator } from './NativeCalculatorUtils';

export type TypeCalcAction = "plus" | "minus" | "divide" | "multipy" | "equal" | "clear" 


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const screenSize = useWindowDimensions();

  const buttonSize = screenSize.width / 4

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const [resultNum, setResultNum] = useState('');
  const [inputNum, setInputNum] = useState('');
  const [tempNum, setTempNum] = useState(0);
  const [lastAction, setLastAction] = useState<Exclude<TypeCalcAction,'equal'|'clear'> | null>(null);


  const onPressNumber = useCallback<(pressedNum:number)=>void>((pressedNum)=>{
  
    if(resultNum !== '') {
      setResultNum('')
    }
    setInputNum((prevState) => {
      const nextNum = parseInt(`${prevState}${pressedNum}`)
      return nextNum.toString();
    });
  },[resultNum])


  const onPressAction = useCallback<(pressedAction:TypeCalcAction)=>Promise<void>>(async(pressedAction) => {

    if(pressedAction === 'clear'){
      setInputNum('');
      setTempNum(0);
      setResultNum('');
      return;
    }

    if(pressedAction === 'equal'){
      if(tempNum !== 0 && lastAction !== null) { 
        console.log(lastAction);
        
        const result = await excuteCalculator(
          lastAction,
          tempNum,
          parseInt(inputNum)
        );
        console.log(result);
        setResultNum(result.toString());
        setTempNum(0);
      }
      return;
    }
    setLastAction(pressedAction);


    if(resultNum !== "") {
      setTempNum(parseInt(resultNum))
      setResultNum('');
      setInputNum('');
    } else if (tempNum === 0) {
      setTempNum(parseInt(inputNum));
      setInputNum('')
    } else {
      const result = await excuteCalculator(
        pressedAction,
        tempNum,
        parseInt(inputNum)
      );
      console.log(result);
      setResultNum(result.toString());
      setTempNum(0);
    }
  },[inputNum, lastAction, resultNum, tempNum])


  return (
    <SafeAreaView style={{ flex:0.5, }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1}}>
        <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}}>
            <Text style={{fontSize:48, padding:48}}>
              {resultNum !== '' ? resultNum : inputNum}              
            </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{
            flex: 1, 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            alignItems:'center', 
            marginRight: 4
          }}>
            {[1,2,3,4,5,6,7,8,9,0].map(number=>(
              <Pressable 
                style={{
                  width:buttonSize-4, 
                  height:buttonSize-4, 
                  borderRadius:(buttonSize-4)*0.5, 
                  alignItems:'center', 
                  justifyContent:'center', 
                  backgroundColor:'gray'
              }}
                onPress={() => onPressNumber(number)}
              >
                    <Text style={{fontSize: 24}}> {number} </Text>
              </Pressable>
            ))}
          </View>
         <View style={{paddingHorizontal: 12}}>
              {[
                {label: '+', action: 'plus'},
                {label: '-', action: 'minus'},
                {label: '*', action: 'multiply'},
                {label: '/', action: 'divide'},
                {label: 'C', action: 'clear'},
                {label: '=', action: 'equal'},
              ].map(operation => {
                return (
                  <Pressable 
                  style={{
                    width: screenSize.width/6,
                    height: screenSize.width/6,
                    borderRadius:(screenSize.width/6)*0.5, 
                    alignItems:'center', 
                    justifyContent:'center', 
                    backgroundColor:'gray'
                  }}
                  onPress={() => onPressAction(operation.action as TypeCalcAction)}
                  >
                    <Text style={{fontSize:24}}>{operation.label}</Text>
                  </Pressable>
                )
              })
            }
         </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App; 
*/





//////////////////////////////



/*
import React, { useCallback } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const sharedValue = useSharedValue(0); // useSharedValue(초기 공유값): 컴포넌트 내의 공유값을 정의함.

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const onScroll = useAnimatedScrollHandler((events) => { // useAnimatedScrollHandler(콜백함수): 스크롤 이벤트에 대한 콜백함수를 정의함. / 매개변수에는 스크롤 이벤트 정보가 담김.
    sharedValue.value = events.contentOffset.y // 공유값.value: 공유값에 저장된 값을 나타냄.
  })

  const floatingButtonStyle = useAnimatedStyle(() => { // useAnimatedStyle(콜백함수): 애니메이션 스타일을 반환하는 콜백함수를 정의함.
    return {
      transform:[
        {translateY: interpolate(sharedValue.value, [900, 1000], [50, -10], {
          extrapolateRight: Extrapolation.CLAMP
        })}
      ]
    }
  })

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    
    <Animated.FlatList
      style={{flex: 1}}
      onScroll={onScroll} //<Animated.FlatList  onScroll={스크롤 이벤트에 대한 콜백함수}>
      scrollEventThrottle={1}
      data={[1,2,3,4,5,6,7,8,9,10,11]}
      renderItem={({item}) => {
        return(
          <View style={{
            height: 150, 
            alignItems:'center', 
            justifyContent:'center'
          }}>
            <Text>{item}</Text>
          </View>
        )
      }}
    />

      <Pressable 
        style={{
          position:'absolute',
          right: 24,
          bottom: 24
      }}>
          <Animated.View style={[ // <Animated.View style={[{}, 애니메이션 스타일을 반환하는 콜백함수]}>
            {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'red',
            alignItems:'center',
            justifyContent:'center'
            },
            floatingButtonStyle
          ]}>
            <Text style={{color: 'white', fontSize: 24}}> + </Text>
          </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
}

export default App; 
*/



//////////////////////////////





/*
import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { accelerometer } from 'react-native-sensors';
import { Colors } from 'react-native/Libraries/NewAppScreen';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const [value, setValue] = useState({x:0, y:0, z:0})

  const accelerometerValue = useSharedValue({x:0, y:0, z:0})

  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z}) => { // accelerometer.subscribe(콜백함수): 핸드폰이 회전하여 움직일때 해당 콜백함수를 실행한 후, 섭스크립션을 반환함. / 매개변수에는 회전에 따른 좌표값이 담김.
      accelerometerValue.value = {x, y, z};
      setValue({x, y, z});
      console.log(x, y, z);
    });
    return () => subscription.unsubscribe(); // 섭스크립션.unsubscribe(): 섭스크립션을 해제함.
  }, [accelerometerValue])


  const leftBackground = useAnimatedStyle(()=>{ 
    return {
      backgroundColor: interpolateColor(
        accelerometerValue.value.y,
        [-1,0],
        ['red','green'],
      )
    }
  })

  const rightBackground = useAnimatedStyle(()=>{
    return {
      backgroundColor: interpolateColor(
        accelerometerValue.value.y,
        [0,1],
        ['green', 'red'],
      )
    }
  })

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View 
        style={{
          flex:1, 
      }}>
        <Animated.View style={[{flex: 1}, leftBackground]} />  
        <Animated.View style={[{flex: 1}, rightBackground]} />
      </View>
    </SafeAreaView>
  );
}

export default App;
*/




///////////////////////




/* 
import React from 'react';
import {SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from './src/navigation/RootNavigation';


function App(): React.JSX.Element {
 
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App; 
 */





/////////////////////////////




/*
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootNavigation } from './src/navigation/RootNavigation';



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

export default App; 
*/


////////////////////////



import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootNavigation } from './src/navigation/RootNavigation';
import { ListView } from './src/ListView';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ListView />
      </SafeAreaProvider>
  );
}

export default App;  
