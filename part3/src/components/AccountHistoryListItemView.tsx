import React from "react";
import { AccountBookHistory } from "../data/AccountBookHistory";
import { Button } from "./Button";
import { View } from "react-native";
import { Icon } from "./Icons";
import { Typography } from "./Typography";
import { Spacer } from "./Spacer";
import { RemoteImage } from "./RemoteImage";
import { convertToDateString } from "../utils/DateUtils";

export const AccountHistoryListItemView: React.FC<{
    item: AccountBookHistory,
    onPressItem: (item: AccountBookHistory) => void
}> = (props) => {

    return (
        <Button onPress={() => props.onPressItem(props.item)}>
            <View 
                style={{
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Icon 
                        name={props.item.type === '사용' ? 'remove-circle' : 'add-circle'}    
                        size={24}
                        color={props.item.type === '사용' ? 'red' : 'blue'}
                    />      
                    <View style={{flex:1, marginLeft:12}}>
                        <Typography fontSize={16}>
                            {props.item.comment} | {props.item.price.toString()}
                        </Typography>
                        <Spacer space={4} />

                        <Typography fontSize={12}>
                        {convertToDateString(props.item.createdAt)}
                        </Typography>
                    </View>

                    {props.item.photoUrl !== null && (
                        <>
                            <Spacer space={12} horizontal />
                            <RemoteImage 
                                url={props.item.photoUrl}
                                width={100}
                                height={100}
                                style={{borderRadius: 10}}
                            />
                        </>
                    )}
            </View>
        </Button>
    )
}