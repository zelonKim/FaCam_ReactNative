const IS_DEV = process.env.APP_VARIANT !== 'production';

export default {
  "expo": {
    "name": IS_DEV ? "anstagram-dev" : "anstagram",
    "slug": "anstagram",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/d9daef7a-9ec1-498b-b077-72840d283111"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "googleServicesFile": IS_DEV ? "./GoolgeService-dev-Info.plist" : "./GoogleService-Info.plist",
      "bundleIdentifier": IS_DEV ? "com.anstagram.dev" :"com.my.anstagram"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "googleServicesFile": IS_DEV ? "./google-services-dev.json" : "./google-services.json",
      "permissions": [
        "android.permission.RECORD_AUDIO"
      ],
      "package": IS_DEV ? "com.anstagram.dev" :"com.my.anstagram"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "@react-native-firebase/app",
      "@react-native-firebase/crashlytics",
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "d9daef7a-9ec1-498b-b077-72840d283111"
      }
    },
    "runtimeVersion": "1.0.0"
  }
}
