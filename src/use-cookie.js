import { useEffect, useState } from "react"

const getRandomCookie = () => {
    const cookieLen = 15;
    const randomNum = Math.floor(Math.random() * cookieLen);
    console.log(Math.random()) // Math.random(): 0 ~ 1 사이의 실수를 반환함.
    console.log(Math.floor(Math.random())) // Math.floor(실수): 소수점 이하를 내림해줌.

    return `cookie_${randomNum + 1}`
}


export const useCookie = () => {
    const [cookieKey, setCookieKey] = useState("");

    useEffect(() => {
        const randomCookieKey = getRandomCookie();
        setTimeout(()=> {
            setCookieKey(randomCookieKey);
        }, 2000)
    },[])

    return {
        cookieKey
    }
}