import React, { useCallback, useEffect } from "react"
import { FlatList, View } from "react-native"
import { Header } from "../components/Header/Header"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../components/Button"
import { Typography } from "../components/Typography"
import { clippedTabFocus } from "../actions/news"

export const FavoriteNewsListScreen = () => {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const data = useSelector((store) => store.news.favoriteNews);

    const onPressItem = useCallback((newsItem) => {
        navigation.navigate('NewsDetail', {newsItem})
    }, [])


    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) {
            dispatch(clippedTabFocus())
        }
    },[isFocused])


    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='FAVORITE_NEWS_LIST'></Header.Title>
            </Header>

            <FlatList
                    style={{flex:1}}
                    data={data}
                    renderItem={({item}) => {
                        return (
                            <Button onPress={() => onPressItem(item)}>
                                <View style={{flex:1, paddingHorizontal:20, paddingVertical:8}}>
                                    <Typography fontSize={24} numberOfLines={1}> {item.title} </Typography>
                                    <Typography fontSize={24} numberOfLines={2} color='gray'> {item.description} </Typography>
                                </View>
                            </Button>
                        )
                    }}
                />
        </View>
    )
}