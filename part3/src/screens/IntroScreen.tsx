import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import { Typography } from "../components/Typography";
import { Button } from "../components/Button";
import { useRootNavigation } from "../navigation/RootStackNavigation";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'
import { useDispatch } from "react-redux";
import { setUser } from "../actions/user";


export const IntroScreen:React.FC = () => {
    const rootNavigation = useRootNavigation<'Intro'>();

    const dispatch = useDispatch();

    const safeArea = useSafeAreaInsets();

    const [visibleGoogleSigninBtn, setVisibleGoogleSigninBtn] = useState(true);


    const checkUserLoginOnce = useCallback(async() => {
        const isSignIn = await GoogleSignin.hasPreviousSignIn(); 

        if(!isSignIn) { 
            setVisibleGoogleSigninBtn(true)
            return; 
        }

        setVisibleGoogleSigninBtn(false) 
        const result = await GoogleSignin.signInSilently();
        const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
        const authResult = await auth().signInWithCredential(googleCredential);

        const uid = authResult.user.uid;

        const currentTime = new Date();

        const reference = database().ref(`member/${uid}`);

        await reference.update({
            lastLoginAt: currentTime.toISOString()
        })

        const userInfo = await reference.once('value').then((snapshot) => snapshot.val());

        dispatch(setUser({
            uid: uid,
            userEmail: userInfo.email,
            userName: userInfo.name,
            profileImage: userInfo.profile,
        }))

        rootNavigation.reset({
            routes: [{name: 'Main'}]
        })

    }, [dispatch, rootNavigation])



    const onPressGoogleSignin = useCallback(async() => {
        const isSignIn = await GoogleSignin.hasPreviousSignIn();
        if(isSignIn) {
            await GoogleSignin.signOut();
        }
        const result = await GoogleSignin.signIn({});
        const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
        const authResult = await auth().signInWithCredential(googleCredential);
    

        const uid = authResult.user.uid;

        const currentTime = new Date();

        const reference = database().ref(`member/${uid}`);

        const user = await reference.once('value').then((snapshot) => snapshot.val())

        if(user !== null) {
        await reference.update({
            lastLoginAt: currentTime.toISOString()
        })

        const userInfo = await reference.once('value').then((snapshot) => snapshot.val());

        dispatch(setUser({
            uid: uid,
            userEmail: userInfo.email,
            userName: userInfo.name,
            profileImage: userInfo.profile,
        }))

        rootNavigation.reset({
            routes: [{name: 'Main'}]
        })

        return;
        }


        rootNavigation.push('Signup', {
            screen: 'InputEmail',
            params: {
                preInput: {
                    email: result.user.email,
                    name: result.user.name ?? 'Unknown',
                    profileImage: result.user.photo ?? '',
                },
                uid: authResult.user.uid,
            }
        })
    }, [rootNavigation])


    useEffect(() => {
        checkUserLoginOnce(); 
    }, [checkUserLoginOnce])


    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="IntroScreen" />
            </Header>

            <View 
                style={{
                    flex:1,
                    alignItems:'center', 
                    justifyContent:'flex-end', 
                    paddingBottom:32
                }}
            >
                {visibleGoogleSigninBtn && (
                    <GoogleSigninButton onPress={onPressGoogleSignin}/>
                )}
                
            </View>
        </View>
    )
}