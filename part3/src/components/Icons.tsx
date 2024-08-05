import React from 'react';
import Ionicons  from 'react-native-vector-icons/Ionicons';


// export const Icon = (props) => {
//         return (
//             <Ionicons 
//                 name={props.iconName} 
//                 size={props.iconSize} 
//                 color={props.iconColor} 
//             />
//         )
// }




export type IconName = string;

export const Icon: React.FC<{
    name: IconName
    size: number,
    color: string
}> = (props) => {
    return (
        <Ionicons 
            name={props.name} 
            size={props.size} 
            color={props.color} 
        />
    )
}