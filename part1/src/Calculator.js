import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import styled from 'styled-components/native';
import { useCalculator } from './use-calculator';

const COLOR = {
    RESULT: '#4e4c51',
    RESET: '#5f5e62',
    OPERATOR: '#f39c29',
    NUM: '#5c5674',
}

const Button = ({text, onPress, flex, type, isSelected }) => {
    const backgroundColor = 
        type === 'reset' ? COLOR.RESET : 
        type ==='operator' ? COLOR.OPERATOR :
        type === 'num' ? COLOR.NUM : 'transparent';

    return(
        <TouchableOpacity onPress={onPress} style={{ flex, backgroundColor, justifyContent: "center", alignItems: "center", height: 50, borderWidth: isSelected ? 1.5 : 0.3, borderColor: "black"}}>
            <Text style={{ color: "white", fontSize: 25 }}> {text} </Text>
        </TouchableOpacity>
    )
}


const ButtonContainer = styled.View`
    flex-direction: row;
    width: 100%;
`;

const InputContainer = styled.View`
    background-color: ${COLOR.RESULT};
    min-height: 50px;
    justify-content: center;
    align-items: flex-end;
    padding: 10px 5px;
`



export default () => {
    const {
        input,
        currentOperator,
        result,
        tempInput,
        tempOperator,
        hasInput,
        onPressReset,
        onPressOperator,
        onPressNum
    } = useCalculator();

    return(
    <View style={{ flex: 1, width: 250, justifyContent: "center" }}>
        {__DEV__ && (
            <>
            <Text>input: {input}</Text>
            <Text>currentOperator: {currentOperator}</Text>
            <Text>result: {result}</Text>
            <Text>tempInput: {tempInput}</Text>
            <Text>tempOperaotr: {tempOperator}</Text>
            </>
        )}
        
        <InputContainer>
            <Text style={{ color: "white", fontSize: 35, textAlign: "right" }}>{input}</Text>
        </InputContainer>

        <ButtonContainer>
            <Button 
                type="reset"
                text={hasInput ? "C" : "AC"}
                onPress={onPressReset}
                flex={3}
            />
            <Button
                type="operator"
                text="/"
                onPress={()=> onPressOperator("/")}
                flex={1}
                isSelected={currentOperator === "/"}
            />
        </ButtonContainer>

        <ButtonContainer>
            {[7,8,9].map((num) => (
            <Button
                key={`num-${num}`}
                type="num"
                text={`${num}`}
                onPress={()=>onPressNum(num)}
                flex={1}
            />
            ))}
            <Button
                type="operator"
                text="X"
                onPress={()=> onPressOperator("*")}
                flex={1}
                isSelected={currentOperator === "*"}
            />
        </ButtonContainer>

        <ButtonContainer>
        {[4,5,6].map((num) => (
                <Button
                    key={`num-${num}`}
                    type="num"
                    text={`${num}`}
                    onPress={()=>onPressNum(num)}
                    flex={1}
                />
            ))}
            <Button
                type="operator"
                text="-"
                onPress={()=> onPressOperator("-")}
                flex={1}
                isSelected={currentOperator === "-"}
            />
        </ButtonContainer>

        <ButtonContainer>
            {[1,2,3].map((num) => (
                <Button
                    key={`num-${num}`}
                    type="num"
                    text={`${num}`}
                    onPress={()=>onPressNum(num)}
                    flex={1}
                />
            ))}
            <Button
                type="operator"
                text="+"
                onPress={()=> onPressOperator("+")}
                flex={1}
                isSelected={currentOperator === "+"}
            />
        </ButtonContainer>

        <ButtonContainer>
            <Button 
                type="num"
                text="0"
                onPress={()=>null}
                flex={3}
            />
            <Button
                type="operator"
                text="="
                onPress={()=> onPressOperator("=")}
                flex={1}
            />
        </ButtonContainer>
    </View>
    )
}