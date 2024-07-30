import React from 'react';
import { Ionicons } from '@expo/vector-icons';


// export const Icon = (props) => {
//         return (
//             <Ionicons 
//                 name={props.iconName} 
//                 size={props.iconSize} 
//                 color={props.iconColor} 
//             />
//         )
// }




export type IconName = keyof typeof Ionicons.glyphMap;

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