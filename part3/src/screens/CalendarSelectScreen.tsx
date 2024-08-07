import React from "react";
import { Header } from "../components/Header/Header";
import { View } from "react-native";
import { useRootNavigation, useRootRoute } from "../navigation/RootNavigation";
import { Calendar } from "react-native-calendars";
import { convertToDateString } from "../utils/DateUtils";

const today = new Date();
today.setHours(0);
today.setMinutes(0);


export const CalendarSelectScreen: React.FC = () => {
    const navigation = useRootNavigation<'CalendarSelect'>();
    const routes = useRootRoute<'CalendarSelect'>();
 
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='날짜 선택'/>
                <Header.Icon name='close' onPress={navigation.goBack} />
            </Header>

            <Calendar 
                // initialDate={convertToDateString(today.getDate())}
                onDayPress={day => {
                    console.log('선택된 날짜: ', day);
                    routes.params.onSelectDay(day.timestamp);
                    navigation.goBack();
                }}
                maxDate={convertToDateString(today.getTime())} 
            />
        </View>
    )
}