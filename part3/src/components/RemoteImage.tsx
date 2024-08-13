import React from 'react';
import { ImageProps, Image as RNImage, StyleProp } from 'react-native'

// export const RemoteImage = (props) => {
//     return(
//         <RNImage 
//             source={{ uri: props.url }}
//             style={[props.style, {
//                 width: props.width,
//                 height: props.height
//             }]}
//             />
//     )
// }


export const RemoteImage: React.FC<{
    testID?: string,
    url: string,
    width: number,
    height: number,
    style?: StyleProp<ImageProps>
}> = (props) => {
    return(
        <RNImage 
            testID={props.testID}
            source={{ uri: props.url }}
            style={[props.style, {
                width: props.width,
                height: props.height
            }]}
        />
    )
}