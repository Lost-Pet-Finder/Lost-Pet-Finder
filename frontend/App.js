import React from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar} from 'react-native';
import LoginScreen from './screens/LoginScreen';

const App: () => React$Node = () => {
  return (
    <>
      <LoginScreen></LoginScreen>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
