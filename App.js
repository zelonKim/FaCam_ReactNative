import { Button, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import StateWithClassComponent from './src/StateWithClassComponent'
import StateWithFunctionalComponent from './src/StateWithFunctionalComponent'
import UseEffectWithClassComponent from './src/UseEffectWithClassComponent'
import UseEffectWithFunctionalComponent   from './src/UseEffectWithFunctionalComponent'
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
import Calculator from './src/Calculator';
import { SimpleLineIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {runPracticeDayjs} from './src/practice-dayjs'
import dayjs from 'dayjs';
import { getCalendarColumns, getDayColor, getDayText } from './src/util';

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




/* 
const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();


export default function App() {
  const [isOpened, setIsOpened] = useState(true);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const onPressArrow = () => {
    setIsOpened(!isOpened);
  }

  const ItemSeparatorComponent = () => <Margin height={13} />

  const renderItem = ({ item }) => (
      <View>
        <Profile
          uri={item.uri}
          name={item.name}
          introduction={item.introduction}
          isMe={false}
        />
      </View>
  )


  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: "white" }}>
      <Header />
      <Margin height={10} />
      <Profile
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
        isMe={true}
      />
      <Margin height={15} />
      <Division />
      <Margin height={12} />
      <FriendSection
          friendProfileLen={friendProfiles.length}
          onPressArrow={onPressArrow}
          isOpened={isOpened}
      />
      <Margin height={5} />
    </View>
  )

  const ListFooterComponent = () => <Margin hegiht={10} />

  return (
    <View style={styles.container}>
      <FlatList // 현재 화면에 보이는 부분만 렌더링해줌. -> (ScrollView에 비해 성능이 좋음.)
        data={ isOpened ? friendProfiles : []}
        contentContinerStyle={{ paddingHorizontal: 15 }}
        keyExtractor={(_, index) => index} 
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
      />
      <TabBar 
        selectedTabIdx={selectedTabIdx}
        setSelectedTabIdx={setSelectedTabIdx}
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
 */



///////////////////////////



/* 
export default function App() {

  return(
    <SafeAreaView style={styles.container}>
      <Calculator />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
}) */



/////////////////////////////





const columnSize=35;

const Column = ({
  text,
  color,
  opacity,
  disabled,
  onPress,
  isSelected,
}) => {
  return (
  <TouchableOpacity 
    disabled={disabled} 
    onPress={onPress} 
    style={{ width: columnSize, height: columnSize, justifyContent: "center", alignItems: "center", backgroundColor: isSelected ? "#c2c2c2" : "transparent", borderRadius: columnSize / 2 }}
  >
    <Text style={{ color, opacity }}>{text}</Text>
  </TouchableOpacity >
  )
}

const ArrowButton = ({iconName, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 20, paddingVertical: 15  }}>
      <SimpleLineIcons name={iconName} size={15} color="#404040" />
    </TouchableOpacity>
  )
}


export default function App() {
  const now = dayjs(); 

  const [selectedDate, setSelectedDate] = useState(now);
  const columns = getCalendarColumns(selectedDate);

  const [isDatePickerVisible, setIsDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setIsDatePickerVisibility(true);
  }

  const hideDatePicker = () => {
    setIsDatePickerVisibility(false);
  }

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(dayjs(date));
    hideDatePicker();
  }


  const onPressLeftArrow = () => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, 'month');
    setSelectedDate(newSelectedDate);
  }

  const onPressRightArrow = () => {
    const newSelectedDate = dayjs(selectedDate).add(1, 'month');
    setSelectedDate(newSelectedDate);
  }



  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD.");
    return (
      <View>
        <Margin height={15} />

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow} />

          <TouchableOpacity onPress={showDatePicker}>
           <Text style={{ fontSize: 20, color: "#404040" }}>{currentDateText}</Text>
          </TouchableOpacity>
          
          <ArrowButton iconName="arrow-right" onPress={onPressRightArrow} />
        </View>
        <Margin height={15} />

        <View style={{ flexDirection: "row" }}>
            {[0, 1, 2, 3, 4, 5, 6 ].map(day => {
              const dayText = getDayText(day)
              const color = getDayColor(day);
              return (
                <Column key={`day-${day}`} text={dayText} color={color} opacity={1} disabled={true} />
              )
            })}
        </View>
      </View>
    )
}


  const renderItem = ({item: date}) => {
    const dateText = dayjs(date).get('date');  
    const day = dayjs(date).get('day');
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(now, 'month')

    const onPress = () => {
      setSelectedDate(date);
    }

    const isSelected = dayjs(date).isSame(selectedDate, 'date');

    return (
      <Column text={dateText} color={color} opacity={isCurrentMonth ? 1 : 0.5} onPress={onPress} isSelected={isSelected} />
    )
  }


  useEffect(() => {
    runPracticeDayjs();
    // console.log(columns);
  }, []);


  useEffect(() => {
    console.log('changed selectedDate', dayjs(selectedDate).format("YYYY.MM.DD"));
  }, [selectedDate])


  return(
    <SafeAreaView style={styles.container}>
      <FlatList
        data={columns}
        keyExtractor={(_, index) => `column-${index}`}
        numColumns={7}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})