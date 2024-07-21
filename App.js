import { Alert, Dimensions, FlatList, FlatListComponent, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, RefreshControl, SafeAreaView, ScrollView, SectionList, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import StateWithClassComponent from './src/StateWithClassComponent'
import StateWithFunctionalComponent from './src/StateWithFunctionalComponent'
import UseEffectWithClassComponent from './src/UseEffectWithClassComponent'
import UseEffectWithFunctionalComponent   from './src/UseEffectWithFunctionalComponent'
import Header from './src/Header';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Profile from "./src/Profile"
import {busStop, getBusNumColorByType, getRemainedTimeText, getSeatStatusText, getSections, myProfile} from './src/data';
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
import dayjs, { Dayjs } from 'dayjs';
import { ITEM_WIDTH, bottomSpace, getCalendarColumns, getDayColor, getDayText, statusBarHeight } from './src/util';
import { useCalendar } from './src/use-calendar';
import { useTodoList } from './src/use-todo-list';
import Calendar from './src/Calendar';
import { Ionicons } from '@expo/vector-icons';
import AddTodoInput from './src/AddTodoInput';
import { useGallery } from './src/use-gallery';
import * as ImagePicker from 'expo-image-picker';
import MyDropDownPicker from './src/MyDropDownPicker';
import TextInputModal from './src/TextInputModal';
import BigImgModal from './BigImgModal';
import ImageList from './src/ImageList';
import BusInfo from './src/BusInfo';
import { COLOR } from './src/color'
import BookmarkButton from './src/BookmarkButton';
import { useTheme } from './src/use-theme';


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





/* 
export default function App() {

  const {
    pickImage, 
    deleteImage, 
    imagesWithAddButton, 
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropDown,
    closeDropDown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectImage,
    selectedImage,
    moveToPreviousImage,  
    moveToNextImage,
    showPreviousArrow,
    showNextArrow
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  }

  const onLongPressImage = (imageId) => deleteImage(imageId);


  const onPressWatchAd = () => {
    console.log('load ad')
  }

  const onPressAddAlbum = () => {
    if(albums.length >= 2) {
      Alert.alert("광고를 시청해야 앨범을 추가할 수 있습니다.","", [
        {
          style: "cancel",
          text: "닫기"
        },
        {
          text: "광고 시청",
          onPress: onPressWatchAd,
        }
      ])
    } else {
      openTextInputModal();
    }
  };
  


  const onSubmitEditing = () => {
    if(!albumTitle) return;
    addAlbum();
    closeTextInputModal();
    resetAlbumTitle();
  }

  const onPressTextInputModalBackdrop = () => {
    closeTextInputModal();
  }


  const onPressBigImgModalBackdrop = () => {
    closeBigImgModal();
  }



  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropDown();
    } else {
      openDropDown();
    }
  }

  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropDown();
  }

  const onLongPressAlbum = (albumId) => {
    deleteAlbum(albumId)
  }

  const onPressImage = (image) => {
    selectImage(image);
    openBigImgModal();
  }

  const onPressLeftArrow = () => {
    moveToPreviousImage();
  }

  const onPressRightArrow = () => {
    moveToNextImage();
  }


  


  return(
    <SafeAreaView style={styles.container}>
      <MyDropDownPicker 
        isDropdownOpen={isDropdownOpen} 
        onPressHeader={onPressHeader} 
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum} 
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
      />
      
      <TextInputModal 
        modalVisible={textInputModalVisible} 
        albumTitle={albumTitle} 
        setAlbumTitle={setAlbumTitle}  
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputModalBackdrop}
      />

      <BigImgModal 
        modalVisible={bigImgModalVisible}
        onPressBackdrop={onPressBigImgModalBackdrop}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />

      <ImageList
        imagesWithAddButton={imagesWithAddButton}
        onPressOpenGallery={onPressOpenGallery}
        onPressImage={onPressImage}
        onLongPressImage={onLongPressImage}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    marginTop: 30
  }
})
 */


/////////////////////////////////////


/* 
const busStopBookmarkSize = 20;
const busStopBookmarkPadding = 6;


export default function App() {
  const sections = getSections(busStop.buses);

  const [now, setNow] = useState(dayjs())
  const [refreshing, setRefreshing] = useState(false);


  const { NEWCOLOR, toggleIsDark, isDark } = useTheme();

  const onPressBusStopBookmark = () => {

  }

  const ListHeaderComponent = () => (
    <View style={{ 
        backgroundColor: NEWCOLOR.GRAY_3_GRAY_2,
        height: 150,
        justifyContent: "center", 
        alignItems: "center",
      }}>

        <Margin height={10} />
        
        <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 13 }}>{busStop.id}</Text>
        <Margin height={4} />

        <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 20 }}>{busStop.name}</Text>
        <Margin height={4} />

        <Text style={{ color: NEWCOLOR.GRAY_1_GRAY_2, fontSize: 14 }}>{busStop.directionDescription}</Text>
        <Margin height={20} />

        <BookmarkButton 
          NEWCOLOR={NEWCOLOR}
          size={25} 
          isBookmarked={busStop.isBookmarked}
          onPress={onPressBusStopBookmark}
          style={{ 
            borderWidth: 0.3,
            borderColor: NEWCOLOR.GRAY_1_GRAY_4,
            borderRadius: (busStopBookmarkSize + busStopBookmarkPadding * 2) / 2,
            padding: busStopBookmarkPadding,
          }}
        />
        <Margin height={25} /> 

        <Switch value={isDark} onValueChange={toggleIsDark} />
    </View>
  )


  const renderSectionHeader = ({ section: { title }}) => (
    <View style={{ 
        paddingLeft: 13,
        paddingVertical: 3,
        backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
        borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3,   
    }}>
      <Text style={{ fontSize:12, color: NEWCOLOR.GRAY_4_GRAY_1 }}>{title}</Text>
    </View>
  );


  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);

    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos = !firstNextBusInfo && !secondNextBusInfo ? [null] : [firstNextBusInfo, secondNextBusInfo];

    //console.log(newNextBusInfos);


    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if(!info) return {
        hasInfo: false,
        remainedTimeText: "도착정보 없음"
      }

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime)
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers)
      return {
          hasInfo: true,
          remainedTimeText,
          numOfRemainedStops,
          seatStatusText,
      };
    });  

    return(
        <BusInfo 
          NEWCOLOR={NEWCOLOR}
          isBookmarked={bus.isBookmarked}
          onPressBookmark={() => {}}
          num={bus.num}
          directionDescription={bus.directionDescription}
          numColor={numColor}
          processedNextBusInfos={processedNextBusInfos}
      />
    )
  }




  const ItemSeparatorComponent = () => (
    <View style={{ width: "100%", height: 10, backgroundColor: NEWCOLOR.GRAY_1_GRAY_4 }} />
  )


  const ListFooterComponent = () => (
    <Margin height={30} />
  )



  useEffect(() => {
    const interval = setInterval(() => { // setInterval(함수, 시간간격): 주어진 시간간격마다 해당 함수를 호출하고, 인터벌을 반환함.
      const newNow = dayjs();
      setNow(newNow)
    }, 10000)
     
    return () => { // 컴포넌트가 언마운트(제거)될때 호출함.
      clearInterval(interval); // clearInterval(인터벌): 해당 인터벌을 종료함.
    }
  },[])






  const onRefresh = () => {
    console.log('리프레쉬됨.')
    setRefreshing(true);
  }


  useEffect(() => {
    if(refreshing) {
        setNow(dayjs());
        setRefreshing(false);
    }
  }, [refreshing])


  return(
    <View style={{
      ...styles.container,
      backgroundColor: NEWCOLOR.WHITE_BLACK
    }}>
      <View 
        style={{ 
          backgroundColor: COLOR.GRAY_3, 
          width: "100%" }}>
      <SafeAreaView style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={{ padding: 10 }}>
          <SimpleLineIcons name="arrow-left" size={20} color={NEWCOLOR.WHITE_BLACK} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <SimpleLineIcons name="home" size={20} color={NEWCOLOR.WHITE_BLACK} />
        </TouchableOpacity>
      </SafeAreaView>
      <View 
            style={{ 
              position: "absolute",
              width: "100%",
              height: 500,
              backgroundColor: "lightcoral",
              backgroundColor: COLOR.GRAY_3,
              zIndex: -1,
            }} />
      </View>

      <SectionList
        style={{ flex: 1, width: "100%" }}

        sections={sections} // 각 섹션에 대한 data속성을 가진 객체의 배열을 renderSectionHeader의 section프로퍼티로 전달하고, 해당 data속성값은 renderItem의 item프로퍼티로 전달함.
        
        renderSectionHeader={renderSectionHeader} // 각 섹션의 헤더 컴포넌트를 지정함.
        
        renderItem={renderItem} // 각 섹션에 들어갈 아이템 컴포넌트를 지정함.

        ItemSeparatorComponent={ItemSeparatorComponent} // 아이템을 구분해줄 컴포넌트를 지정함.

        ListHeaderComponent={ListHeaderComponent} // 리스트 최상단의 헤더 컴포넌트를 지정함.

        ListFooterComponent={ListFooterComponent} // 리스트 최하단의 푸터 컴포넌트를 지정함.

        refreshControl={ // 스크롤을 올려서 새로고침 될때의 RefreshControl컴포넌트를 지정함. 
          <RefreshControl
            refreshing={refreshing} // 새로고침 진행중으로 유지할지 여부를 지정함.
            onRefresh={onRefresh} // 새로고침 완료후에 실행할 함수를 지정함.
          />
        }
        />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 30
  }
}) 
*/

/////////////////////////////////




import {useTranslation} from './src/use-translation'
import {useCookie} from './src/use-cookie'
import Button from './src/Button';
import * as SplashScreen from 'expo-splash-screen';
import LoadingView from './src/LoadingView';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import { I18n } from 'i18n-js';
import { format } from 'react-string-format';


export default function App() {

  /*
  const i18n = new I18n({ // new I18n( { 언어코드: { 키: '밸류'} } ): 해당 언어에 대한 키와 밸류를 가진 i18n객체를 생성함.
    ko: {todayIs: "오늘은 {0}년 {1}월 {2}일이에요."},
    en: {todayIs: "Today is {1}/{2}/{0}."},
    zh: {todayIs: "今天是 {0} 年 {1} 月 {2} 日。"}
  })
  
  i18n.locale = "ko"

  const dateText = format(i18n.t('todayIs'), '2024', '12', '25');

  return (
    <View style={styles.topContainer}>
      <Text>{dateText}</Text> 
    </View>
  )
}
*/


SplashScreen.preventAutoHideAsync(); // 스플래쉬 스크린이 자동으로 숨겨지지 않도록 해줌.


const { translator, locale, setLocale, format } = useTranslation();
  const { cookieKey } = useCookie();

  const [fontsLoaded] = useFonts({
    'RIDIBatang': require('./assets/fonts/RIDIBatang.otf')
  }) // useFonts( { '폰트명': require('폰트경로') } ): 해당 폰트가 로드되면 첫번째 인자로 true를 반환함.

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=> {
    if (cookieKey !== "") {
      setIsLoaded(true);
    }
  },[cookieKey])


  useEffect(()=> {
    if(locale !== null && fontsLoaded) {
      SplashScreen.hideAsync(); // 스플래쉬 스크린을 숨겨줌.
    }
  }, [locale, fontsLoaded])


  if(!isLoaded) return (
    <LoadingView />
  )

  const y = new Date().getFullYear();
  const m = new Date().getMonth() + 1;
  const d = new Date().getDate();

  const todayText = format(translator('today_is'), y, m, d);

  const translatedText = translator(cookieKey) // i18n객체.t('키'): 해당 키와 매칭되는 밸류를 반환함.

  const locales = ["ko", "en", "ja", "zh", "es"];

  return (
    <View style={styles.container}>

      <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            <Text style={styles.todayText}> {todayText} </Text>
            <Text style={{ fontFamily: "RIDIBatang"}}> {translatedText} </Text>
          </View>
          
          <View style={styles.bottomContainer}>
            <View style={styles.buttonsContainer}>
            {locales.map(item => (
              <Button 
              key={item}
              onPress={() => setLocale(item)}
              isSelected={locale === item}
              text={item.toUpperCase()}
              />
            ))}
          </View>
          </View>
      </SafeAreaView>

      <LottieView 
        autoPlay={true}
        source={require('./assets/background.json')}
        resize="cover"
        style={{
          position: "absolute",
          zIndex: -1,
         }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  todayText: {
    fontFamily: "RIDIBatang", 
    position: "absolute",
    top: 70,
    fontSize: 13,
    color: "#8b658f",
  },
  cookieText: {
    fontFamily: "RIDIBatang",
    fontSize: 22,
    color: "#372538",
    textAlign: "center",
    marginHorizontal: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 25,
  },
});

