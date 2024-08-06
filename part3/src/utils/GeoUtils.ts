import { KAKAO_API_KEY } from "../../api_key";


export const getAddressFromCoords = (
    latitude: number,
    longitude: number
): Promise<string | null> => {
    return fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
        {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`
            }
        }
    ).then(result => result.json())
     .then(result => {
        if(result.meta.total_count === 0) {
            return null;
        }
        if(result.documents.length === 0) {
            return null;
        }
        const addressItem = result.documents[0];

        return addressItem.address.address_name;
     })
}



export const getCoordsFromAddress = (address:string):Promise<{latitude:number, longitude:number, address:string} | null> => {
    return fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
        {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`
            }
        }
    ).then(result => result.json())
     .then(result => {
        if(result.meta.total_count === 0) {
            return null;
        }
        if(result.documents.length === 0) {
            return null;
        }
        const addressItem = result.documents[0];

        return {
            latitude: addressItem.y,
            longitude: addressItem.x,
            address: addressItem.address_name
        } 
     })
}




export const getCoordsFromKeyword = (keyword:string):Promise<{latitude:number, longitude:number, address:string} | null> => {
    return fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`,
        {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`
            }
        }
    ).then(result => result.json())
     .then(result => {
        if(result.meta.total_count === 0) {
            return null;
        }
        if(result.documents.length === 0) {
            return null;
        }
        const addressItem = result.documents[0];

        return {
            latitude: addressItem.y,
            longitude: addressItem.x,
            address: addressItem.address_name
        } 
     })
}



