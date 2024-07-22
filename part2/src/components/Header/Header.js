import { Dimensions, View, useWindowDimensions } from "react-native";
import { SafeAreaInsetsContext, useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacer } from "../Spacer";
import { HeaderTitle } from "./HeaderTitle";
import { HeaderIcon } from "./HeaderButton";
import React from "react";
import { HeaderGroup } from "./HeaderGroup";


// const {width} = Dimensions.get('window');
// 
// export class Header extends React.Component {
//     render() {
//         return (
//             <SafeAreaInsetsContext.Consumer>
//                 {insets => (
//                     <View style={{ paddingTop: insets.top }}>
//                         <View style={{
//                             width: width,
//                             flexDirection: 'row', 
//                             height: 56, 
//                             borderBottomColor: 'gray', 
//                             borderBottomWidth: 1, 
//                             alignItems: 'center' 
//                         }}>
//                             <Spacer horizontal={true} space={12} />
//                                 <View style={{flex: 1, flexDirection: 'row', justifycontent: 'space-between'}}>
//                                     {this.props.children}
//                                 </View>
//                             <Spacer horizontal={true} space={12} />
//                         </View>
//                     </View>
//                 )}
//             </SafeAreaInsetsContext.Consumer>
//         )
//     }
// }

// Header.Title = HeaderTitle;
// Header.Icon = HeaderIcon;
// Header.Group = HeaderGroup;




export const Header = (props) => {
    const insets = useSafeAreaInsets();
    const {width} = useWindowDimensions();

    return(
        <View style={{paddingTop:insets.top}}>
             <View style={{
                    width: width,
                    flexDirection: 'row', 
                    height: 56, 
                    borderBottomColor: 'gray', 
                    borderBottomWidth: 1, 
                    alignItems: 'center' 
            }}>
                <Spacer horizontal={true} space={12} />
                    <View style={{flex: 1, flexDirection: 'row', justifycontent: 'space-between'}}>
                        {props.children}
                    </View>
                <Spacer horizontal={true} space={12} />
            </View>
        </View>
    )
}



Header.Title = HeaderTitle;
Header.Icon = HeaderIcon;
Header.Group = HeaderGroup;