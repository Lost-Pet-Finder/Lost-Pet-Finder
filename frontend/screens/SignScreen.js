import 'react-native-gesture-handler';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import React from 'react';
import styles from './styles';
import { firebase } from '@react-native-firebase/messaging';
//import { post } from '../../backend/src/routers/userRouter';

class SignScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_email: '',
      new_pwd: '',
      isLoading: false
    }
  }

  async createUser(){
    if (this.state.new_pwd === '' && this.state.new_pwd === '') {
      Alert.alert('Sign up information incomplete, please complete the procedure');
    } else {
      // create new user 
      this.setState({ isLoading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.new_email, this.state.new_pwd)
        .then((res) => {
          console.log("User created successfully " + JSON.stringify(res));
          this.setState({
            new_email: '',
            new_pwd: '',
            isLoading: false
          })
          let uid = res["user"]["uid"];

          //this.createNewUser(uid);

          const url = 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/user/createNewUser';

          //get the firebase UID from response and generate unique user id for each user
          let body = JSON.stringify(
            {
              uid: uid,
              user_id: parseInt(Date.now()),
            });

          fetch(url,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: body
            }).then((response)=>{
              if (response.status == 201 || response.status == 200) {
                console.log("user created in the database");
                this.props.navigation.navigate('LoginPage');
              }
            })
          })
        
    }
  }

  // createNewUser= async(uid) => {
  //   const url = 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/user/createNewUser';

  //   //get the firebase UID from response and generate unique user id for each user
  //   let body = JSON.stringify(
  //     {
  //       uid: uid,
  //       user_id: parseInt(Date.now()),
  //     });

  //   const response = await fetch(url,
  //     {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: body
  //     })

  //   if(response.status == 201 || response.status == 200){
  //     console.log("user created in the database");
  //     this.props.navigation.navigate('LoginPage');
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholderTextColor="#003f5c"
            placeholder="Enter email address"
            onChangeText={(email_input) => this.setState({ new_email: email_input })}
            value={this.state.new_email} />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholderTextColor="#003f5c"
            placeholder="Enter password"
            onChangeText={(pwd_input) => this.setState({ new_pwd: pwd_input })}
            value={this.state.new_pwd} />
        </View>

        <TouchableOpacity
          onPress={() => this.createUser()}
          style={styles.loginButton}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

export default SignScreen;