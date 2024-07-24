import React, { useCallback, useState } from "react";
import { Animated, useWindowDimensions } from "react-native";
import {Button} from './Button'
import { RemoteImage } from "./RemoteImage";
import { useNavigation } from "@react-navigation/native";

export const PhotoListItem = (props) => {
    const {width} = useWindowDimensions();
    const navigation = useNavigation();
    const [animValue] = useState(new Animated.Value(0)); // new Animated.Value(입력값)

    const onPressItem = useCallback(() => {
         navigation.navigate('ImageDetail', {url: props.url})
    }, [])


    const onPressIn = useCallback(() => {
        console.log('온 프레스 인')
        Animated.timing(animValue, {  // Animated.timing(애니메이션 밸류, { duration: 소요 시간, toValue: 변화 값 }).start()
            duration: 200,
            toValue: 1,
        }).start();
    }, [])

    const onPressOut = useCallback(() => {
        console.log('온 프레스 아웃')
        Animated.timing(animValue, {
            duration: 200,
            toValue: 0,
        }).start();
    }, [])

    const scale = animValue.interpolate({ // 애니메이션 밸류.interpolate({ inputRange: [입력값1, 입력값2], outputRange: [출력값1, 출력값2] })
        inputRange: [0, 1],
        outputRange: [1.0, 0.8]
    })

    return (
        <Button 
            onPress={onPressItem} 
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            paddingHorizontal={20} 
            paddingVertical={10}
        >
            <Animated.View style={{transform:[{ scale: scale}]}}> 
                <RemoteImage  
                    url={props.url}
                    width={width - 40}
                    height={width * 1.2} 
                />
            </Animated.View>
        </Button>
    )
}