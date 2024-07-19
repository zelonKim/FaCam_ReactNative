import { Text, View } from "react-native"
import BookmarkButton from "./BookmarkButton"
import {COLOR} from "./color"
import AlarmButton from "./AlarmButton"
import NextBusInfo from "./NextBusInfo"

export default ({
    NEWCOLOR,
    isBookmarked,
    onPressBookmark,
    num,
    directionDescription,
    numColor,
    processedNextBusInfos
}) => {
    return (
        <View style={{ flexDirection: "row", height: 75, backgroundColor: NEWCOLOR.WHITE_BLACK }}>
            <View style={{ flex: 0.85, flexDirection: "row", alignItems: "center" }}>
                <BookmarkButton  
                    NEWCOLOR={NEWCOLOR}
                    isBookmarked={isBookmarked}
                    onPress={onPressBookmark}
                    style={{ paddingHorizontal: 10 }}
                />
                <View >
                    <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
                    <Text style={{ fontSize: 13, color: COLOR.GRAY_3, marginRight: 5 }}>{directionDescription} 방향</Text>
                </View>
            </View>

            <View style={{ flex: 1, flexDireciton: "row", alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                    {processedNextBusInfos.map((info, index) => (
                    <NextBusInfo
                        NEWCOLOR={NEWCOLOR}
                        key={`next-bus-info${index}`}
                        hasInfo={info.hasInfo}
                        remainedTimeText={info.remainedTimeText}
                        numOfRemainedStops={info.numOfRemainedStops}
                        seatStatusText={info.seatStatusText}
                    />
                    ))}
                </View>
                    <AlarmButton NEWCOLOR={NEWCOLOR} onPress={() => {}} style={{ paddingHorizontal: 15  }} /> 
            </View>
        </View>
    )
}