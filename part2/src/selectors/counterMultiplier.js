import { selector } from "recoil";
import { counterState } from "../states/counter";

export const counterMultiplier = selector({
    key: 'MAIN/ConterMultiplier',
    get: ({get}) => { 
        const result = get(counterState); // get(아톰): 아톰의 상태값을 가져옴.
        return result * 5; // 아톰의 파생 데이터 연산 결과
    } 
})