import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { RemoteImage } from "../../../src/components/RemoteImage";
import { Image, ImageStyle } from "react-native";

export const GesturePhotoView:React.FC<{
    url: string, 
    photoWidth: number,
    photoHeight: number,
    imageStyle?: ImageStyle,
    onGesture: (direction: 'left'|'right') => void,
}> = (props) => {

    const start = useSharedValue({x:0, y:0}); 
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
                                runOnJS(props.onGesture)('left');
                            }
                            if(offset.value.x > 150) {
                                runOnJS(props.onGesture)('right');
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
        <GestureDetector gesture={gesture}>
            <Animated.View style={{alignItems:'center', justifyContent:'center'}}>
                <Animated.View style={animatedStyle}>
                    <Image
                        source={{ uri: props.url }}
                        style={[props.imageStyle, { width: props.photoWidth, height: props.photoHeight }]}
                    />
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    )
}