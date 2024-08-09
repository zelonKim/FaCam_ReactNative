import database from '@react-native-firebase/database'

export const saveNewRestaurant = async(params:{
    title: string, 
    address: string,
    latitude: number,
    longitude: number,
}) => {
    const db = database().ref('/restaurant')
    const saveItem = {
        title: params.title,
        address: params.address,
        latitude: params.latitude,
        longitude: params.longitude
    }
    await db.push().set({...saveItem}) 
}; 


export const getRestaurantList = async(): Promise<{title: string, address: string, latitude:number, longitude: number}[]> => {
    const db = database().ref('/restaurant')
    const snapshotValue = await db.once('value').then((snapshot) => snapshot.val());

    return Object.keys(snapshotValue).map((key) => snapshotValue[key])
}