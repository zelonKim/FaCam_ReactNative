import React, { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import { Button } from "../components/Button";
import { Typography } from "../components/Typography";
import { useSignupNavigation, useSignupRoute } from "../navigation/SignupNavigation";
import { Spacer } from "../components/Spacer";
import { SingleLineInput } from "../components/SingleLineInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmailValidator from 'email-validator';


export const InputEmailScreen:React.FC = () => {
    const navigation = useSignupNavigation<'InputEmail'>();
    
    const routes = useSignupRoute<'InputEmail'>();

    const safeArea = useSafeAreaInsets(); 

    const [inputEmail, setInputEmail] = useState<string>(routes.params.preInput.email)


    const isValid = useMemo(() => {
        if(inputEmail.length === 0) { 
            return false;
        }
        return EmailValidator.validate(inputEmail);
    }, [inputEmail])


    const onPressSubmit = useCallback(() => {
      if(!isValid) {
        return;
      }
      navigation.push('InputName', {
        preInput: routes.params.preInput,
        uid: routes.params.uid,
        inputEmail: inputEmail,
      })
    }, [inputEmail, 
        isValid, 
        navigation, 
        routes.params.preInput, 
        routes.params.uid])


    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Icon name="arrow-back" onPress={navigation.goBack} />
                    <Header.Title title="InputEmailScreen" />
                </Header.Group>
            </Header>

            <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingHorizontal: 24}}>
                <SingleLineInput 
                    value={inputEmail} 
                    onChangeText={setInputEmail}
                    placeholder="이메일을 입력해 주세요"
                    onSubmitEditing={onPressSubmit}
                    keyboardType="email-address"
                />
            </View>

            <Button onPress={onPressSubmit}>
                <View style={{backgroundColor: isValid ? 'black' : 'lightgray'}}>
                    <Spacer space={16} />
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <Typography fontSize={20} color='white'>
                            다음
                        </Typography>
                    </View>
                    <Spacer space={safeArea.bottom + 12} />
                </View>
            </Button>
        </View>
    )
}