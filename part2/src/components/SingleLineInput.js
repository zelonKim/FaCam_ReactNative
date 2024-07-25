import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

export const SingleLineInput = ({value, onChangeText, placeholder, onSubmitEditing, fontSize})=>{
    const [focused, setFocused] = useState(false);

    return (
        <View 
            style={{
                alignSelf:'stretch', 
                paddingHorizontal:12, 
                paddingVertical:8, 
                borderRadius:4, 
                borderWidth:1, 
                borderColor:focused ? 'black':'gray'
            }}>
            <TextInput 
                autoCorrect={false}
                autoCapitalize={false}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                onSubmitEditing={onSubmitEditing}
                style={{fontSize:fontSize ?? 20}}
                onFocus={()=> setFocused(true)} 
                onBlur={()=> setFocused(false)}
            />
        </View>
    )
}