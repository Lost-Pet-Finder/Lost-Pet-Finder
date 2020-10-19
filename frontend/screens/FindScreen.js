import React from 'react';
import 'react-native-gesture-handler';
import Login from './LoginScreen';
import{StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function FindScreen({navigation}){

    const pressHandler=()=>{
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text>This is Find Screen</Text>
            <TouchableOpacity style={styles.GoBackButton}
            onPress={pressHandler} >
                <Text style={styles.loginText}>Go Back To Main Page</Text>

            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#BBDEFB',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputText: {
      height: 50,
      color: '#fff',
      fontSize: 16,
    },
    inputView: {
      width: '80%',
      backgroundColor: '#465881',
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
      justifyContent: 'center',
      padding: 20,
    },
    loginText: {
      color: '#fff',
      fontSize: 16,
    },
    forgotPassword: {
      color: '#fff',
      marginTop: 50,
    },
    signup: {
      color: '#fff',
      marginTop: 15,
    },
    loginButton: {
      width: '30%',
      backgroundColor: '#2196F3',
      borderRadius: 25,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    image: {
      marginBottom: 40,
      width: 120,
      height: 120,
      resizeMode: 'stretch',
    },
    GoBackButton: {
        width: '60%',
        backgroundColor: '#2196F3',
        borderRadius: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
      },
  });
  
  