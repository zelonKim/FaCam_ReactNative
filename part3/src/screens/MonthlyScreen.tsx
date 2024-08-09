import React, { useCallback, useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Header } from '../components/Header/Header';
import { useAccountBookHistoryItem } from '../hooks/useAccountBookHistoryItem';
import { StackedBarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

export const MonthlyScreen: React.FC = () => {
    const {getMonthlyAverage} = useAccountBookHistoryItem();
    const [average, setAverage] = useState<{month:number, data:number[]}[]>([]);
    const {width} = useWindowDimensions();

    const navigation = useNavigation();

    const getAverage = useCallback(async() => {
        const result = await getMonthlyAverage();
        setAverage(result);
    }, [getMonthlyAverage])

    useEffect(() => {
        getAverage();
    }, [getAverage])

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='Monthly SCREEN' />
                <Header.Icon name="close" onPress={navigation.goBack} />
            </Header>
                <StackedBarChart
                    data={{
                        labels: average.map(item => `${item.month}월`),
                        legend: ['사용','수입'],
                        data: average.map(item => item.data),
                        barColors:['#dfe4ea', '#a4b0be']
                    }}
                    hideLegend={false}
                    width={width}
                    height={220}
                    chartConfig={{
                        backgroundColor: 'black',
                        backgroundGradientFrom: 'red',
                        backgroundGradientTo: 'green',
                        color: (opacity=1) => `rgba(0, 0, 0, ${opacity})`
                    }}
                /> 
        </View>
    )
}