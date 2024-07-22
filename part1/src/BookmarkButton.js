import { TouchableOpacity } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {COLOR} from "./color"
import { useState } from "react";

const useBookmark = (initialIsBookmarked) => {
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
    const toggleIsBookmarked = () => setIsBookmarked(!isBookmarked); 
    return {
        isBookmarked,
        toggleIsBookmarked,
      }
}


export default ({
    isBookmarked: isBookmarkedProp,
    onPress,
    style,
    size,
    NEWCOLOR
}) => {
    const { isBookmarked, toggleIsBookmarked } = useBookmark(isBookmarkedProp);
    return (
        
        <TouchableOpacity style={style} onPress={() => {
            toggleIsBookmarked();
            onPress();
          }}>
            <Ionicons 
                name="star"
                size={24} 
                color={isBookmarked ? COLOR.YELLOW : NEWCOLOR.GRAY_1_GRAY_4} 
            />
        </TouchableOpacity>
    )
}