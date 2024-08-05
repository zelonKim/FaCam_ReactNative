import { NativeModules } from "react-native"

export const excuteCalculator = (
    action: 'plus' | 'minus' | 'divide' | 'multipy' ,
    numberA: number,
    numberB: number,
): Promise<number> => {
    return NativeModules.CaculatorModule.executeCalc(action, numberA, numberB);
};