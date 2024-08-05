import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

export const MainScreen: React.FC = () => {
    const [currentRegion, setCurrentRegion] = useState<{
        latitude: number,
        longitude: number
    }>({
    latitude: 37.3160401, 
    longitude: 126.8385268
    });

    const getMyLocation = useCallback(()=> {
        Geolocation.getCurrentPosition((position) => { //  Geolocation.getCurrentPosition(콜백함수): 사용자의 현재 위치에 대한 콜백함수를 정의함. / 매개변수에는 사용자의 위치정보가 담김.
            setCurrentRegion({
                latitude: position.coords.latitude, // 위치정보.coords.latitude: 위도값을 나타냄.
                longitude: position.coords.longitude // 위치정보.coords.longitude: 경도값을 나타냄.
            })
        });
    }, [])

    useEffect(()=>{
        getMyLocation()
    },[getMyLocation])

    
    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="MAIN" />
            </Header>

            <MapView  // <MapView region={{ latitude: 위도값, longitude: 경도값, latitudeDelta: 위도 축척, longitudeDelta: 경도 축척 }}>: 해당 위도 및 경도에 대한 맵뷰를 보여줌.
                style={{flex:1}} 
                region={{
                    latitude: currentRegion.latitude,  
                    longitude: currentRegion.longitude,
                    latitudeDelta: 0.0015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker // <Marker coordinate={{ latitude: 위도값, longitude: 경도값 }}>: 맵뷰에서 해당 위도 및 경도를 표시하는 마커를 보여줌.
                    coordinate={{
                        latitude: currentRegion.latitude,
                        longitude: currentRegion.longitude,
                }} 
                />
            </MapView>
        </View>
    )
}