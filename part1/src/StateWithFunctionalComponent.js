import React, { useState } from "react";
import {View, Text, Button, Switch, TextInput} from "react-native";

/* const Component = () => {
    const [count, setCount] = useState(0);
 
    return (
        <View>
            <Text> You clicked {count} times </Text>  
            <Button  
                title="Click here" 
                onPress={() => setCount(count + 1 )} /> 
        </View>
    )
} 
export default Component; 
*/


/////////////////////////////




const Component = () => {
    const [isOn, setIsOn] = useState(false);
    const [name, setName] = useState("");

    return(
        <View>
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

        </View>
        )
    }

export default Component; 