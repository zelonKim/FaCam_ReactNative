import React, { useCallback } from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import { Spacer } from "../components/Spacer";
import { useNavigation, useRoute } from "@react-navigation/native";
import WebView from 'react-native-webview';

export const LinkDetailScreen = () => {
    const navigation = useNavigation();

    const routes = useRoute();

    const onPressBack = useCallback(() => {
        navigation.goBack();
    }, [])

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='arrow-back' onPress={onPressBack} />
                    <Spacer space={12} horizontal />
                    <Header.Title title='LINK DETAIL' />
                </Header.Group>
            </Header>

            <WebView
                style={{flex:1}}
                source={{uri: routes.params.item.link}}
            />
        </View>
    )
}