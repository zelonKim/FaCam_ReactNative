import React, { useCallback, useState } from "react"
import { ActivityIndicator, View, useWindowDimensions } from "react-native"
import { Typography } from "../components/Typography"
import { Header } from "../components/Header/Header"
import { useNavigation, useRoute } from "@react-navigation/native"
import { RemoteImage } from "../components/RemoteImage"
import { Button } from "../components/Button"
import { Icon } from "../components/Icons"
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from "react-redux"
import { onClickFavorite } from "../actions/favorite"

export const ImageDetailScreen = (props) => {
    const {width} = useWindowDimensions();

    const navigation = useNavigation();
    const route = useRoute();

    const [donwloading, setDownloading] = useState(false)

    const onPressBack = useCallback(() => {
        console.log('온 프레스 백')
        navigation.goBack(); // 뒤로가기
    }, [])


    const dispatch = useDispatch();

    const onPressFavorite = useCallback(() => {
        dispatch(onClickFavorite(route.params.url))
    }, [])


    const isFavorite = useSelector((store) => {
        return store.favorite.favoriteList.filter((item) => item === route.params.url).length > 0
   })


    const onPressDownload = useCallback(async() => {
        setDownloading(true);

        const downloadResumable = FileSystem.createDownloadResumable( // FileSystem.createDownloadResumable(이미지 주소, 다운 파일명): 다운로드 객체를 생성함.
            route.params.url,
            `${FileSystem.documentDirectory} ${new Date().getMilliseconds()}.jpg`
        )
        try {
            const {uri} = await downloadResumable.downloadAsync(); // 다운로드 객체.downloadAsync(): 다운로드를 위한 파일uri를 반환함.
            console.log('다운로드 완료됨', uri)


            const permissionResult = await MediaLibrary.getPermissionsAsync(true); // MediaLibrary.getPermissionsAsync(): 미디어 라이브러리에 대한 사용자의 퍼미션 객체를 반환함.
            console.log('퍼미션 결과', permissionResult); 

             // 퍼미션 객체.status: 퍼미션의 상태를 나타냄.
            if(permissionResult.status === 'denied') { // 퍼미션 거부
                setDownloading(false);
                return;
            }

            if(permissionResult.status === 'undetermined') { // 퍼미션 미정
                const requestResult = await MediaLibrary.requestPermissionsAsync(); // MediaLibrary.requestPermissionsAsync(): 미디어 라이브러리에 접근하기 위한 퍼미션 허용을 사용자에게 요청하고, 그 요청 결과를 반환함.
                if(requestResult.status === 'denied') { 
                    setDownloading(false);
                    return;
                }
            }

            const asset = await MediaLibrary.createAssetAsync(uri); // MediaLibrary.createAssetAsync(파일uri): 갤러리에 해당 파일을 저장하고, 이미지 애셋을 반환함.
            const album = MediaLibrary.createAlbumAsync('MyFirstAlbum', asset, true) // MediaLibrary.createAlbumAsync('앨범명', 이미지 애셋, 이미지 애셋 카피 여부): 해당 앨범에 이미지 애셋을 생성함. 
            } catch(ex) {

            }

        setDownloading(false);
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName={'arrow-back'} onPress={onPressBack} />
                    <Header.Title title='IMAGE DETAIL' />
                </Header.Group>

                <Header.Icon iconName={ isFavorite ? 'heart' : 'heart-outline' } onPress={onPressFavorite} />

            </Header>
            <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
                <RemoteImage  url={route.params.url}  width={width}  height={width * 1.2} />
            </View>

            <Button onPress={onPressDownload}>
                <View style={{paddingBottom: 24, backgroundColor: 'black'}}>
                    {donwloading ? (
                        <View style={{ height: 52, flexDirection: 'row', backgroundColor: 'black', justifyConent: 'center'}}>
                            <ActivityIndicator />
                        </View>
                    ): (
                        <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                            <Typography color={'white'}> 다운로드 </Typography>
                            <Icon iconName='download' iconSize={24} iconColor='white' />
                        </View>
                    )}
                </View>
            </Button>
        </View>
    )
}