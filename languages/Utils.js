
import i18n from 'i18n-js'
import {Platform, NativeModules} from 'react-native'

export const getLanguage = () => {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  console.log(deviceLanguage);
  return deviceLanguage
};

i18n.translations = {
  en_US: require('./en_US.json'), 
  pt_BR: require('./pt_BR.json'),
}

export const setLanguage = language => {
  const iHaveThisLanguage = i18n.translations.hasOwnProperty(language);
  if (iHaveThisLanguage) {
    i18n.locale = language;
  } else {
    i18n.defaultLocale = 'pt-BR';
  }
}

export const translate = token => {
  const result = i18n.t(token);
  console.log('translation result', token, result);
  return result;
};