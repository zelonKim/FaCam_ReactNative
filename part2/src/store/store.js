import { applyMiddleware, combineReducers, createStore } from "redux";
import { countReducer } from "../reducers/count";
import logger from 'redux-logger';
import { favoriteListReducer } from "../reducers/favoriteReducer";
import { lottoNumberReducers } from "../reducers/lottoNumbers";
import { newsReducer } from "../reducers/newsReducer";
import { thunk } from "redux-thunk";

/* 
const rootReducer = combineReducers({  // combineReducers({ 키 이름: 리듀서 함수명 }): 리듀서 함수들을 결합시켜줌.
    cr: countReducer,
})

const store = createStore(rootReducer, applyMiddleware(logger));  // createStore(리듀서 함수, applyMiddleware(미들웨어명)): 해당 리듀서 함수와 미들웨어가 반영된 스토어 객체를 생성함. 

export default store;
 */


/////////////////////



/*
const rootReducer = combineReducers({
    favorite: favoriteListReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))

export default store; 
*/


////////////////////


/* 
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from "redux-persist/es/persistStore";


const rootReducer = combineReducers({
    numbers: lottoNumberReducers
})

const persistedReducer = persistReducer({ // persistReducer({퍼시스트 설정}, 리듀서): 해당 리듀서에 대한 '퍼시스트 리듀서'를 생성함.
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet
}, rootReducer)


export const store = createStore(persistedReducer, applyMiddleware(logger)); // createStore(퍼시스트 리듀서): 해당 퍼시스트 리듀서에 대한 '퍼시스트 스토어'를 생성함.

export const persistor = persistStore(store); // persistStore(퍼시스트 스토어): 해당 퍼시스트 스토어에 대한 '퍼시스터'를 생성함.
*/


//////////////////////



const rootReducer = combineReducers({
    news: newsReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store;




