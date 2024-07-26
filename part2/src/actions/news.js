import { getItem, setItem } from "../utils/AsyncStorageUtils"

export const GET_NEWS_LIST_REQUEST = 'GET_NEWS_LIST_REQUEST'
export const GET_NEWS_LIST_SUCCESS = 'GET_NEWS_LIST_SUCCESS'
export const GET_NEWS_LIST_FAILURE = 'GET_NEWS_LIST_FAILURE'
export const CLIP_NEWS_ITEM = 'CLIP_NEWS_ITEM'
export const CLIPPED_TAB_FOCUS = 'CLIPPED_TAB_FOCUS'
export const STORAGE_KEY = '@MAIN/NEWS_LIST/FAVORITE'
export const CLIP_ITEM_RESET = 'CLIP_ITEM_RESET'


export const getNewsList = (query) => (dispatch) => {
    dispatch({type: GET_NEWS_LIST_REQUEST});

    // fetch(`요청URL`, { 요청헤더 }): 요청 URL로부터 JSON 문자열 형식의 응답 데이터를 받아옴.
    fetch(`https://openapi.naver.com/v1/search/blog.json?query=${decodeURIComponent(query)}`,
        {
            headers: {
                'X-Naver-Client-Id': 'cNag7dVCyWs8o1nHrUgP',
                'X-Naver-Client-Secret': 'OXPyx1Mkp0'
            }
        })
        .then((result) => {
            return result.json(); // JSON 문자열.json(): 해당 JSON 문자열을 Promise 타입의 자바스크립트 객체로 변환해줌. 
        })
        .then((result) => {
            dispatch({type: GET_NEWS_LIST_SUCCESS, result})
        })
        .catch((ex) => {
            dispatch({type: GET_NEWS_LIST_FAILURE, ex})
        })

}



export const clipNewsItem = (newsItem) => (dispatch, getState) => {
    dispatch({
        type: CLIP_NEWS_ITEM,
        newsItem
    })

    const lastFavoriteList = getState().news.favoriteNews;

    setItem(STORAGE_KEY, JSON.stringify(lastFavoriteList)) // JSON.stringify(자바스크립트 객체): 해당 자바스크립트 객체를 JSON 문자열로 변환해줌.
}




export const clippedTabFocus = () => async (dispatch, getState) => {
    const isInitOnce = getState().news.isInitFocusTabOnce;

    dispatch({
        type: CLIPPED_TAB_FOCUS
    })

    if(isInitOnce) {
        return;
    }

    const savedItems = JSON.parse(await getItem(STORAGE_KEY)); // JSON.parse(JSON 문자열): 해당 JSON 문자열을 자바스크립트 객체로 변환해줌.

    dispatch({
        type: CLIP_ITEM_RESET,
        savedItems
    })
}