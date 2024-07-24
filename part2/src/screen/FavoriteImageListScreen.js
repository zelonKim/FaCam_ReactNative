import React from "react"
import { FlatList, View } from "react-native"
import { Typography } from "../components/Typography"
import { useSelector } from "react-redux"
import { PhotoListItem } from "../components/PhotoListItem"
import { Header } from "../components/Header/Header"

export const FavoriteImageListScreen = (props) => {
    const imageList = useSelector((store) => store.favorite.favoriteList);

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title='FAVORITE'></Header.Title>
            </Header>
            <FlatList
                style={{ flex: 1 }}
                data={imageList}
                renderItem={({item}) => {
                    return(
                        <PhotoListItem url={item} />
                    )
                }}
            />
        </View>
    )
}