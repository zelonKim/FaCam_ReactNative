import {OpenGraphParser} from 'react-native-opengraph-kit';

export const getOpenGraphData = async(url) => {
    const result = await OpenGraphParser.extractMeta(url) // OpenGraphParser.extractMeta(url): 해당 url 페이지에 대한 정보를 가져옴.
    console.log(result)
    /*
     [{"Referrer": "origin", 
        "title": "네이버", 
        "description": "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
        "image": "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png", 
        "url": "https://www.naver.com",
        "viewport": "width=1190"
     }] 
    */

    return result[0] || null
}

