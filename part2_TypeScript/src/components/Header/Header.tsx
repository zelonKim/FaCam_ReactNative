import { Dimensions, View, useWindowDimensions } from "react-native";
import { SafeAreaInsetsContext, useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacer } from "../Spacer";
import { HeaderTitle } from "./HeaderTitle";
import { HeaderIcon } from "./HeaderIcon";
import React, { ReactElement } from "react";
import { HeaderGroup } from "./HeaderGroup";
import { IconName } from "../Icons";


type CompoundComposition = {
    Title?: React.FC<{title: string}>;
    Icon?: React.FC<{onPress: () => void, iconName: IconName}>
    Group?: React.FC<{children: ReactElement[]}>
}

export const Header: React.FC<{
    children: ReactElement[]
}> & CompoundComposition = (props) => {
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
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
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