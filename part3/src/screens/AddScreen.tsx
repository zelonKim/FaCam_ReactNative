// import React, { useCallback, useState } from "react";
// import { View } from "react-native";
// import { Header } from "../components/Header/Header";
// import { Typography } from "../components/Typography";
// import { Spacer } from "../components/Spacer";
// import { SingleLineInput } from "../components/SingleLineInput";
// import { useRootNavigation, useRootRoute } from "../navigation/RootNavigation";
// import MapView, { Marker } from "react-native-maps";
// import { Button } from "../components/Button";
// // import { saveNewRestaurant } from "../utils/RealTimeDataBaseUtils";

// export const AddScreen: React.FC = () => {
//     const [title, setTitle] = useState('');

//     const navigation = useRootNavigation<'Add'>();

//     const routes = useRootRoute<'Add'>();


//     const onPressBack = useCallback(()=>{
//         navigation.goBack();
//     }, [navigation]);



//     const onPressSave = useCallback(async() => {
//         if(title === '') return;

//         await saveNewRestaurant({
//             title: title,
//             latitude: routes.params.latitude,
//             longitude: routes.params.longitude,
//             address: routes.params.address,
//         })

//         navigation.goBack();
//     }, [
//         navigation,
//         routes.params.address,
//         routes.params.latitude,
//         routes.params.longitude,
//         title,
//     ]);


//     return (
//         <View style={{flex:1}}>
//             <Header>
//                 <Header.Title title="Add" />
//                 <Header.Icon name="close" onPress={onPressBack} />
//             </Header>

//             <View style={{flex:1, paddingTop:24, paddingHorizontal:24}}>
//                 <Typography fontSize={16}> 가게명 </Typography>
//                 <Spacer space={8} /> 

//                 <SingleLineInput value={title} onChangeText={setTitle} placeholder='이름을 입력해 주세요' />
//                 <Spacer space={24} />

//                 <Typography fontSize={16}> 주소 </Typography>
//                 <Spacer space={8} />
//                 <Typography fontSize={20}>{routes.params.address}</Typography>
//                 <Spacer space={24} />

//                 <Typography fontSize={16}> 위치 </Typography>
//                 <Spacer space={8} />
//                 <MapView 
//                     style={{ height: 200 }}
//                     region={{ 
//                         latitude: routes.params.latitude,
//                         longitude: routes.params.longitude,
//                         latitudeDelta: 0.00015,
//                         longitudeDelta: 0.00121,
//                     }}>
//                     <Marker 
//                         coordinate={{
//                             latitude: routes.params.latitude,
//                             longitude: routes.params.longitude,
//                         }}
//                     />
//                 </MapView>

//                 <Spacer space={48} />

//                 <Button onPress={onPressSave}>
//                     <View 
//                         style={{
//                             backgroundColor: title === '' ? 'gray' : 'black', 
//                             paddingHorizontal:24,
//                             paddingVertical:12,
//                             alignItems:'center'
//                         }}>
//                         <Typography fontSize={20} color='white'> 저장하기 </Typography>
//                     </View>
//                 </Button>
//             </View>
//         </View>
//     )


// }