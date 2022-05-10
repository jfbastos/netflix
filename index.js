/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(remoteMessage => {
  console.log('Nofitication arrived', remoteMessage);
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
