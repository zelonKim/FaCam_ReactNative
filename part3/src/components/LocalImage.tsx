import React from 'react';
import {ImageProps, Image as RNImage, StyleProp} from 'react-native';

// export const LocalImage = (props) => {
//     return (
//         <RNImage 
//             source={props.localAsset} 
//             style={[props.style, {
//                 width: props.width,
//                 height: props.height
//             }]}
//         />
//     )
// }



export const LocalImage: React.FC<{
    localAsset: number,
    width: number,
    height: number,
    style?: StyleProp<ImageProps>
}> = (props) => {
    return (
        <RNImage 
            source={props.localAsset} 
            style={[props.style, {
                width: props.width,
                height: props.height
            }]}
        />
    )
}