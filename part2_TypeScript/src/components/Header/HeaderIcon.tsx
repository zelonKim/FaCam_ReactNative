import React from "react";
import { Button } from '../Button'
import { Icon, IconName } from '../Icons'

export const HeaderIcon: React.FC<{
    onPress: () => void,
    iconName: IconName    
}> = (props) => {
    return (
        <Button onPress={props.onPress}>
            <Icon iconName={props.iconName} iconSize={28} iconColor='black' />
        </Button>
    )
}