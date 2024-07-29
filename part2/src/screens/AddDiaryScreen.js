import { ScrollView, View, useWindowDimensions } from "react-native"
import { Header } from "../components/Header/Header"
import { useNavigation } from "@react-navigation/native"
import { useCallback, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { Spacer } from "../components/Spacer";
import { Typography } from "../components/Typography";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useCreateDiary } from "../hooks/useCreateDiary";

export const AddDiaryScreen = () => {
    const width = useWindowDimensions();

    const runCreateDiary = useCreateDiary();

    const photoSize = useMemo(() => {
        return {
            photoWidth: width,
            photoHeight: width * 0.5,
        }
    }, [width])

    const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);

    const [title, setTitle] = useState('');

    const [content, setContent] = useState('');

    const runImagePickAndUpload = useImagePickAndUplaod();

    const [visibleDatePicker, setVisibleDatePicker] = useState(false);

    const canSave = useMemo(() => {
        if(selectedDate === null) return false;
        if(title === '') return false;
        if(content === '') return false;
        return true;
    }, [selectedDate, title, content])


    const navigation = useNavigation();
    
    const onPressBack = useCallback(()=>{
        navigation.goBack();
    }, [])

    const onPressPhotoItem = useCallback(async() => {
        const result = await runImagePickAndUpload();
        if(result.length > 0) {
            setSelectedPhotoUrl(result[0])
        }
    }, [])

    const onPressCalendar = useCallback(()=>{
        setVisibleDatePicker(true);
    },[])

    const onPressSave = useCallback(() => {
        if(!canSave) return;  
        runCreateDiary(selectedPhotoUrl, selectedDate, title, content)
        navigation.goBack();
        
    },[canSave, selectedPhotoUrl, selectedDate, title, content])

    return(
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Title title='ADD DIARY'></Header.Title>
                </Header.Group>
                <Header.Icon iconName='close' onPress={onPressBack}></Header.Icon>
            </Header>

            <ScrollView style={{flex:1}}>
                <Button>
                    {selectedPhotoUrl !== null ? (
                        <RemoteImage 
                            url={selectedPhotoUrl}
                            width={photoSize.photoWidth}
                            height={photoSize.photoHeight}
                        />
                    ) : (
                        <View
                            style={{
                                backgroundColor: 'lightgray',
                                width: photoSize.photoWidth, 
                                height: photoSize.photoHeight
                            }}
                        />
                    )}
                </Button>

                <Spacer space={20} />

                <Button onPress={onPressCalendar}>
                    <View style={{
                        flexDirection:"row",
                        paddingHorizontal: 24,
                        paddingVertical: 12,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Typography fontSize={20}> 날짜 </Typography>
                        <Typography fontSize={16}> 
                            { selectedDate == null 
                                ? '날짜를 선택해주세요' 
                                : `${selectedDate.getFullYear()} - ${selectedDate.getMonth() + 1} - ${selectedDate.getDate()}`} 
                        </Typography>
                    </View>
                </Button>

                <Spacer space={40} />

                <View style={{paddingHorizontal: 24}} >
                    <SingleLineInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder='제목을 입력해주세요' 
                    />
                </View>

                <Spacer space={20} />

                <View style={{paddingHorizontal: 24}} >
                    <MultiLineInput
                        value={content}
                        onChangeText={setContent}
                        placeholder='내용을 입력해주세요' 
                    />
                </View>

                <View>
                    <Spacer space={40} />
                    <View style={{paddingHorizontal: 24}}>
                        <Button onPress={onPressSave}>
                            <View style={{
                                paddingVertical: 16,
                                alignItems:'center',
                                backgroundColor: canSave ? 'black' : 'lightgray',
                                borderRadius: 4,
                            }}>
                                <Typography color={canSave ? 'white' : 'gray' } fontSize={20}>등록하기</Typography>
                            </View>
                        </Button>
                    </View>
                </View>
            </ScrollView>

            <DateTimePicker 
                isVisible={visibleDatePicker}
                mode='date'
                onConfirm={(date) => {
                    console.log(date);
                    setSelectedDate(new Date(date))
                    setVisibleDatePicker(false);
                }}
                onCancel={() => {
                    setVisibleDatePicker(false);
                }}
            />
        </View>
    )
}