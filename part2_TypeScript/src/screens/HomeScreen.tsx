import React, { useCallback, useEffect } from "react";
import { FlatList, View } from "react-native";
import { Header } from "../components/Header/Header";
import { useTotalFeedList } from "../selectors/feed";
import { FeedListItem } from "../components/FeedListItem";
import { useDispatch } from "react-redux";
import { TypeFeedListDispatch, favoriteFeed, getFeedList } from "../actions/feed";
import { Spacer } from "../components/Spacer";
import { useRootNavigation } from "../navigations/RootStackNavigation";
import crashlytics from '@react-native-firebase/crashlytics'
import '@react-native-firebase/analytics'

export const HomeScreen: React.FC = () => {
    const rootNavigation = useRootNavigation();

    const feedList = useTotalFeedList();

    const dispatch = useDispatch<TypeFeedListDispatch>();

    const onPressHome = useCallback(() => {
        console.log('온 프레스 홈')
        rootNavigation.navigate('AddFeed')
    }, [])

    useEffect(()=>{
        crashlytics().crash();
        dispatch(getFeedList());
    }, [])
    
    return (
        <View style={{flex: 1}}>
            <Header>
                <Header.Title title='HOME' />
                <Header.Icon name='add' onPress={onPressHome} />
            </Header>

            <FlatList 
                data={feedList}
                renderItem={({item}) => {
                    return (
                        <FeedListItem
                            image={item.imageUrl}
                            comment={item.content}
                            isLiked={false}
                            likeCount={item.likeHistory.length}
                            writer={item.writer.name}
                            onPressFeed={()=> {
                                console.log('온프레스 피드')
                            }}
                            onPressFavorite={()=>{
                                console.log('온프레스 페이보릿')
                                dispatch(favoriteFeed(item));
                            }}
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