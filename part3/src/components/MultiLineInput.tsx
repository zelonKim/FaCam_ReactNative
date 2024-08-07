import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

// export const MultiLineInput = (props)=>{
//     const [focused, setFocused] = useState(false);

//     return (
//         <View 
//             style={{
//                 alignSelf:'stretch', 
//                 paddingHorizontal:12, 
//                 paddingVertical:8, 
//                 borderRadius:4, 
//                 borderWidth:1, 
//                 borderColor:focused ? 'black':'gray'
//             }}>
//             <TextInput 
//                 autoCorrect={false}
//                 autoCapitalize='none'
//                 value={props.value}
//                 multiline
//                 onChangeText={props.onChangeText}
//                 placeholder={props.placeholder}
//                 onSubmitEditing={props.onSubmitEditing}
//                 style={{fontSize:props.fontSize ?? 20, height:props.height ?? 200 }}
//                 onFocus={()=> setFocused(true)} 
//                 onBlur={()=> setFocused(false)}
//             />
//         </View>
//     )
// }




export const MultiLineInput:React.FC<{
    value: string,
    onChangeText: (text:string) => void,
    placeholder: string,
    onSubmitEditing: () => void,
    fontSize?: number,
    height?: number
}> = (props)=>{
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
                autoCapitalize='none'
                value={props.value}
                multiline
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                onSubmitEditing={props.onSubmitEditing}
                style={{fontSize:props.fontSize ?? 20, height:props.height ?? 200 }}
                onFocus={()=> setFocused(true)} 
                onBlur={()=> setFocused(false)}
            />
        </View>
    )
}