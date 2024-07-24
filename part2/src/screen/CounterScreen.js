import React, { useCallback, useContext, useState} from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import { Icon } from "../components/Icons";
import { Spacer } from "../components/Spacer";
import { Typography } from "../components/Typography";
import { Button } from "../components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { addCount, deleteCount } from "../actions/counter";
import { CounterContext } from "../../App";
import { useRecoilState, useRecoilValue } from "recoil";
import { counterState } from "../states/counter";
import { counterMultiplier } from "../selectors/counterMultiplier";

/* 
const CounterTitle = () => {
    const [count] = useContext(CounterContext); // useContext(컨텍스트): 상태값과 상태 업데이트 함수가 담긴 배열을 반환함.
    return (
        <Typography>
            {`${count} 개`}
         </Typography>
    )
}


export const CounterScreen = (props) => {
    const [count, setCount] = useContext(CounterContext);

    const onPressMinus = useCallback(()=>{
        setCount((count) => count - 1)
    }, [])

    const onPressPlus = useCallback(()=>{
        setCount((count) => count + 1)
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

                        <CounterTitle />

                    <Spacer horizontal space={20} />

                    <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressPlus}>
                        <Icon iconName='add' iconSize={20} iconColor='black'></Icon>
                    </Button>

                </View>
            </View>
        </View>
    )
}  
*/



/////////////////////////




const CounterTitle = () => {
    const count = useRecoilValue(counterState) // useRecoilValue(아톰): 아톰의 상태값을 반환함.
    return (
        <Typography>
            {`${count} 개`}
         </Typography>
    )
}


const CountMultiplier = () => {
    const result = useRecoilValue(counterMultiplier); // useRecoilValue(셀렉터): 아톰의 파생 데이터 연산 결과값을 반환함.
    return (
        <Typography>
            {`곱하기 5 = ${result} 개`}
         </Typography>
    )
}


export const CounterScreen = (props) => {

    const [count, setCount] = useRecoilState(counterState) // useRecoilState(아톰): 아톰의 상태값과 상태 업데이트 함수가 담긴 배열을 반환함.

    const onPressMinus = useCallback(()=>{
        setCount((count) => count - 1)
    }, [])

    const onPressPlus = useCallback(()=>{
        setCount((count) => count + 1)
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

                        <CounterTitle />

                    <Spacer horizontal space={20} />

                    <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressPlus}>
                        <Icon iconName='add' iconSize={20} iconColor='black'></Icon>
                    </Button>

                        <CountMultiplier />
                </View>
            </View>
        </View>
    )
} 
