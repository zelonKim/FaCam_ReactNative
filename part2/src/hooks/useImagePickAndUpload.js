import { useCallback } from "react"
import { Platform } from "react-native";
import storage from 'react-native-firebase/storage';


export const useImagePickAndUpload = (allowsEditing) => {
    return useCallback(async()=>{
        const imagePickResult = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.Images,
            allowsEditing,
        })

        if(imagePickResult.canceled) return;

        const pickPhotoResultArray = imagePickResult.assets.map((item)=>{
            const uri = item.uri
            const fileNameArray = uri.split('/')
            const fileName = fileNameArray[fileNameArray.length-1]
            return {
                uri,
                fileName
            }
        })

        const putResultList = await Promise.all(
            pickPhotoResultArray.map((item) => {
                return storage().ref(item.fileName)
                                .putFile(Platform.OS === 'ios' ? item.uri.replace('file://', '') : item.uri)
                                .then((result) => storage().ref(result.metadata.fullPath).getDownloadURL());
            })
        )
        return putResultList;
    },[])
}