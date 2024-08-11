/* import React, { useCallback, useEffect, useRef } from "react";
import { Header } from "../components/Header/Header";
import { Platform, Text, View } from "react-native";
import { useRootNavigation, useRootRoute } from "../navigation/RootNavigation";
import { Button } from "../components/Button";
import { Camera, CameraDevice, useCameraDevice } from "react-native-vision-camera";
import { CameraRoll } from "@react-native-camera-roll/camera-roll"


export const TakePhotoScreen: React.FC = () => {
    const navigation = useRootNavigation<'TakePhoto'>();
    const routes = useRootRoute<'TakePhoto'>();

    const cameraRef = useRef<Camera>(null); 

    const device = useCameraDevice('back') as CameraDevice 
    // useCameraDevice('back'): 후면 카메라 장치를 얻어옴. 
    // useCameraDevice('front'): 전면 카메라 장치를 얻어옴.

    useEffect(()=>{
        Camera.requestCameraPermission(); // 사용자에게 카메라 사용 권한을 요청함.
    },[])


    const onPressTakePhoto = useCallback(async() => {
        const result = await cameraRef.current?.takePhoto(); // 카메라 참조객체.current?.takePhoto(): 해당 카메라로 사진을 찍고, 사진 정보 객체를 반환함.
        console.log(result);

        if(result) {
            const path = `${Platform.OS === 'android' ? 'file://' : ''}${result.path}` // 사진 정보 객체.path: 사진 파일의 경로를 나타냄.
            
            const saveResult = await CameraRoll.save(path, {type:'photo', album:'AccountBook'}) // CameraRoll.save(사진 파일 경로, {type:'photo', album:'앨범명'}): 해당 사진 파일을 주어진 앨범명으로 갤러리에 저장하고, 사진URL을 반환함.

            routes.params.savePhotoUrl(saveResult);

            navigation.goBack();
        }
    },[routes.params, navigation])


    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="사진 찍기" />
                <Header.Icon name='close' onPress={navigation.goBack} />
            </Header>

            <View style={{flex:1}}>
                <View style={{flex:2}}>
                    {device !== null && (
                        <Camera ref={cameraRef} style={{flex:1}} device={device} isActive={true} photo={false} /> // <Camera  ref={카메라 참조객체} device={카메라 장치} isActive={카메라 작동 여부} photo={사진찍기 가능 여부}  />
                    )}
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Button onPress={onPressTakePhoto}>
                        <View style={{width: 120, height: 100, borderRadius: 50, backgroundColor:'black', alignItems:'center', justifyContent:'center'}}>
                            <View style={{width: 100, height:80, borderRadius: 40, backgroundColor: 'white'}} />
                        </View>
                    </Button>
                </View>
            </View>
        </View>
    )
} */


/////////////////////


import React, { useCallback, useEffect, useRef } from 'react';
import { useRootNavigation, useRootRoute } from '../navigation/RootStackNavigation';
import { Camera, useCameraDevice} from 'react-native-vision-camera';
import { Header } from '../components/Header/Header';
import { Platform, StyleSheet, View } from 'react-native';
import { Button } from '../components/Button';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

export const TakePhotoScreen:React.FC = () => {
    const routes = useRootRoute<'TakePhoto'>();
    const navigation = useRootNavigation<'TakePhoto'>();
    const device = useCameraDevice('back'); 
    const ref = useRef<Camera>(null);

    useEffect (()=> {
        Camera.requestCameraPermission();
    }, [])

    const onPressTakePhoto = useCallback(async()=>{
        const result = await ref.current?.takePhoto();
        if(result) {
            const path = `${Platform.OS === 'android' ? 'file://' :''}${result.path}`
            CameraRoll.save(path, {type:'photo', album:'LoveDog'});
            routes.params.onTakePhoto(path);
            navigation.goBack();
        }
        console.log(result);
    }, [navigation, routes.params])

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='사진 촬영' />
                <Header.Icon name='close' onPress={navigation.goBack} />
            </Header>
            <View style={{flex:1}}>
                <View style={{flex:2}}>
                    {device && (
                        <Camera
                            ref={ref}
                            style={{flex:1}}
                            device={device}
                            isActive={true}
                            photo={true}
                        />
                    )}
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Button onPress={onPressTakePhoto}>
                        <View style={{width:100, height:100, borderRadius:50, backgroundColor:'black', alignItems:'center', justifyContent:'center'}}>
                            <View style={{width:80, height:80, borderRadius:40, backgroundColor:'white'}}/>
                        </View>
                    </Button>
                </View>
            </View>
        </View>
    )
} 