import { useSelector } from "react-redux";
import { RootReducer } from "../store";
import { FeedInfo } from "../@types/FeedInfo";
import { UserInfo } from "../@types/UserInfo";


export const useMyInfo = () => useSelector<RootReducer, UserInfo | null>((state) => {
    return state.userInfo.userInfo
})

export const useMyFeedList = () => useSelector<RootReducer, FeedInfo[]>((state) => {
    return state.userInfo.myFeedList
})