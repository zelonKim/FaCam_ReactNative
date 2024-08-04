import React from "react";
import { FlatList, View } from "react-native";
import { Header } from "../components/Header/Header";
import { Spacer } from "../components/Spacer";
import { FeedListItem } from "../components/FeedListItem";
import { useRootNavigation, useRootRoute } from "../navigations/RootStackNavigation";
import { TypeFeedListDispatch, favoriteFeed } from "../actions/feed";
import { useDispatch } from "react-redux";

export const FeedListScreen: React.FC = () => {
    const route = useRootRoute<'FeedList'>();

    const navigation = useRootNavigation<'FeedList'>();

    const dispatch = useDispatch<TypeFeedListDispatch>();

    return (
        <View style={{flex: 1}}>
            <Header>
                <Header.Title title='FEED LIST' />
                <Header.Icon 
                    name='close' 
                    onPress={() => {navigation.goBack()}} />
            </Header>

            <FlatList
                data={route.params.list}
                renderItem={({item}) => {
                    return (
                        <FeedListItem
                            image={item.imageUrl}
                            comment={item.content}
                            isLiked={false}
                            likeCount={item.likeHistory.length}
                            writer={item.writer.name}
                            onPressFeed={() => {
                                console.log('온프레스 피드')
                            }}
                            onPressFavorite={() => {
                                console.log('온프레스 페이보릿')
                                dispatch(favoriteFeed(item));
                            }}
                            createdAt={item.createdAt}
                        />
                    )
                }}
                ItemSeparatorComponent={() => (
                    <Spacer space={24} />
                )}
            />
        </View>
    )
}