import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinkStackNavigation } from "./LinkStackNavigation";
import { AddLinkScreen } from "../screens/AddLinkScreen";
import { NewsTabNavigation } from "./NewsTabNavigation";
import { NewsDetailScreen } from '../screens/NewsDetailScreen'

/* 
const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
    return(
        <Stack.Navigator
            initialRouteName='LinkStack'
            screenOptions={{
                presentation: 'containedModal',
                headerShown: false,
            }}
        >
            <Stack.Screen name='LinkStack' component={LinkStackNavigation} />
            <Stack.Screen name='AddLink' component={AddLinkScreen} />
        </Stack.Navigator>
    )
} 
*/

////////////////////////////


const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='NewsTab' component={NewsTabNavigation}></Stack.Screen>
            <Stack.Screen name='NewsDetail' component={NewsDetailScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}