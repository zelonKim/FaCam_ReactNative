import { atom } from 'recoil';

export const counterState = atom({
    key: 'MAIN/COUNTER',
    default: 0, // 초기 상태값
})