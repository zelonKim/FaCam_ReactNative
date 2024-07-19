import { Text, View } from "react-native"
import {COLOR} from "./color"

export default ({
    hasInfo,
    remainedTimeText,
    numOfRemainedStops,
    seatStatusText,
    NEWCOLOR
}) => {
    if(!hasInfo) return <Text style={{ color: NEWCOLOR.GRAY_2_GRAY_3 }}> 도착 정보 없음 </Text>

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: NEWCOLOR.BLACK_WHITE, marginRight: 10 }}>{remainedTimeText}</Text>

            <View 
                style={{
                flexDirection: "row",
                alignItems: "center", 
                borderWidth: 0.5,
                borderColor: NEWCOLOR.GRAY_1_GRAY_4,
                borderRadius: 3,
                padding: 2,
            }}>
                <Text style={{ color: NEWCOLOR.GRAY_3_GRAY_2, marginRight: 3 }}>{numOfRemainedStops}번째 전</Text>
                <Text style={{ color: COLOR.CORAL }}>{seatStatusText}</Text>
            </View>
        </View>
    )
}