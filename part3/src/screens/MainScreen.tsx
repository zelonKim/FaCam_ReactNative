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



import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { AccountBookHistory } from '../data/AccountBookHistory';
import { AccountHistoryListItemView } from '../components/AccountHistoryListItemView';
import { useRootNavigation } from '../navigation/RootNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Icon } from '../components/Icons';
import SQLite from 'react-native-sqlite-storage';


const now = new Date().getTime();

export const MainScreen: React.FC = () => {
    const navigation = useRootNavigation();
    const safeAreaInset = useSafeAreaInsets();


    useEffect(()=>{
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


    const [list] = useState<AccountBookHistory[]>([
        {
        id: 0,
        type: '사용',
        price: 10000,
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

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='Main SCREEN' />
                <Header.Icon name="close" onPress={()=>{}} />
            </Header>

            <FlatList 
                data={list}
                renderItem={({item})=>{
                    return (
                        <AccountHistoryListItemView
                            item={item}
                            onPressItem={(clicked) => {
                                navigation.push('Detail', {item: clicked})
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
