/* 
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Header } from "../components/Header/Header";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { getAddressFromCoords, getCoordsFromAddress, getCoordsFromKeyword } from "../utils/GeoUtils";
import { SingleLineInput } from "../components/SingleLineInput";
import { useRootNavigation } from "../navigation/RootNavigation";
import { getRestaurantList } from "../utils/RealTimeDataBaseUtils";



export const MainScreen: React.FC = () => {
    const navigation = useRootNavigation<'Main'>();

    const [query, setQuery] = useState<string>('')

    const [isMapReady, setIsMapReady] = useState<boolean>(false);

    const [markerLists, setMarkerLists] = useState<{title: string, address: string, latitude:number, longitude: number}[]>([])

    const [currentRegion, setCurrentRegion] = useState<{
        latitude: number,
        longitude: number
    }>({
    latitude: 37.3160401, 
    longitude: 126.8385268
    });

    const [currentAddress, setCurrentAddress] = useState<string|null>(null);


    const onChangeLocation = useCallback<(item:{latitude: number, longitude:number}) => Promise<void>>(async(item) => {
        setCurrentRegion({
            latitude: item.latitude, 
            longitude: item.longitude 
        })
        getAddressFromCoords(
            item.latitude,
            item.longitude,
        ).then(setCurrentAddress);
    }, [])



    const getMyLocation = useCallback(()=> {
        Geolocation.getCurrentPosition((position) => {
            onChangeLocation({
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
            })
        });
    }, [onChangeLocation])




    const onFindAddress = useCallback<()=>Promise<void>>(async() => {
        const keywordResult = await getCoordsFromKeyword(query)

        if(keywordResult !== null) { 
            setCurrentAddress(keywordResult.address);
            setCurrentRegion({
                latitude: keywordResult.latitude,
                longitude: keywordResult.longitude
            })
            return;
        }
       
        const addressResult = await getCoordsFromAddress(query);
        if(addressResult === null) {
            console.error('주소를 찾지 못했습니다.');
            return;
        }
        setCurrentAddress(addressResult.address);
        setCurrentRegion({
            latitude: addressResult.latitude,
            longitude: addressResult.longitude
        })
    },[query])




    const onPressBottomAddress = useCallback(() => {
        if(currentAddress === null) {
            return;
        }
        navigation.push('Add', {
            latitude: currentRegion.latitude,  
            longitude: currentRegion.longitude,
            address: currentAddress
        });
    }, [currentAddress,
        currentRegion.latitude, 
        currentRegion.longitude,
        navigation
    ])



    const onMapReady = useCallback(async()=>{
        setIsMapReady(true);
        const restaurantList = await getRestaurantList();
        setMarkerLists(restaurantList);
    }, [])



    useEffect(()=>{
        getMyLocation()
    },[getMyLocation])



    return (
        <View style={{flex: 1}}>

            <MapView  
                style={{flex:1}} 
                region={{
                    latitude: currentRegion.latitude,  
                    longitude: currentRegion.longitude,
                    latitudeDelta: 0.0015,
                    longitudeDelta: 0.0121,
                }}
                onMapReady={onMapReady} // onMapReady={맵이 준비되었을때 실행될 콜백함수}
                onLongPress={(event) => { // onLongPress={길게 눌렀을때 실행될 콜백함수} / 매개변수에는 길게 누름 이벤트 정보가 담김.
                    onChangeLocation(event.nativeEvent.coordinate); // 길게 누름 이벤트 정보.nativeEvent.coordinate: 길게 누른 곳의 좌표값을 가짐.
                }}
            >
                {isMapReady && (
                    <Marker
                        coordinate={{
                            latitude: currentRegion.latitude,
                            longitude: currentRegion.longitude,
                        }}
                        />
                )}

                {isMapReady && (
                    markerLists.map((markerList) => {
                        return (
                            <Marker
                                title={markerList.title} // title={마커에 대한 타이틀}
                                description={markerList.address}  // description={마커에 대한 설명}
                                coordinate={{
                                    latitude: markerList.latitude,
                                    longitude: markerList.longitude
                                }}
                                pinColor={'blue'} // pinColor={마커 색깔}
                                onCalloutPress={() => {
                                    navigation.push('Detail', {
                                        latitude: markerList.latitude,
                                        longitude: markerList.longitude,
                                        address: markerList.address,
                                        title: markerList.title
                                    })
                                }}
                            />
                        )
                    })
                )}

                    <Marker
                        coordinate={{
                            latitude: currentRegion.latitude,
                            longitude: currentRegion.longitude,
                    }} 
                    />
            </MapView>

                <View style={{position:'absolute', top:24, left:24, right:24}}>
                    <View style={{backgroundColor:'white'}}>
                        <SingleLineInput
                            value={query} 
                            onChangeText={setQuery} 
                            placeholder='주소를 입력해 주세요'
                            onSubmitEditing={onFindAddress}
                        />
                    </View>
                </View>

            {currentAddress !== null && ( 
                <View 
                    style={{
                        position:'absolute', 
                        left:0, 
                        right:0, 
                        bottom:24, 
                        alignItems:'center', 
                        justifyContent:'center'
                    }}>
                    <Pressable 
                        onPress={onPressBottomAddress}
                        style={{
                            backgroundColor:'gray',
                            paddingHorizontal:24, 
                            paddingVertical:12, 
                            borderRadius:30
                        }}>
                        <Text style={{fontSize:16, color:'white'}}> {currentAddress} </Text>
                    </Pressable>    
                </View>
            )}
        </View>
    )
} 
*/



