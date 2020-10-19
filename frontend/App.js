import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView, 
  StyleSheet, 
  Text, 
  StatusBar} 
from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import {DrawerNavigator,TabNavigator,StackNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import FindScreen from './screens/FindScreen';
import Navigator from './routes/homeStack';

// const App: () => React$Node = () => {
//   return ( 
//       <LoginScreen></LoginScreen>
//   );
// };

export default function App(){
  
  return <Navigator />;
  
}
const styles = StyleSheet.create({});
