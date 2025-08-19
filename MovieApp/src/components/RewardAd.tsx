import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import {
  RewardedAdEventType,
  RewardedInterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';

import Colors from 'open-color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: Colors.black,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const adUnitId = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : Platform.OS === 'ios'
  ? 'ca-app-pub-898349852935325/534523453'
  : 'ca-app-pub-298453435564563/7688578576';

  
const RewardAd = () => {
  const rewardedAdRef = useRef(
    RewardedInterstitialAd.createForAdRequest(adUnitId),
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    rewardedAdRef.current.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
      console.log('loaded');
    });
    rewardedAdRef.current.load();
  }, []);

  useEffect(() => {
    if (loaded) {
      rewardedAdRef.current.show();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return null;
};

export default RewardAd;
