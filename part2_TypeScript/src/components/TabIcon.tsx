import { View } from "react-native";
import { Badge } from "./Badge";
import { Icon, IconName } from "./Icons";
import React from "react";



// export const TabIcon = (props) => {
//         if(props.visibleBadge) {
//             return (
//                 <View>
//                     <Badge fontSize={10}>
//                         <Icon 
//                             name={props.iconName} 
//                             size={20} 
//                             color={props.iconColor} />
//                     </Badge>
//                 </View>
//             )
//         }

//         return(
//             <View>
//                 <Icon 
//                     iconName={props.iconName} 
//                     iconSize={20} 
//                     iconColor={props.iconColor} />
//             </View>
//         )
// }




export const TabIcon:React.FC<{
    visibleBadge: boolean,
    iconName: IconName,
    iconColor: string;
}> = (props) => {
    if(props.visibleBadge) {
        return (
            <View>
                <Badge>
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
                name={props.iconName} 
                size={20} 
                color={props.iconColor} />
        </View>
    )
}