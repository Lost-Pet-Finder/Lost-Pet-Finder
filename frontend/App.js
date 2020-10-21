import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView, 
  StyleSheet, 
  Text, 
  StatusBar} 
from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import {DrawerNavigator,TabNavigator,StackNavigator} from 'react-navigation';
import Navigator from './routes/homeStack';

export default class App extends React.Component{
  
  render(){
    return <Navigator />;
  }
  
}

const styles = StyleSheet.create({});
