import 'react-native-gesture-handler';
import React from 'react';

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
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      errorMsg: null
    }
  }

  //identity = {user_id: '', isFinder: null};
  identity = {};

  async updateFCMDeviceToken(user_id) {
    const deviceToken = await messaging().getToken();
    console.log(`Device Token: ${deviceToken}`);

    const url =
      'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/notif/uploadDeviceToken';

    const body = {
      userid: user_id,
      deviceToken: deviceToken,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    return;
  }

  signedInAsFinder(){
    
    //let identity = {user_id: '1', isFinder: 1};
    identity["isFinder"] = 1;

    this.updateFCMDeviceToken(identity.user_id);
    //this.props.navigation.navigate('HomePage', {user_id: user_id, isFinder: 1});

    //handle firebase authentication
    this.handleLogin(identity);
  }

  

  signedInAsLoser() {
    // .. get user id from server
    const user_id = '2';
    //let identity = {user_id: '2', isFinder: 0};
    identity["isFinder"] = 0;

    this.updateFCMDeviceToken(identity.user_id);
    //this.props.navigation.navigate('HomePage', {user_id: user_id, isFinder: 0});

    //handle firebase authentication
    this.handleLogin(identity);
  }



  handleLogin = async(identity)=>{
    console.log(identity);

    if (this.state.email == null || this.state.password == null){
      Alert.alert('Login Information cannot be empty, plese try again');
      this.props.navigation.navigate('Login');
      this.setState({email: null, password: null});
    }
    else{
      try {
        let result = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
        if(result) {
          console.log(JSON.stringify(result));

          //get the firebase uid
          let uid = result["user"]["uid"];
          
          //get user_id for application
          let user_id = await getUserId(uid);
          if(user_id != null){
            identity["user_id"] = user_id;
            this.props.navigation.navigate('HomePage', identity);
          }
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
  }

  getUserId= async(uid)=>{
    //access the databse to get the user_id based on firebase uid
    const url = 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/user/getUserIdNumber';
    let body = JSON.stringify({uid:uid});
    const result = await fetch(url, 
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body
      })
    
      //get the user_id successfully
      if(result.status == 201 || result.status == 200){
        console.log(result);
        return result;
      }
      else{
        //if not, return null
        return null;
      }
  }

  handleSignup() {
      this.props.navigation.navigate('SignScreen');
  }

  render() {
    //console.log(JSON.stringify(this.props));
    return (
      <View style={styles.container} testID={'LoginScreen_detox'}>
        <Image
          style={styles.image}
          testID={'AppLogo_detox'}
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

        <TouchableOpacity
          style={styles.loginButton}
          testID={'SignInFinderButton_detox'}
          onPress={() => this.signedInAsFinder()}>
          <Text style={styles.loginText}>Sign In: Found</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          testID={'SignInLoserButton_detox'}
          onPress={() => this.signedInAsLoser()}>
          <Text style={styles.loginText}>Sign In: Lost</Text>
        </TouchableOpacity> 

        {/* <TouchableOpacity style={styles.loginButton} testID={'SignInFinderButton_detox'} onPress={()=>this.props.navigation.navigate('HomePage', {user_id: '1', isFinder: 1})} >
        <Text style={styles.loginText}>Sign In: Found</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} testID={'SignInLoserButton_detox'} onPress={()=>this.props.navigation.navigate('HomePage', {user_id: '2', isFinder: 0})} >
        <Text style={styles.loginText}>Sign In: Lost</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => this.handleSignup()}>
          <Text style={styles.signup}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
