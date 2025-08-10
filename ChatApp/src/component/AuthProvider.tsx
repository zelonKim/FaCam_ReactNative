import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Collections, User } from '../types';
import AuthContext from './AuthContext';
import _ from 'lodash';
import storage from '@react-native-firebase/storage';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [processingSignup, setProcessingSignup] = useState(false);
  const [processingSignin, setProcessingSignin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onUserChanged(async fbUser => {
      if (fbUser != null) {
        // 로그인 상태
        setUser({
          userId: fbUser.uid,
          email: fbUser.email ?? '',
          name: fbUser.displayName ?? '',
          profileUrl: fbUser.photoURL ?? '',
        });
      } else {
        // 로그아웃 상태
        setUser(null);
      }
      setInitialized(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      setProcessingSignup(true);
      try {
        const { user: currentUser } =
          await auth().createUserWithEmailAndPassword(email, password);
        await currentUser.updateProfile({ displayName: name });

        await firestore()
          .collection(Collections.USERS)
          .doc(currentUser.uid)
          .set({
            userId: currentUser.uid,
            email,
            name,
          });
      } finally {
        setProcessingSignup(false);
      }
    },
    [],
  );

  const signin = useCallback(async (email: string, password: string) => {
    try {
      setProcessingSignin(true);
      await auth().signInWithEmailAndPassword(email, password);
      setProcessingSignin(false);
    } finally {
      setProcessingSignin(false);
    }
  }, []);

  const updateProfileImage = useCallback(
    async (filepath: string) => {
      if (user == null) {
        throw new Error('User is undefined');
      }

      const filename = _.last(filepath.split('/'));

      if (filename == null) {
        throw new Error('filename is undefined');
      }

      const storageFilepath = `users/${user?.userId}/${filename}`;

      await storage().ref(storageFilepath).putFile(filepath);
      const url = await storage().ref(storageFilepath).getDownloadURL();

      await auth().currentUser?.updateProfile({ photoURL: url });
      await firestore().collection(Collections.USERS).doc(user.userId).update({
        profileUrl: url,
      });
    },
    [user],
  );

  const value = useMemo(() => {
    return {
      initialized,
      user,
      signup,
      processingSignup,
      signin,
      processingSignin,
      updateProfileImage,
    };
  }, [
    initialized,
    user,
    signup,
    processingSignup,
    signin,
    processingSignin,
    updateProfileImage,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
