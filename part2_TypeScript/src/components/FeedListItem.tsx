import React, { useCallback, useRef } from "react"
import { Animated, View, useWindowDimensions } from "react-native"
import { Button } from "./Button"
import { RemoteImage } from "./RemoteImage"
import { Icon } from "./Icons"
import { Typography } from "./Typography"
import { Spacer } from "./Spacer"
import { DoubleTapButton } from "./DoubleTapButton"


export const FeedListItem: React.FC<{
    image: string,
    isLiked: boolean,
    likeCount: number,
    writer: string,
    comment: string,
    onPressFeed: () => void,
    onPressFavorite: () => void,
}> = (props) => {

    const {width} = useWindowDimensions();

    const scaleValue = useRef(new Animated.Value(0)).current;
    const alphaValue = useRef(new Animated.Value(0)).current;


    const onPressDoubleTap = useCallback(() => {
        props.onPressFavorite();
        if(props.isLiked) { 
            return;
        }
        scaleValue.setValue(0)
        scaleValue.setValue(1)

        Animated.timing(scaleValue, {
            toValue: 2,
            duration: 500,
            useNativeDriver: false
        }).start(()=>{
            setTimeout(() => {
                alphaValue.setValue(0)
            }, 1000);
        })

    }, [scaleValue, alphaValue, props.isLiked])

    return(
      <View>
        <View>
            <DoubleTapButton onPressDoubleTap={onPressDoubleTap}>
                <View style={{width: width, height: width}}>
                    <RemoteImage url={props.image} width={width} height={width} />
                    <View style={{
                        position: 'absolute', 
                        left: 0, 
                        right: 0, 
                        top: 0, 
                        bottom: 0, 
                        alignItems: 'center', 
                        justifyContent:'center'
                    }}>
                        <Animated.View style={{transform:[{scale: scaleValue}], opacity: alphaValue }}>
                            <Icon name='heart' size={64} color='red' />
                        </Animated.View>
                    </View>
                </View>
            </DoubleTapButton>

            <Button onPress={props.onPressFavorite}>
                <View style={{paddingHorizontal: 12, paddingVertical: 6}}>
                    <Icon 
                        name={props.isLiked ? 'heart' : 'heart-outline'}
                        size={20} 
                        color={props.isLiked ? 'red' : 'black'} />
                </View>
            </Button>

                <View style={{paddingHorizontal: 12}}>
                    <Typography fontSize={16}> {`좋아요 ${props.likeCount}`} </Typography>
                    <Spacer space={4} />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}> 
                        <Typography fontSize={16}>{props.writer}</Typography>
                        <Spacer space={8} horizontal />
                        <Typography fontSize={16}>{props.comment}</Typography>
                    </View>
                </View>
        </View>
      </View>
    )
}