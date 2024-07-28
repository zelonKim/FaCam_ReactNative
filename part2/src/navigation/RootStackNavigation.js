import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { DiaryStacknavigation } from "./DiaryStackNavigation";
import { AddDiaryScreen } from "../screens/AddDiaryScreen";

const Stack = createNativeStackNavigator();

export const RootStackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='DiaryStack'
            screenOptions={{
                presentation: 'containedModel',
                headerShown: false,
            }}
        >
            <Stack.Screen name='DiaryStack' component={DiaryStacknavigation}></Stack.Screen>
            <Stack.Screen name='AddDiary' component={AddDiaryScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}