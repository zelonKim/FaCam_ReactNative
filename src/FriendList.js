import { ScrollView, View } from "react-native"
import Profile from "./Profile"
import { getBottomSpace } from "react-native-iphone-x-helper"
import Margin from "./Margin";

const bottomSpace = getBottomSpace();

export default (props) => {
    return props.isOpened ? (
        <ScrollView showVerticalScrollIndicator={false}>
            {props.data.map((item, index) => (
                <View key={index}>
                    <Profile
                        name={item.name}
                        introduction={item.introduction}
                        uri={item.uri}
                    />
                    <Margin height={13} />
                </View>
            ))}
        </ScrollView>
    ): null
}