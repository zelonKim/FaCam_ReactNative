import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Typography } from './components/Typography';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import database from 'react-native-firebase/database'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { stateUserInfo } from './states/stateUserInfo';
import { useGetDiaryList } from './hooks/useGetDiaryList';
import { PasswordInputBox } from './components/PasswordInputBox';


export const SplashView = (props)=>{
    const [loading, setLoading] = useState(false);

    const [showLoginButton, setShowLoginButton] = useState(false);

    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const [inputPassword, setInputPassword] = useState('');

    const [passwordError, setPasswordError] = useState(null);

    const [userInfo, setUserInfo] = useRecoilState(stateUserInfo);

    const runGetDiaryList = useGetDiaryList();


    const signinUserIdentify = useCallback(async (idToken) => {
        setLoading(true);

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const result = await auth().signInWithCredential(googleCredential);
        console.log(result) 

        const userDBRefKey = `/users/${result.user.uid}`; 
        const userResult = await database().ref(userDBRefKey).once('value').then((snapshot) => snapshot.val()) // database().ref(사용자의 데이터베이스 주소).once('value').then((snapshot) => snapshot.val()): 사용자의 데이터베이스에 저장된 밸류를 반환함.
        console.log(userResult);

        const now = new Date().toISOString();

        if(userResult === null) {
            await database().ref(userDBRefKey).set({ //  database().ref(사용자 데이터베이스 주소).set({키:밸류}): 사용자의 데이터베이스에 키와 밸류를 저장함.
                name: result.additionalUserInfo.profile.name,
                profileImage: result.additionalUserInfo.profile.picture,
                uid: result.user.uid,
                pasword:'',
                createdAt: now,
                lastLoginAt: now
            })
        } 
        // else {
        //     await database().ref(userDBRefKey).update({ // database().ref(사용자 데이터베이스 주소).update({키:밸류}): 사용자 데이터베이스의 키에 대한 밸류를 업데이트함.
        //         lastLoginAt: now,
        //     })
        // }

        const userInfo = await database().ref(userDBRefKey).once('value').then((snapshot) => snapshot.val())
        
        setUserInfo(userInfo);

        await runGetDiaryList(userInfo);

        if(userInfo.password !== '') {
            setShowPasswordInput(true);
            setLoading(false);
            return;
        }
        
        await database().ref(userDBRefKey).update({
            lastLoginAt: now,
        })

        props.onFinishLoad();
    }, [])


    const onPressGoogleLogin = useCallback(async() => {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const {idToken} = await GoogleSignin.signIn();
        signinUserIdentify(idToken);
    },[])



    const userSilentLogin = useCallback(async() => {
        try {
            const {idToken} = await GoogleSignin.signInSilently();
            signinUserIdentify(idToken);
        } catch(ex) {
            setShowLoginButton(true);
        }
    },[])

    useEffect(() => {
        userSilentLogin();
    }, [])


    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          {showLoginButton && <GoogleSigninButton onPress={onPressGoogleLogin} /> }
          {showLoginButton && (
            <PasswordInputBox 
                errorMessage={passwordError}
                value={inputPassword}
                onChangeText={async(text) => {
                    setInputPassword(text);

                    if(text.length === 4) {
                        if(userInfo.password === text) {
                            const now = new Date().toISOString();

                            const userDB = `/users/${userInfo.uid}`

                            await database().ref(userDB).update({
                                lastLoginAt: now,
                            })
                            props.onFinishLoad();
                        } else {
                            setInputPassword('');
                            setPasswordError('비밀번호가 일치하지 않습니다.')
                        }
                    }
                }}
            />
        )}

        {loading && (
            <ActivityIndicator />
        )}
        </View>
    )
}