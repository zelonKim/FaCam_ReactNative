import { Image, Modal, Pressable, TouchableOpacity, View } from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons'

const ArrowButton = ({iconName, onPress, disabled }) => {
    return(
    <TouchableOpacity disabled={disabled} onPress={onPress} style={{ justifyContent:"center", paddingHorizontal: 20, height: "100%"}}>
        <SimpleLineIcons 
            name={iconName}
            size={20}
            color={disabled ? "transparent" : "black"}
        />
    </TouchableOpacity>
    )
}


export default ({modalVisible, onPressBackdrop, selectedImage, onPressLeftArrow, onPressRightArrow, showPreviousArrow, showNextArrow }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}>
                <Pressable 
                    onPress={onPressBackdrop}
                    style={{ flex: 1, justifyContent: "center", alignItems:"center", backgroundColor:`rgba(115, 115, 115, 0.5)`}}
                >
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                       
                    <ArrowButton 
                        iconName="arrow-left"
                        onPress={onPressLeftArrow}
                        disabled={!showPreviousArrow} 
                    />
            
                        <Pressable>
                            <Image 
                                source={{ uri: selectedImage?.uri }}
                                style={{ width: 380, height: 380, backgroundColor: "white"}}
                                resizeMode="contain" 
                            />
                        </Pressable>

                        <ArrowButton 
                        iconName="arrow-right"
                        onPress={onPressRightArrow}
                        disabled={!showNextArrow} 
                    />
                    </View>
                </Pressable>
        </Modal>
    )
}