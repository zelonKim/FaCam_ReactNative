import { View } from "react-native";
import { Badge } from "./Badge";
import { Icon } from "./Icons";
import React from "react";

// export class TabIcon extends React.Component {
//     render() {
//         if(this.props.visibleBadge) {
//             return (
//                 <View>
//                     <Badge fontSize={10}>
//                         <Icon 
//                             name={this.props.iconName} 
//                             size={20} 
//                             color={'black'} />
//                     </Badge>
//                 </View>
//             )
//         }

//         return(
//             <View>
//                 <Icon 
//                     name={this.props.iconName} 
//                     size={20} 
//                     color={'black'} />
//             </View>
//         )
//     }
// }


/////////////////////////////////



export const TabIcon = (props) => {
        if(props.visibleBadge) {
            return (
                <View>
                    <Badge fontSize={10}>
                        <Icon 
                            name={props.iconName} 
                            size={20} 
                            color={props.iconColor} />
                    </Badge>
                </View>
            )
        }

        return(
            <View>
                <Icon 
                    iconName={props.iconName} 
                    iconSize={20} 
                    iconColor={props.iconColor} />
            </View>
        )
}