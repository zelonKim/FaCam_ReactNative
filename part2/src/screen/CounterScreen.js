import React, { useCallback, useState} from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import { Icon } from "../components/Icons";
import { Spacer } from "../components/Spacer";
import { Typography } from "../components/Typography";
import { Button } from "../components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { addCount, deleteCount } from "../actions/counter";

export const CounterScreen = (props) => {

    const value = useSelector((store) => store.cr.count)

    const dispatch = useDispatch();

    const onPressMinus = useCallback(()=>{
        dispatch(deleteCount())
    }, [])

    const onPressPlus = useCallback(()=>{
        dispatch(addCount())
    }, [])

    return(
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title='COUNTER'></Header.Title>
            </Header>

            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressMinus}>
                        <Icon iconName='remove' iconSize={20} iconColor='black'></Icon>
                    </Button>
                    <Spacer horizontal space={20} />
                    <Typography>
                        {`${value} 개`}
                    </Typography>

                    <Spacer horizontal space={20} />

                    <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressPlus}>
                        <Icon iconName='add' iconSize={20} iconColor='black'></Icon>
                    </Button>

                </View>
            </View>
        </View>
    )
}