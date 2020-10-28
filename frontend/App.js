import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} 
from 'react-native';

import Navigator from './routes/homeStack';

export default class App extends React.Component{
  
  render(){
    return <Navigator />;
  }
  
}

const styles = StyleSheet.create({});
