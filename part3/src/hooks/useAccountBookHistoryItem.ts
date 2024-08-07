import { useCallback } from "react"
import { AccountBookHistory } from "../data/AccountBookHistory"
import SQLite, { SQLiteDatabase, openDatabase } from "react-native-sqlite-storage";

SQLite.enablePromise(true);


export const useAccountBookHistoryItem = () => {
    const openDB = useCallback<() => Promise<SQLiteDatabase>>(async() => {
        return await SQLite.openDatabase(
            {
                name:'account_history',
                createFromLocation: '~www/account_history.db',
                location: 'default'
            },
            () => {console.log('오픈 데이터베이스 성공')},
            () => {console.log('오픈 데이터베이스 실패')}
        )
    },[]);

    return {
        insertItem: useCallback<(item: Omit<AccountBookHistory, 'id'>) => Promise<AccountBookHistory>>(async(item) => {
            const db = await openDB();

            const now = new Date().getTime();

            const result = await db.executeSql(
                `INSERT INTO account_history (
                    type, 
                    price, 
                    comment, 
                    date, 
                    photo_url, 
                    created_at, 
                    updated_at
                )
                 VALUES (
                    "${item.type}", 
                    ${item.price}, 
                    "${item.comment}", 
                    ${item.date},  
                    ${item.photoUrl !== null ? `"${item.photoUrl}"` : null}, 
                    ${now},
                    ${now}
                )
                `
            )
            console.log(result);

            return {
                ...item,
                id: result[0].insertId
            }
        },[]),


        updateItem: useCallback<(item: AccountBookHistory) => Promise<AccountBookHistory>>((item) => {

        },[])

    }
}