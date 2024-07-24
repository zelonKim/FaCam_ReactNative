import React, { useCallback, useEffect, useState } from "react";
import { Typography } from "./Typography";
import { View, Animated } from "react-native";


export const LottoNumberView = (props) => {
    const [viewHeight, setViewHeight] = useState(0);
    const [animatedValue] = useState(new Animated.Value(1));

    const getNumberBackgroundColor = useCallback(()=> {
        const randomNumber = Math.floor((Math.random() * 10)) % 6
        switch(randomNumber) {
            case 1: return 'blue'
            case 2: return 'gray'
            case 3: return 'green'
            case 4: return 'purple'
            default: return 'black'
        }
    },[])

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-viewHeight * 0.6 , 0],
    })

    useEffect(() => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
            duration: 1000,
            toValue: 1,
        }).start();  
    }, [props.numbers])

    return (
        <View 
            style={{flex: 1, flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', overflow: 'hidden'}}
            onLayout={({nativeEvent}) => {
                // console.log(nativeEvent.layout)
                setViewHeight(nativeEvent.layout.height)
            } }
        >
            {props.numbers.map((item) => {
                return (
                    <Animated.View 
                        style={{
                            backgroundColor: getNumberBackgroundColor(), 
                            width: 40, 
                            height: 40, 
                            borderRadius: 20, 
                            alignItems:'center', 
                            justifyContent: 'center',
                            transform: [
                                {
                                    translateY: translateY,
                                }
                            ]
                        }}>
                        <Typography fontSize={20} color='white'>
                            {item}
                        </Typography>
                    </Animated.View>
                )
            })}
        </View>
    )
}