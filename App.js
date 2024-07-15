import { Button, Image, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import StateWithClassComponent from './src/StateWithClassComponent'
import StateWithFunctionalComponent from './src/StateWithFunctionalComponent'
import UseEffectWithClassComponent from './src/UseEffectWithClassComponent'
import UseEffectWithFunctionalComponent   from './src/UseEffectWithFunctionalComponent'
import CustomHook from "./src/CustomHook";
import Header from './src/Header';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Profile from "./src/Profile"
import {myProfile} from './src/data';
import {friendProfiles} from './src/data';
import Margin from './src/Margin'
import Division from './src/Division';
import FriendSection from './src/FriendSection';
import FriendList from './src/FriendList';
import TabBar from './src/TabBar';

/*
export default function App() {
 return (
   <View style={styles.container}>
      <Text style={styles.text}>Open it</Text>
      <Image source={require("@/puppy.jpeg")} style={styles.local_image}/>  // 로컬 이미지
      <Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh4Q9yx3QP7hVvKJ4rQWIQIOtQDZ_TuEiVyw&s"}} style={styles.url_image}/>  // 원격 이미지
      <TextInput placeholder="이름을 입력해주세요"/>

      <Button title="Click Here" onPress={() => { console.log("클릭됨.")}} />

      <Switch value={true} />
      <Switch value={false} />

      <ScrollView>
        <Image source={require("@/puppy.jpeg")} style={styles.local_image}/>
        <Image source={require("@/puppy.jpeg")} style={styles.local_image}/>
        <Image source={require("@/puppy.jpeg")} style={styles.local_image}/>
        <Image source={require("@/puppy.jpeg")} style={styles.local_image}/>
        <Image source={require("@/puppy.jpeg")} style={styles.local_image}/>
      </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  local_image: {
    width: 200,
    height: 200,
  },
  url_image: {
    width: 100,
    height: 100,
  }
});
 */


//////////////////////////////////////


/* 
const Header = (props) => {
  return <Text>{props.title}</Text>;
}
const MyProfile = () => {
  return <Profile profileSize={40} name="성진" uri="https://image.dongascience.com/Photo/2022/06/6982fdc1054c503af88bdefeeb7c8fa8.jpg" />
}
const Division = () => {
  return <Text>디비전</Text>;
}
const FriendSection = () => {
  return <Text>프렌드 섹션</Text>;
}
const FriendList = () => {
  return (
    <View>
      <Profile profileSize={30} name="지연" uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzNhVODaF0AmwDsuV7LB_yz6-u8nvuD7QLlA&s"/>
      <Profile profileSize={30} name="세인" uri="https://image.dongascience.com/Photo/2022/06/6982fdc1054c503af88bdefeeb7c8fa8.jpg"/>
      <Profile profileSize={30} name="현서" uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo13mPaNWYnDFYbbCWxGbSTSsfxmNyIiy2QQ&s"/>
      <Profile profileSize={30} name="유림" uri="https://image.dongascience.com/Photo/2022/06/6982fdc1054c503af88bdefeeb7c8fa8.jpg"/>
    </View>
  )
}


const Profile = (props) => {
  return (
    <View style={{flexDirection: "row"}}>
      <Image 
        source={{uri: props.uri}} 
        style={{width: props.profileSize, height: props.profileSize}}
        />
      <Text>{props.name}</Text>
    </View>
  )
}



export default function App() {
  return (
    <View style={styles.container}>
      <Header title="친구" />
      <MyProfile />
      <Division />
      <FriendSection />
      <FriendList />
    </View>
  )
} 
*/


//////////////////////////////////////



const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();


export default function App() {
  const [isOpened, setIsOpened] = useState(true);

  const onPressArrow = () => {
    console.log("arrow is clicked.");
    setIsOpened(!isOpened);
  }

  return (
      <View style={styles.container}>
        {/* <StateWithClassComponent /> */}
        {/* <StateWithFunctionalComponent /> */}
        {/* <UseEffectWithClassComponent /> */}
        {/* <UseEffectWithFunctionalComponent /> */}
        {/* <CustomHook /> */}
        <Header />

        <Margin height={10} />

        <Profile
          uri={myProfile.uri}
          name={myProfile.name}
          introduction={myProfile.introduction}
        />
        
        <Margin height={15} />
        
        <Division />

        <Margin height={12} />

        <FriendSection
            friendProfileLen={friendProfiles.length}
            onPressArrow={onPressArrow}
            isOpened={isOpened}
          />

        <FriendList
          data={friendProfiles}
          isOpened={isOpened}
        />

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: statusBarHeight,
    paddingBottom: bottomSpace,
    paddingHorizontal: 10,
    flex:1,
    backgroundColor:'#fff',
  }
})