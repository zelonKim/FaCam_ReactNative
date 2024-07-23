import React from 'react';
import { Ionicons } from '@expo/vector-icons';


// export class Icon extends React.Component {
//     render() {
//         return (
//             <Ionicons 
//                 name={this.props.name} 
//                 size={this.props.size} 
//                 color={this.props.color} 
//             />
//         )
//     }
// }


export const Icon = (props) => {
        return (
            <Ionicons 
                name={props.iconName} 
                size={props.iconSize} 
                color={props.iconColor} 
            />
        )
}