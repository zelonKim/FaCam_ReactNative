import { Alert, Button, Dimensions, FlatList, FlatListComponent, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
import { ITEM_WIDTH, bottomSpace, getCalendarColumns, getDayColor, getDayText, statusBarHeight } from './src/util';
import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list';
import Calendar from './src/Calendar';
import {Ionicons} from '@expo/vector-icons';
import AddTodoInput from './src/AddTodoInput';
import { useGallery } from './src/use-gallery';
import * as ImagePicker from 'expo-image-picker';

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




/*
export default function App() {
  const now = dayjs(); 

  const { 
    selectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    setSelectedDate,
    subtract1Month,
    add1Month
  } = useCalendar(now);


  const {
    input,
    setInput,
    toggleTodo,
    removeTodo,
    addTodo,
    resetInput,
    todoList,
    filteredTodoList,
  } = useTodoList(selectedDate);


  const columns = getCalendarColumns(selectedDate);

  const onPressLeftArrow = subtract1Month
  const onPressRightArrow = add1Month
  const onPressHeaderDate = showDatePicker;
  const onPressDate = setSelectedDate;



  const ScrollToEnd = () => {
    setTimeout(() => {
      // flatListRef.current?.scrollToEnd();
    }, 200);
  }

  const onPressAdd = () => {
    addTodo();
    resetInput();
    ScrollToEnd();
  }
  
  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    ScrollToEnd();
  }

  const onFocus = () => {
    ScrollToEnd();
  }



  useEffect(() => {
    console.log('changed selectedDate', dayjs(selectedDate).format("YYYY.MM.DD"));
  }, [selectedDate])



  const ListHeaderComponent =() => (
    <View>
      <Calendar
        todoList={todoList}
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressDate={onPressDate}    
    />
      <Margin height={15} />
      <View
        style={{ width: 4, height: 4, borderRadius: 10/2, backgroundColor:"#a3a3a3", alignSelf: "center",}}
      />
      <Margin height={15} />
    </View>
  )


    const renderItem = ({ item: todo }) => {
      const isSuccess = todo.isSuccess;
      const onPress = () => toggleTodo(todo.id);

      const onLongPress = () => {
        Alert.alert("삭제하시겠어요","", [
          {
            style: "cancel",
            text: "아니요"
          },
          {
            text: "네",
            onPress: () => removeTodo(todo.id),
          }
        ])
      };

        return (
          <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flexDirection:"row",
              width: ITEM_WIDTH,
              alignSelf: "center",
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderBottomWidth: 0.3,
              borderColor: "#a6a6a6"
            }}>
            <Text style={{ flex:1, fontSize: 14, color: "#595959" }}>{todo.content}</Text>
          
            <Ionicons 
              name="checkmark" 
              size={17} 
              color={isSuccess ? "#595959" : "#bfbfbf"}
              />
          </Pressable>
        )
    }
    

  return(
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />

      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View>
            <FlatList
              // ref={flatListRef}
              data={filteredTodoList}
              contentContainerStyle={{paddingTop: statusBarHeight + 30}}
              ListHeaderComponent={ListHeaderComponent}
              renderItem = {renderItem}
              showsVerticalScrollIndicator={false}
            />

            <AddTodoInput
              value={input}
              onChangeText={setInput}
              placeholder={`${dayjs(selectedDate).format('MM.DD')}에 추가할 TODO`}
              onPressAdd={onPressAdd}
              onSubmitEditing={onSubmitEditing}
              onFocus={onFocus}
            />
        </View>
      </KeyboardAvoidingView>
        
      <Margin height={bottomSpace} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
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
*/

/////////////////////////////




const width = Dimensions.get('screen').width;
const columnSize = width / 3;




export default function App() {

  const {images, pickImage, deleteImage} = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  }

  const renderItem = ({ item: {id, uri}, index }) => {
    const onLongPress = () => deleteImage(id);
    return (
      <TouchableOpacity onLongPress={onLongPress}>
        <Image source={{ uri }} style={{width: columnSize, height: columnSize}} />
      </TouchableOpacity>
    );
  };


  return(
    <View style={styles.container}>
      <Button title="갤러리 열기" onPress={onPressOpenGallery} />
      <FlatList data={images} renderItem={renderItem} numColumns={3} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    marginTop: 30
  }
})

