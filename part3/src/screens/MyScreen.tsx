import React from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import { useRootNavigation } from "../navigation/RootStackNavigation";
import { Button } from "../components/Button";
import { Typography } from "../components/Typography";
import { Icon } from "../components/Icons";
import { useSelector } from "react-redux";
import { TypeRootReducer } from "../store";
import { TypeUser } from "../data/TypeUser";
import { RemoteImage } from "../components/RemoteImage";
import { Spacer } from "../components/Spacer";

export const MyScreen:React.FC = () => {
    const rootNavigation = useRootNavigation<'Main'>();
    const userInfo = useSelector<TypeRootReducer, TypeUser | null>(store => store.user?.user)

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="MyScreen" />
            </Header>

            <View style={{flex:1}}>
                { userInfo !== null && ( 
                    <View style={{paddingVertical:24, alignItems:'center', justifyContent:'center'}}>
                        <RemoteImage url={userInfo?.profileImage} width={100} height={100} style={{borderRadius:50}} />
                        <Spacer space={20} />
                        <Typography fontSize={24}>{userInfo?.userName}</Typography>
                    </View>
                )}
                <Button
                    onPress={() => {
                        rootNavigation.push('HistoryList');
                    }}>
                    <View 
                        style={{
                            backgroundColor:'white', 
                            paddingVertical:12, 
                            paddingHorizontal:8, 
                            flexDirection:'row', 
                            justifyContent:'space-between', 
                            alignItems:'center'
                    }}>
                        <Typography fontSize={16}>히스토리 화면으로 이동</Typography>
                        <Icon name="chevron-forward" size={16} color="gray" />
                    </View>
                </Button>
            </View>
        </View>
    )
}