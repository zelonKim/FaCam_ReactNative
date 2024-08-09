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
        

        getList: useCallback<() => Promise<AccountBookHistory[]>>(async() => {
            const db = await openDB();
            const result = await db.executeSql(`
                SELECT * FROM account_history
            `)
            const items: AccountBookHistory[] = [];
            const size = result[0].rows.length

            for(let i=0; i<size; i++){
                const item = result[0].rows.item(i);

                items.push({
                    type: item.type,
                    comment: item.comment,
                    createdAt: parseInt(item.created_at),
                    updatedAt: parseInt(item.updated_at),
                    date: parseInt(item.date),
                    id: parseInt(item.id),
                    photoUrl: item.photo_url,
                    price: parseInt(item.price)
                })
            }

            return items.sort((a, b) => a.date - b.date);
        }, [openDB]),

        

        updateItem: useCallback<(item: AccountBookHistory) => Promise<AccountBookHistory>>(async(item) => {
            if(typeof item.id === 'undefined') {
                throw Error('unexpected id value')
            }

            const now = new Date().getTime();

            const db = await openDB();

            const result = await db.executeSql(`
                UPDATE account_history
                SET price=${item.price}, 
                    comment="${item.comment}", 
                    date=${item.date},   
                    photo_url=${item.photoUrl !== null ? `"${item.photoUrl}"` : null },
                    updated_at=${now}
                    date=${item.date}
                WHERE id=${item.id}
            `)
            return {
                ...item,
                id: result[0].insertId
            }
        },[openDB]),


        getMonthlyAverage: useCallback<() => Promise<{month:number, data:number[]}[]>>(async() => {
            const now = new Date();

            const currentMonthStart = new Date();
            currentMonthStart.setDate(1);

            const prevMonthList = [2, 1].map((monthDiff)=>{
                const date = new Date();
                date.setMonth(now.getMonth() - monthDiff);
                date.setDate(1);

                return date.getTime();
            })

            const queryMonth = prevMonthList.concat([currentMonthStart.getTime(), now.getTime()])

            const result:{month:number, data:number[]}[] = []


            const db = await openDB();

            for(let i=0; i<queryMonth.length-1; i++) {
                const start = queryMonth[i];
                const end = queryMonth[i+1];

                const usedPriceResult = await db.executeSql(`
                    SELECT SUM(price)
                    FROM account_history
                    WHERE date>=${start} AND date<${end} AND  type=\"사용\"
                `)

                const savedPriceResult = await db.executeSql(`
                    SELECT SUM(price)
                    FROM account_history
                    WHERE date>=${start} AND date<${end} AND type=\"수입\"
                `)

                const usedPrice = usedPriceResult[0].rows.item(0)['SUM(price)'];
                const savedPrice = savedPriceResult[0].rows.item(0)['SUM(price)'];

                result.push({
                    month: new Date(start).getMonth(),
                    data: [usedPrice, savedPrice],
                })
            }

            return result;

        },[openDB])


    }
}