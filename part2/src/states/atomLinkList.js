import { atom } from "recoil";
import { getItem, removeItem, setItem } from "../utils/AsyncStorageUtils";

const asyncStorageEffect = key => async({setSelf, onSet}) => {
    const savedValue = await getItem(key)

    if(savedValue !== null) {
        setSelf(JSON.parse(savedValue))
    }

    onSet((newValue, _, isReset) => {
        console.log(newValue); // {"list": [{"createdAt": "2024-07-25T05:28:16.155Z",  "image": "",  "link": "https://www.naver.com",  "title": ""}]}
        isReset ? removeItem(key) : setItem(key, JSON.stringify(newValue))
    })
}


export const atomLinkList = atom({
    key: 'MAIN/LINK_LIST',
    default: {
        list: []
    },
    effects: [asyncStorageEffect('MAIN/LINK_LIST')]
})