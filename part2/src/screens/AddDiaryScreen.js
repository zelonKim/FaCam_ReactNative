import { View } from "react-native"
import { Header } from "../components/Header/Header"
import { useNavigation } from "@react-navigation/native"
import { useCallback } from "react";

export const AddDiaryScreen = () => {
    const navigation = useNavigation();
    
    const onPressBack = useCallback(()=>{
        navigation.goBack();
    }, [])

    return(
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Title title='ADD DIARY'></Header.Title>
                </Header.Group>
                <Header.Icon iconName='close' onPress={onPressBack}></Header.Icon>
            </Header>
        </View>
    )
}