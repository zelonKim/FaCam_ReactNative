import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const IconButton = ({ name, bgColor }) => {
    return (
        <TouchableOpacity hitSlop={{top:15, bottom: 15}} style={{ paddingHorizontal: 6, backgroundColor: bgColor }}>
            <Ionicons name={name} size={24} color="black" />
        </TouchableOpacity>
    )
}

export default () => {
    return (
        <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 10}}>
            <Text style={{fontSize: 22, fontWeight: "bold"}}>친구</Text>
            <View style={{ flexDirection: "row" }}>
                <IconButton name="search-outline" />
                <IconButton name="person-add-outline" />
                <IconButton name="musical-notes-outline" />
                <IconButton name="settings-outline" />
            </View>
        </View>
    )
}


