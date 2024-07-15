import React from "react";
import {View, Text, Button} from "react-native";


class Component extends React.Component {
    constructor(props) {
        console.log("컨스트럭터")
        super(props);

        this.state = {
            count: 0,
            what: 0,
        }
    }

    // 컴포넌트 생성 시 호출됨.
    componentDidMount() {
        console.log("디드마운트")
    }

    // 컴포넌트 업데이트 시 호출됨.
    componentDidUpdate(prevProps, prevState) {
        console.log("디드업데이트")
        console.log(prevProps);
        console.log(prevState);
    }

    // 컴포넌트 제거 시 호출됨.
    componentWillUnmount() {
        console.log("윌언마운트")
    }

    render() {
        console.log("렌더")
        return (
            <View>
                <Text> You clicked {this.state.count} times </Text>  
                <Button  
                    title="Click here" 
                    onPress={() => this.setState({ count: this.state.count + 1 })} /> 
            </View>
        )
    }
}

export default Component;



