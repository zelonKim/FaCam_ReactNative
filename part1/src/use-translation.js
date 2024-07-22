
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'react-string-format';


const ko = require('./lang/lang.ko.json');
const en = require('./lang/lang.en.json');
const ja = require('./lang/lang.ja.json');
const zh = require('./lang/lang.zh.json');
const es = require('./lang/lang.es.json');




const i18n = new I18n({ // new I18n( { 언어: { 키: '밸류'} } ): 해당 언어에 대한 키와 밸류를 가진 i18n객체를 생성함.
  ko,
  en,
  ja,
  zh,
  es
})

i18n.enableFallback = true;
i18n.defaultLocale = "ko";


const deviceLanguage = getLocales()[0].languageCode; 


const LOCALE_KEY = "locale2";


export const useTranslation = () => {
    const [locale, _setLocale ] = useState(null);

    const setLocale = (v) => {
      _setLocale(v);
      AsyncStorage.setItem(LOCALE_KEY, v)
    }

    const init = async() => {
      const fs = await AsyncStorage.getItem(LOCALE_KEY);
      if (fs !== null) {
        _setLocale(fs) // i18n객체.locale = 언어: 해당 언어를 i18n객체에서 번역할 언어로 설정함.
      } else {
        _setLocale(deviceLanguage)
      }
    }

    useEffect(() => {
        init();
    }, [])

    return {
        translator: (scope) => i18n.t(scope, { locale }), // scope 매개변수 전달을 명시해줘야 함.
        setLocale,
        locale,
        format
      }
}