///////////////////////////////////


/*
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { Header } from '../components/Header/Header';
import { AccountBookHistory } from '../data/AccountBookHistory';
import { AccountHistoryListItemView } from '../components/AccountHistoryListItemView';
import { useRootNavigation } from '../navigation/RootNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Icon } from '../components/Icons';
import SQLite from 'react-native-sqlite-storage';
import { useAccountBookHistoryItem } from '../hooks/useAccountBookHistoryItem';
import { useFocusEffect } from '@react-navigation/native';
import { StackedBarChart } from 'react-native-chart-kit';
import { Typography } from '../components/Typography';
import { Spacer } from '../components/Spacer';


const now = new Date().getTime();

export const MainScreen: React.FC = () => {
    const navigation = useRootNavigation();
    const safeAreaInset = useSafeAreaInsets();

    const {getList, getMonthlyAverage} = useAccountBookHistoryItem();
    const {width} = useWindowDimensions();

    useEffect(() => {
        SQLite.openDatabase(
            {
                name: 'account_history',
                createFromLocation: '~www/account_history.db',
                location: 'default'
            },
            () => {console.log('오픈 데이터베이스 성공')},
            () => {console.log('오픈 데이터베이스 실패')}
        )
    },[])


    const [list, setList] = useState<AccountBookHistory[]>([
        {
            id: 0,
            type: '사용',
            price: 30000,
            comment: 'test1',
            date: now,
            createdAt: now,
            updatedAt: now,
            photoUrl: null
        },
        {
            id: 1,
            type: '수입',
            price: 20000,
            comment: 'test2',
            date: now,
            createdAt: now,
            updatedAt: now,
            photoUrl: 'https://docs.expo.dev/static/images/tutorial/background-image.png'
        }
    ]);

    const [average, setAverage] = useState<{month:number, data:number[]}[]>([]);

    const fetchList = useCallback(async()=>{
        const data = await getList();
        console.log(data);
        setList(data);

        const monthlyAverage = await getMonthlyAverage();
        setAverage(monthlyAverage);
        
    },[getList, getMonthlyAverage])



    useFocusEffect(
        useCallback(() => {
            fetchList();
        },[fetchList])
    )

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='Main SCREEN' />
                <Header.Icon name="close" onPress={()=>{}} />
            </Header>

            <FlatList 
                data={list}
                ListHeaderComponent={
                    <Button onPress={()=>navigation.push('MonthlyAverage')}>
                        <View 
                            style={{
                                height: 200, 
                                alignItems:'center',
                                justifyContent: 'center'
                            }}>
                            <View>
                                <Typography fontSize={16} color='gray'>
                                    이번달 총 사용금액
                                </Typography>
                                <Spacer space={12} />
                                <Typography fontSize={24}>
                                    {average[average.length-1]?.data[0]?.toString()} 원
                                </Typography>
                            </View>
                            
                            <View>
                                <Typography fontSize={16} color='gray'>
                                    이번달 총 수입금액
                                </Typography>
                                <Spacer space={12} />
                                <Typography fontSize={24}>
                                    {average[average.length-1]?.data[1]?.toString()} 원
                                </Typography>
                            </View>
                        </View>
                    </Button>
                }

                renderItem={({item})=>{
                    return (
                        <AccountHistoryListItemView
                            item={item}
                            onPressItem={(clickedItem) => {
                                navigation.push('Detail', {item: clickedItem})
                            }}
                        />
                    )
                }}
            />
            <View 
                style={{
                    position:'absolute', 
                    right:12, 
                    bottom:12 + safeAreaInset.bottom, 
                }}>
                <Button 
                    onPress={()=>{
                        navigation.push('Add');
                }}>
                    <View 
                        style={{
                            width:50,
                            height:50,
                            borderRadius:25,
                            backgroundColor:'red',
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                            <Icon name="add" size={30} color="white" />
                    </View>
                </Button>
            </View>
        </View>
    )
}
*/

