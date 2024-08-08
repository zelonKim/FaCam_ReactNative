/*
import React, { useCallback } from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import { Typography } from "../components/Typography";
import { Spacer } from "../components/Spacer";
import { SingleLineInput } from "../components/SingleLineInput";
import MapView, { Marker } from "react-native-maps";
import { Button } from "../components/Button";
import { useRootNavigation, useRootRoute } from "../navigation/RootNavigation";
import KakaoShareLink from 'react-native-kakao-share-link';


export const DetailScreen: React.FC = () => {
    const navigation = useRootNavigation<'Detail'>();

    const routes = useRootRoute<'Detail'>();


    const onPressKaKaoShare = useCallback(async()=>{
            const response = await KakaoShareLink.sendLocation({
              address: routes.params.address,
              addressTitle: routes.params.title,
              content: {
                title: routes.params.title,
                imageUrl:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwN94qRehqKuJ0keihZVv9bsYxMiuZUGK9yw&s',
                link: {
                  mobileWebUrl: 'https://herewego.link/bbs/board.php?bo_table=reveiw&wr_id=3445',
                },
                description: '이곳은 어떤가요?',
              },
            });
    }, [routes.params.address,
        routes.params.title])


    const onPressBack = useCallback(()=>{
        navigation.goBack();
    }, [navigation]);


    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="Detail" />
                <Header.Icon name="close" onPress={onPressBack} />
            </Header>

        <View style={{flex:1, paddingTop:24, paddingHorizontal:24}}>
         <Typography fontSize={16}> 가게명 </Typography>
         <Spacer space={8} /> 

         <Typography fontSize={20}>{routes.params.title}</Typography>
         <Spacer space={24} />

         <Typography fontSize={16}> 주소 </Typography>
         <Spacer space={8} />
         <Typography fontSize={20}>{routes.params.address}</Typography>
         <Spacer space={24} />

         <Typography fontSize={16}> 위치 </Typography>
         <Spacer space={8} />

         <MapView
             style={{ height: 200 }}
             region={{ 
                 latitude: routes.params.latitude,
                 longitude: routes.params.longitude,
                 latitudeDelta: 0.00015,
                 longitudeDelta: 0.00121,
             }}>
             <Marker 
                 coordinate={{
                     latitude: routes.params.latitude,
                     longitude: routes.params.longitude,
                 }}
             />
         </MapView>

         <Spacer space={48} />

         <Button onPress={onPressKaKaoShare}>
             <View 
                 style={{
                     backgroundColor: 'yellow', 
                     paddingHorizontal:24,
                     paddingVertical:12,
                     alignItems:'center'
                 }}>
                 <Typography fontSize={20} color='black'> 카카오 공유하기 </Typography>
             </View>
         </Button>
     </View>
 </View>
    )
}
*/



///////////////////////////////////



import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { useRootNavigation, useRootRoute } from '../navigation/RootNavigation';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { Spacer } from '../components/Spacer';
import { SingleLineInput } from '../components/SingleLineInput';
import { convertToDateString } from '../utils/DateUtils';
import { RemoteImage } from '../components/RemoteImage';
import { MultiLineInput } from '../components/MultiLineInput';
import { Icon } from '../components/Icons';
import { AccountBookHistory } from '../data/AccountBookHistory';


export const DetailScreen: React.FC = () => {
    const navigation = useRootNavigation<'Detail'>();

    const routes = useRootRoute<'Detail'>();

    const [item, setItem] = useState<AccountBookHistory>(routes.params.item);

    const onPressUpdate = useCallback(() => {
        navigation.push('Update',{
            item: routes.params.item,
            onChangeData: nextItem => {
                setItem(nextItem);
            },
        })
    }, [navigation, routes.params.item])

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='Detail SCREEN' />
                <Header.Icon name="close" onPress={navigation.goBack} />
            </Header>

            <ScrollView
                style={{ flex:1 }} 
                contentContainerStyle={{
                    paddingTop:32,
                    paddingHorizontal:24
                }}
            >
                <View style={{flexDirection:'row'}}>

                    <View style={{flex:1}}>
                            <View 
                                style={{
                                    backgroundColor: item.type === '사용' ? 'black' : 'white', 
                                    alignItems:'center',
                                    justifyContent:'center',
                                    paddingVertical:12,
                                    borderTopLeftRadius:12,
                                    borderBottomLeftRadius:12
                            }}>
                                <Typography fontSize={16} color={item.type === '사용' ? 'white' : 'black'}> 사용 </Typography>
                            </View>
                    </View>

                    <View style={{flex:1}}>
                            <View 
                                style={{
                                    backgroundColor: item.type === '수입' ? 'black' : 'white', 
                                    alignItems:'center',
                                    justifyContent:'center',
                                    paddingVertical:12,
                                    borderTopRightRadius:12,
                                    borderBottomRightRadius:12
                            }}>
                                <Typography fontSize={16} color={item.type === '수입' ? 'white' : 'black'}> 수입 </Typography>
                            </View>
                    </View>

                </View>
                <Spacer space={20} />
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{flex:1}}>

                        <View 
                            style={{ 
                                borderColor: 'gray',
                                borderWidth: 1,
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                borderRadius:4
                            }}
                        >
                            <Typography 
                                fontSize={16}
                                color={item.date === 0 ? 'lightgray' : 'gray'}
                            >
                                {item.price.toString() + '원'}
                            </Typography>
                        </View>

                        <Spacer space={24} />

                            <View 
                                style={{ 
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius:4
                                }}
                            >
                                <Typography 
                                    fontSize={16}
                                    color={item.date === 0 ? 'lightgray' : 'gray'}
                                >
                                    {convertToDateString(item.date)}
                                </Typography>
                            </View>
                    </View>

                    <View style={{marginLeft:24}}>
                            {item.photoUrl ? ( 
                                <RemoteImage
                                    url={item.photoUrl} 
                                    width={100} 
                                    height={100}  
                                    style={{ borderRadius:12 }} 
                                />
                            ) : (
                            <View
                                style={{
                                    width:100,
                                    height:100,
                                    borderRadius:12,
                                    backgroundColor:'lightgray',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}
                            >
                            </View>
                            )}
                    </View>
                </View>
                
                <Spacer space={12} />

                <View 
                    style={{
                        alignSelf:'stretch',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: 'gray',
                        height: 100
                    }}>
                    <Typography fontSize={20} color='gray'> {item.comment} </Typography>
                </View>

                <Spacer space={64} />

                <Button onPress={onPressUpdate}>
                    <View 
                        style={{
                            paddingVertical:12,
                            backgroundColor: 'black',
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:8
                        }}>
                        <Typography color="white" fontSize={16}>
                            {'수정하기'} 
                        </Typography>
                    </View>
                </Button>
            </ScrollView>

        </View>
    )
}
