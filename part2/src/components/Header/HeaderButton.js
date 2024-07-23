import React from "react";
import { Button } from '../Button'
import { Icon } from '../Icons'

export class HeaderIcon extends React.Component {
    render() {
        return (
            <Button onPress={this.props.onPress}>
                <Icon iconName={this.props.iconName} iconSize={28} iconColor='black' />
            </Button>
        )
    }
}