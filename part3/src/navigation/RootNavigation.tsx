/* 
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MainScreen } from "../screens/MainScreen";
import { AddScreen } from "../screens/AddScreen";
import { DetailScreen } from "../screens/DetailScreen";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

type ScreenParams= {
    Main: undefined;
    Add: {latitude: number; longitude: number; address: string};
    Detail: {latitude:number; longitude: number; address: string; title: string};
}

const Stack = createNativeStackNavigator<ScreenParams>();

export const RootNavigation: React.FC = () => {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false,
                presentation: 'containedModal'
            }}
        >
            <Stack.Screen name='Main' component={MainScreen} />
            <Stack.Screen name='Add' component={AddScreen} />
            <Stack.Screen name='Detail' component={DetailScreen} />
        </Stack.Navigator>
    )
}

export const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
    useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
    useRoute<RouteProp<ScreenParams, RouteName>>();
 */




//////////////////////////////




import React from "react";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "../screens/MainScreen";
import { AddUpdateScreen } from "../screens/AddUpdateScreen";
import { MonthlyScreen } from "../screens/MonthlyScreen";
import { DetailScreen } from "../screens/DetailScreen";
import { AccountBookHistory } from "../data/AccountBookHistory";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { CalendarSelectScreen } from "../screens/CalendarSelectScreen";

type  ScreenParams = {
    Add: undefined
    Main: undefined
    Update: {item: AccountBookHistory}
    Detail: {item: AccountBookHistory}
    MonthlyAverage: undefined
    CalendarSelect: {onSelectDay: (date:number) => void}
}

const Stack = createNativeStackNavigator<ScreenParams>();

export const RootNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{ 
                headerShown:false, 
                presentation: 'containedModal'
            }}
        >
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Add" component={AddUpdateScreen} />
            <Stack.Screen name="Update" component={AddUpdateScreen} />
            <Stack.Screen name="MonthlyAverage" component={MonthlyScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="CalendarSelect" component={CalendarSelectScreen} />
        </Stack.Navigator>
    )
}

export const useRootNavigation = <RouteName extends keyof ScreenParams>() => 
    useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();


export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
    useRoute<RouteProp<ScreenParams, RouteName>>();
