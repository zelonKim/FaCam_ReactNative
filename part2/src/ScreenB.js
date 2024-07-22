import React from 'react';
import { Button, Text, View } from 'react-native'

export class ScreenB extends React.Component {
    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> 이것은 스크린B 입니다. / 전달된 값: {this.props.route.params.giveWhat} </Text>

                <Button
                    title="스크린A로 이동"
                    onPress={() => {
                        this.props.navigation.navigate('ScreenA')
                    }} />
            </View>
        )
    }
}