import { applyMiddleware, combineReducers, createStore } from "redux";
import { countReducer } from "../reducers/count";
import logger from 'redux-logger';
import { favoriteListReducer } from "../reducers/favoriteReducer";
import { lottoNumberReducers } from "../reducers/lottoNumbers";

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



const rootReducer = combineReducers({
    numbers: lottoNumberReducers
})

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;