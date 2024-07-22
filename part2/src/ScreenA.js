import React from 'react';
import { Button, Text, View } from 'react-native'

export class ScreenA extends React.Component {
    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> 이것은 스크린A 입니다.</Text>

                <Button
                    title="스크린B로 이동"
                    onPress={() => {
                        this.props.navigation.navigate('ScreenB', {giveWhat: 'A가 보냄.'})
                    }} />

                <Button
                    title="스크린C로 이동"
                    onPress={() => {
                        this.props.navigation.navigate('NestedStack', {screen: 'ScreenC'})
                    }} />
            </View>
        )
    }
}