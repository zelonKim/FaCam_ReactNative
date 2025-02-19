import { MaterialIcons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"

export default (props) => {
    return(
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "grey" }}> 친구 {props.friendProfileLen} </Text>
            <TouchableOpacity onPress={props.onPressArrow}>
                <MaterialIcons name={props.isOpened ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="lightgrey" />
            </TouchableOpacity>
        </View>
    )
}