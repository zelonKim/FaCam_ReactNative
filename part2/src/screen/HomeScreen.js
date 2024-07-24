import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import { Typography } from "../components/Typography";
import { Spacer } from "../components/Spacer";
import { Button } from "../components/Button";
import { LottoNumberView } from "../components/LottoNumberView";
import { getRandomSixNumber } from "../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { createNewNumbers } from "../actions/lottoNumbers";

export const HomeScreen = (props) => {
    const numbers = useSelector((store) => store.numbers.currentNumber)

    const dispatch = useDispatch();

    const onPressGetNumber = useCallback(() => {
        dispatch(createNewNumbers())
    },[])


    return (
        <View style={{flex: 1}}>
            <Header>
                <Header.Title title='HOME'></Header.Title>
            </Header>

            <View style={{flex: 1, flexDirection:'column', alignItmes: 'center', justifyContent: 'center', paddingHorizontal: 12}}>
                <View style={{
                    height: 250, 
                    flexDireciton: 'column', 
                    paddingHorizontal: 24, 
                    backgroundColor: 'white', 
                    borderColor:'gray'
                }}>

                    <LottoNumberView numbers={numbers} />
                    
                    <Spacer space={20} />

                    <Button onPress={onPressGetNumber}>
                        <View style={{backgroundColor: 'black', paddingVertical: 24, alignItems: 'center'}}>
                            <Typography color='white' fontSize={18}> 로또 번호 추출하기 </Typography>
                        </View>
                    </Button>
                </View>
            </View>
        </View>
    )
}