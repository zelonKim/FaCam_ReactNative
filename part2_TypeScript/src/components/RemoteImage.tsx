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
    url: string,
    width: number,
    height: number,
    style?: StyleProp<ImageProps>
}> = (props) => {
    return(
        <RNImage 
            source={{ uri: props.url }}
            style={[props.style, {
                width: props.width,
                height: props.height
            }]}
            />
    )
}