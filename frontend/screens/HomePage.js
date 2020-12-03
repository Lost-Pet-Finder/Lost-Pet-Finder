import React from 'react';
import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './styles';
//import { useEffect } from 'react';

// FCM
import messaging from '@react-native-firebase/messaging';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.navigation.state.params.user_id,
      isFinder: this.props.navigation.state.params.isFinder,
    };
  }

  componentDidMount() {
    this.setupForegroundNotifications();
    console.log(`My User Id is: ${this.state.user_id}`);
  }

  async setupForegroundNotifications() {
    // register foreground handler
    const unsubscribeFore = messaging().onMessage((remoteMessage) => {
      Alert.alert(
        `${remoteMessage.notification.title}`,
        `${remoteMessage.notification.body}`,
      );
    });
    return unsubscribeFore;
  }

  async getPetInfo(){}

    render() {
        return (
            <View style={styles.containerView} testID={'HomePage_detox'}>
                <TouchableOpacity 
                    style={styles.reportView}
                    testID={'ReportButton_detox'}
                    onPress={() => {
                    this.props.navigation.navigate('ReportScreen', {user_id: this.state.user_id, isFinder: this.state.isFinder})}}
                >
                    <View >
                        <Text style={styles.viewTitle} >📸 Report 📸</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.browseView}
                    testID={'BrowseButton_detox'}
                    onPress={() => {
                    this.props.navigation.navigate('BrowseScreen', {user_id: this.state.user_id, isFinder: this.state.isFinder})}}
                >
                    <View >
                        <Text style={styles.viewTitle}>🔎 Browse 🔍</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.contactView}
                    testID={'HomeContactButton_detox'}
                    onPress={() => {
                    //direct to the page displaying all the requests
                    this.props.navigation.navigate('MainContactScreen', {user_id: this.state.user_id});
                    }}
                >
                    <View >
                        <Text style={styles.viewTitle}>📱 Contact 📱</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
