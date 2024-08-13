import React, { useCallback, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TypeUserDispatch, getUserLikedHistory } from "../actions/user";
import { TypeRootReducer } from "../store";
import { TypeDog } from "../data/TypeDog";
import { TypeUser } from "../data/TypeUser";
import database from '@react-native-firebase/database'


export const HistoryListView: React.FC<{onPressItem: (index:number) => void}> = (props) => {
    const {width} = useWindowDimensions();

    const dispatch = useDispatch<TypeUserDispatch>();

    // const likedList = useSelector<TypeRootReducer, TypeDog[]>(store => store.user?.history)

    const user = useSelector<TypeRootReducer, TypeUser | null>(store => store.user.user)

    const [likedList, setLikedList] = useState<TypeDog[]>([]);

    const loadLikedList = useCallback(async() => {
        if(user === null) return;
    }, [])

    const ref = `history/${user?.uid}`;

    const currentHistory = await database()
                                    .ref(ref)
                                    .once('value')
                                    .then(snapshot => snapshot.val())
    
    const dogList = Object.keys(currentHistory).map(key => {
        const item = currentHistory[key];

        return {
            photoUrl: item.url
        } as TypeDog;
    })

    setLikedList(dogList);
    }, [user]);

    useEffect(()=>{
        dispatch(getUserLikedHistory())
    },[dispatch])
}

