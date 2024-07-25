import { getStringAsync } from "expo-clipboard"

export const getClipboardString = async () => {
    const result = await getStringAsync();
    return result;
}