import 'react-native-gesture-handler';
import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';

// FCM
import messaging from '@react-native-firebase/messaging';
import auth, {firebase} from '@react-native-firebase/auth';


class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: null
    }
  }

  identity = {user_id: '', isFinder: null};

  async updateFCMDeviceToken(user_id) {
    const deviceToken = await messaging().getToken();
    console.log(`Device Token: ${deviceToken}`);

    const url = 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/notif/uploadDeviceToken';

    const body = {
      userid: user_id,
      deviceToken: deviceToken
    }

    try {
      const response = await fetch(url, 
        {
            method:'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
    } catch (err) {
      console.log(err);
    }

    return;
  }

  signedInAsFinder() {
    // ... get user id from server
    const user_id = '1';
    let identity = {user_id: '1', isFinder: 1};

    this.updateFCMDeviceToken(identity.user_id);
    //this.props.navigation.navigate('HomePage', {user_id: user_id, isFinder: 1});

    //handle firebase authentication
    this.handleLogin(identity);
  }

  signedInAsLoser() {
    // .. get user id from server
    const user_id = '2';
    let identity = {user_id: '2', isFinder: 0};

    this.updateFCMDeviceToken(identity.user_id);
    //this.props.navigation.navigate('HomePage', {user_id: user_id, isFinder: 0});

    //handle firebase authentication
    this.handleLogin(identity);
  }

  handleLogin = async(identity)=>{
    console.log(identity);
    try {
      let result = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
      if(result) {
        this.props.navigation.navigate('HomePage', identity);
      }
    }
    catch(e){
      switch(e.code){
        //The provided value for the email user property is invalid. It must be a string email address.
        //Invalid input example: cpen321321, 091e10
        
        case 'auth/invalid-email':
          Alert.alert('Invalid email, please check if your account is correct');
          break;
        
        //The provided value for the password user property is invalid. It must be a string with at least six characters.
        case 'auth/wrong-password':
          Alert.alert('Wrong password, please check if your password is correct');
          break;
      }
    }
  }

  render(){
    //console.log(JSON.stringify(this.props));
    return (
      
      <View style={styles.container} testID={'LoginScreen_detox'}>
        <Image
          style={styles.image}
          source={require('../assets/logo.png')}></Image>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            testID={'EmailInput_detox'}
            //labelValue={email}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => this.setState({email})}
            value = {this.state.email}
          />
        </View> 

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            testID={'PasswordInput_detox'}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(password) => this.setState({password})}
            value = {this.state.password}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} testID={'SignInFinderButton_detox'} onPress={()=>this.signedInAsFinder()} >
         
          <Text style={styles.loginText}>Sign In: Found</Text>
  
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} testID={'SignInLoserButton_detox'} onPress={()=>this.signedInAsLoser() } >
         
          <Text style={styles.loginText}>Sign In: Lost</Text>
  
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.signup}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    )
  }

  
};

export default LoginScreen;

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
    width: '40%',
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
});

