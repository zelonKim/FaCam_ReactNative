import { Dimensions, FlatList, Image, Text, TouchableOpacity } from "react-native";

const width = Dimensions.get('screen').width;
const minColumSize = width >= 500 ? 200 : 120;
const divisor = width / minColumSize;
const numColumns = Math.floor(divisor)
const columnSize = width / numColumns;


export default ({ imagesWithAddButton, onPressOpenGallery, onPressImage, onLongPressImage }) => {
    const renderItem = ({ item: image , index }) => {
        const {id, uri} = image;
        if(id === -1) {
          return (
            <TouchableOpacity
              onPress={onPressOpenGallery}
              style={{width: columnSize, height: columnSize, backgroundColor: "lightgrey", justifyContent:"center", alignItems:"center"}}>
              <Text style={{fontWeight: "100", fontSize: 45}}> + </Text>
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity onPress={() => onPressImage(image)}  onLongPress={() => onLongPressImage(id)}>
            <Image source={{ uri }} style={{width: columnSize, height: columnSize}} />
          </TouchableOpacity>
        );
      };

    return(
        <FlatList
        data={imagesWithAddButton} 
        renderItem={renderItem} 
        numColumns={numColumns} 
        style={{ zIndex: -1 }}
        onLayout={e => {console.log('layout.width', e.nativeEvent.layout.width);
        }}
        />
    )
}