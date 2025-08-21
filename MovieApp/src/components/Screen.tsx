import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { JSX } from 'react/jsx-runtime'; 
import ScreenBannerAd from './ScreenBannerAd';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  body: {
    flex: 1,
  },
  backButtonText: {
    fontSize: 12,
    color: Colors.BLACK,
  },
  backButtonIcon: {
    color: Colors.BLACK,
    fontSize: 20,
    marginLeft: 20,
  },
  subscription: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingVertical: 10,
  },
  subscriptionText: {
    color: Colors.black,
  },
});

interface ScreenProps {
  title?: string;
  children?: React.ReactNode;
  headerVisible?: boolean;
  renderRightComponent?: () => JSX.Element;
}

const Screen = ({
  children,
  title,
  headerVisible = true,
  renderRightComponent,
}: ScreenProps) => {
  const colorScheme = useColorScheme();

  const { goBack, canGoBack, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressBackButton = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle="light-content" />
      ) : colorScheme === 'dark' ? (
        <StatusBar barStyle="light-content" />
      ) : (
        <StatusBar barStyle="dark-content" />
      )}
      {headerVisible && (
        <View style={styles.header}>
          <View style={styles.left}>
            {canGoBack() && (
              <TouchableOpacity onPress={onPressBackButton}>
                <Icon style={styles.backButtonIcon} name="arrow-back" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.center}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          <View style={styles.right}>
            {renderRightComponent != null && renderRightComponent()}
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.subscription}
        onPress={() => {
          navigate('Purchase');
        }}
      >
        <Text style={styles.subscriptionText}>
          구독하고 광고없이 앱을 무제한으로 사용해 보세요
        </Text>
      </TouchableOpacity>

      <ScreenBannerAd />

      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
