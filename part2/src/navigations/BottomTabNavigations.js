import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import { ImageListScreen } from "../screen/ImageListScreen";
import { FavoriteImageListScreen } from "../screen/FavoriteImageListScreen";
import { TabIcon } from "../components/TabIcon";
import { HomeScreen } from "../screen/HomeScreen";
import { HistoryListScreen } from "../screen/HistoryListScreen";

/* 
const Tabs = createBottomTabNavigator();

export const BottomTabNavigations = () => {
    return (
        <Tabs.Navigator 
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon:({focused, color, size}) => {

                    const getIconName = () => {
                        if(route.name == 'ImageList') {
                            return 'home'
                        }
                        if(route.name == 'FavoriteImageList') {
                            return 'star'
                        }
                    }

                    const iconName = getIconName();

                    return (
                        <TabIcon iconName={iconName} iconColor={focused ? 'tomato' : 'gray'} />
                    )
                }
            })}>
            <Tabs.Screen name="ImageList" component={ImageListScreen}></Tabs.Screen>
            <Tabs.Screen name="FavoriteImageList" component={FavoriteImageListScreen}></Tabs.Screen>
        </Tabs.Navigator>
    )
} 
*/

////////////////////


const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
    return(
        <Tab.Navigator 
            screenOptions={({route}) => {
                return {
                    headerShown: false,
                    tabBarIcon: ({focused, color}) => {

                        const getIconName = () => {
                            if(route.name === 'History') {
                                return 'time'
                            }
                            return 'home';
                        }

                        const iconName = getIconName();

                        return (
                            <TabIcon iconName={iconName} iconColor={color} />
                        )
                    }
                }
        }}>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='History' component={HistoryListScreen} />
        </Tab.Navigator>
    )
}