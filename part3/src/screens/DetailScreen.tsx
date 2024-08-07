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



import React from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';
import { useRootNavigation } from '../navigation/RootNavigation';

export const DetailScreen: React.FC = () => {
    const navigation = useRootNavigation();

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='Detail SCREEN' />
                <Header.Icon name="close" onPress={navigation.goBack} />
            </Header>
        </View>
    )
}