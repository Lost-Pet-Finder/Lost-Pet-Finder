import 'react-native-gesture-handler';
import React from 'react';

import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

import styles from './styles';

// FCM
import messaging from '@react-native-firebase/messaging';
import auth, {firebase} from '@react-native-firebase/auth';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      errorMsg: null,
    };
  }

  entity = {user_id: '', isFinder: null};

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

  async signedInAsFinder() {
    const uid = await this.handleLogin();

    if (uid != -1) {
      let user_id = await this.getUserId(uid);

      if (user_id == null) {
        Alert.alert('User Does Not Exist in Database');
      } else {
        let identity = {user_id: user_id, isFinder: 1};
        this.updateFCMDeviceToken(identity.user_id);
        this.handleLogin(identity);
        this.props.navigation.navigate('HomePage', identity);
      }
    }
  }

  async signedInAsLoser() {
    // .. get user id from server
    const uid = await this.handleLogin();

    if (uid != -1) {
      let user_id = await this.getUserId(uid);

      if (user_id == null) {
        Alert.alert('User Does Not Exist in Database');
      } else {
        let identity = {user_id: user_id, isFinder: 0};
        this.updateFCMDeviceToken(identity.user_id);
        this.handleLogin(identity);
        this.props.navigation.navigate('HomePage', identity);
      }
    }
  }

  handleLogin = async () => {
    if (this.state.email == null || this.state.password == null) {
      Alert.alert('Login Information cannot be empty, plese try again');
      this.props.navigation.navigate('Login');
      this.setState({email: null, password: null});
    } else {
      try {
        let result = await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
        if (result) {
          let uid = result['user']['uid'];

          return uid;
        }
      } catch (e) {
        switch (e.code) {
          //The provided value for the email user property is invalid. It must be a string email address.
          //Invalid input example: cpen321321, 091e10
          case 'auth/invalid-email':
            Alert.alert(
              'Invalid email, please check if your account is correct',
            );
            break;

          //The provided value for the password user property is invalid. It must be a string with at least six characters.
          case 'auth/wrong-password':
            Alert.alert(
              'Wrong password, please check if your password is correct',
            );
            break;
        }

        return -1;
      }
    }
  };

  getUserId = async (uid) => {
    //access the databse to get the user_id based on firebase uid
    const url = `http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/user/getUserIdNumber/${uid}`;
    // let body = JSON.stringify({uid:uid});
    const result = await fetch(url, {
      method: 'GET',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    });

    //get the user_id successfully
    if (result.status == 201 || result.status == 200) {
      const data = await result.json();
      console.log(data);
      return data;
    } else {
      //if not, return null
      return null;
    }
  };

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
            value={this.state.email}
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
            value={this.state.password}
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

        <TouchableOpacity onPress={() => this.handleSignup()}>
          <Text style={styles.signup}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginScreen;
