import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';

import messaging from '@react-native-firebase/messaging';

import ViewHierarchy from './routes/ViewHiearchy';


export default class App extends React.Component {

  componentDidMount() {
    this.requestUserPermission();
    this.setupBackgroundNotifications();
  }

  async setupBackgroundNotifications() {
    // Register background handler
    const unsubscribeBack = messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Got message in background!', remoteMessage);
    });
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  render() {
    return <ViewHierarchy />;
  }

}

