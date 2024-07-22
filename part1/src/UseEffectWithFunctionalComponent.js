import React, { useEffect, useState } from "react";
import {View, Text, Button, Switch, TextInput, ActivityIndicator} from "react-native";


const Component = () => {
    const [count, setCount] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const [name, setName] = useState("");
    const [isRefresh, setIsRefresh] = useState(false)

    // 컴포넌트 생성 시 호출됨.
    useEffect(() => {
        console.log('디드마운트')
    }, []) 

    // 컴포넌트 업데이트 시 호출됨.
    useEffect(() => {
        console.log('디드업데이트')
    }, [count, isOn])  // useEffect(함수, 의존성배열): 의존성 배열의 값이 변경될때마다 해당 함수를 호출함.


    useEffect(() => {
        if(isRefresh) {
            setTimeout(() => {
                setIsRefresh(false);
            }, 3000)
        }
    }, [isRefresh])


    return(
        <View>
            <Text> You clicked {count} times </Text>  
            <Button  
                title="Click here" 
                onPress={() => setCount(count + 1 )} /> 

            <Switch 
                value={isOn}
                onValueChange={bool => {
                    setIsOn(bool);
                }}
            />

            <TextInput
                value={name}
                onChangeText={str => {
                    setName(str);
                }}
            />

            <Button title="새로고침"  onPress={() => setIsRefresh(true)} />
            {isRefresh && <ActivityIndicator />}            
        </View>
        )
    }

export default Component;