///////////////////



import React, { useCallback, useEffect } from "react";
import {  Alert, View, useWindowDimensions } from "react-native";
import { Header } from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { TypeRootReducer } from "../store";
import { TypeDog } from "../data/TypeDog";
import { TypeDogDispatch, getDog, likeDog } from "../actions/dog";
import { RemoteImage } from "../components/RemoteImage";
import { Spacer } from "../components/Spacer";
import { Button } from "../components/Button";
import { Icon } from "../components/Icons";
import { Typography } from "../components/Typography";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Purchase, useIAP } from "react-native-iap";
import { userPurchaseItem } from "../actions/user";
import PushNotification from "react-native-push-notification";
import analytics from '@react-native-firebase/analytics'


export const MainScreen:React.FC = () => {
    const {width} = useWindowDimensions();

    const dog = useSelector<TypeRootReducer, TypeDog | null>((store) => store.dog.currentDog)
    
    const dispatch = useDispatch<TypeDogDispatch>();



    const {requestPurchase, getProducts, getAvailablePurchases, currentPurchase, finishTransaction} = useIAP();


    const onPressPurchaseItem = useCallback(async() => {
        await getAvailablePurchases(); // getAvailablePurchases(): 구매를 가능하게 함.
        const productList = await getProducts({ // getProducts({ skus: ['제품ID'] }): 해당 제품을 가져온 후, 제품 리스트를 반환함.
            skus: ['com.lovedog.product.10']
        })

        try {
            await requestPurchase({ // requestPurchase({ skus: ['제품ID'] }): 해당 제품의 구매를 요청함.
                skus: ['com.lovedog.product.10']
            })
        } catch(ex) {
            console.error(ex);
        }
    }, [requestPurchase, 
        getProducts, 
        getAvailablePurchases])



    const userPurchasedItem = useCallback(async(purchase: Purchase) => {
        try {
            await dispatch(userPurchaseItem());
        
            finishTransaction({ 
                purchase: purchase,
                isConsumable: true,
            })
            // finishTransaction({
            //     purchase: Purchase객체
            //     isConsumable: 소비 가능 여부,
            // }): 제품의 구매를 마친후, 소비할 수 있도록 해줌.
        } catch(ex) {
            
        }
    }, [dispatch, finishTransaction])



    useEffect(()=>{
        if(currentPurchase) { // currentPurchase: 현재 구매 요청한 제품의 Purchase객체를 가짐.
            userPurchasedItem(currentPurchase);
        }
    },[currentPurchase, userPurchasedItem])




    const onPressLike = useCallback(async() => {
        if(dog === null) { 
            return;
        }
        analytics().logEvent('온 프레스 라이크', {dogPhoto: dog.photoUrl })

        try {
            PushNotification.createChannel( 
                {
                    channelId: 'lovedog-channel',
                    channelName: 'Love Dog Channel'
                },
                created => {
                    console.log('크리에이티드', created)
                },
            )
            // PushNotification.createChannel( 
            //     {
            //         channelId: '채널 아이디',
            //         channelName: '채널명'
            //     },
            //     (채널 생성 여부) => { 처리로직 }
            // ): 알림 채널을 생성한 후, 콜백함수를 실행함. 



            
            PushNotification.localNotificationSchedule({ 
                channelId: 'lovedog-channel',
                id: new Date(Date.now()).getTime().toString(),
                message: '들어와서 좋아요를 눌러보세요',
                allowWhileIdle: true,
                date: new Date(Date.now() + 10 * 1000),
                picture: dog.photoUrl,
                repeatTime: 1,
            })
            // PushNotification.localNotificationSchedule({ 
            //     channelId: '채널 아이디',
            //     id: '아이디',
            //     message: '알림 메시지',
            //     allowWhileIdle: 나태 허용 여부,
            //     date: 알림 날짜,
            //     picture: 사진URL,
            //     repeatTime: 알림 반복 횟수,
            // }): 해당 알림 채널을 통해서 지정된 날짜에 알림 메시지를 보냄.


            await dispatch(likeDog(dog)); 
            dispatch(getDog())

        } catch(ex) {
            console.error(ex);
            const error = ex as Error;
            if(error.message === 'Today`s Like Count is Over') {
                Alert.alert(
                    '1일 좋아요 회수를 초과하였습니다.',
                    '더 많은 강아지 사진을 좋아요 하려면 추가 좋아요를 구매 해주세요',
                    [
                        {
                            text: '구매하기',
                            onPress: onPressPurchaseItem,
                        },
                        {
                            text: '다음에'
                        }
                    ]
                )
            }
        }
    }, [dispatch, dog])

    

    const onPressNotLike = useCallback(() => {
        dispatch(getDog());
    }, [dispatch])


    
    useEffect(()=>{
        dispatch(getDog());
    }, [dispatch])


    const start = useSharedValue({x:0, y:0})

    const offset = useSharedValue({x:0, y:0});
    

    const gesture = Gesture
                        .Pan()
                        .runOnJS(true)
                        .onBegin(() => {
                            console.log('온 비긴')
                        })
                        .onUpdate((event) => {
                            console.log(event); 
                            console.log('온 업데이트'); 
                            offset.value = { x: event.translationX + start.value.x, 
                                             y: offset.value.y
                                          }
                        })
                        .onFinalize(() => {
                            if(offset.value.x < -150) { 
                                runOnJS(onPressLike)();
                            }
                            if(offset.value.x > 150) {
                                runOnJS(onPressNotLike)();
                            }

                            console.log('온 파이널라이즈')
                            offset.value ={
                                x: 0,
                                y: 0
                            }
                        })



    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        offset.value.x,
                        [-200, 0, 200],
                        [-100, 0, 100]
                    )
                },
                {
                    translateY: interpolate(
                        offset.value.y,
                        [-200, 0, 200],
                        [-50, 0, -50]
                    )
                },
                {
                    rotate:`${interpolate(
                        offset.value.x,
                        [-200, 0, 200],
                        [30, 0, -30],
                    )}deg`
                }
            ]
        }
    })



    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="MainScreen" />
            </Header>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                {dog !== null && (
                    <View style={{width: width * 0.7}}>
                        <GestureDetector gesture={gesture}>
                            <Animated.View style={{alignItems:'center', justifyContent:'center'}}>
                                <Animated.View style={animatedStyle}>
                                    <RemoteImage 
                                        url={dog.photoUrl} 
                                        width={width * 0.7} 
                                        height={width * 0.7} 
                                    />
                                </Animated.View>
                            </Animated.View>
                        </GestureDetector>

                        <Spacer space={64} />

                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1, marginRight:10}}>
                                <Button onPress={onPressLike}>
                                    <View style={{paddingVertical:12, backgroundColor:'red', alignItems:'center', justifyContent:'center', borderRadius:4}}>
                                        <Icon name='thumbs-up' color='white' size={16} />
                                        <Typography fontSize={20} color="white">
                                            LIKE
                                        </Typography>
                                    </View>
                                </Button>
                            </View>
                            <View style={{flex:1, marginLeft:10}}>
                                <Button onPress={onPressNotLike}>
                                    <View style={{paddingVertical:12, backgroundColor:'blue', alignItems:'center', justifyContent:'center', borderRadius:4}}>
                                        <Icon name='thumbs-down' color='white' size={16} />
                                        <Typography fontSize={20} color="white">
                                            NOT LIKE
                                        </Typography>
                                    </View>
                                </Button>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}