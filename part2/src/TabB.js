import React from "react";
import { Text, View } from "react-native";


export class TabB extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text> 이것은 탭B 입니다.</Text>
            </View>
        )
    }
}