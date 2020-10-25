import 'react-native-gesture-handler';
import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';

class LoginScreen extends React.Component{
  constructor(props){
    super(props);
  }

  // setEmail(email){
  //   const [email, setEmail] = useState();
  // }
  
  // setpwd(password){
  //   const [password, setPassword] = useState();
  // }
  
  parseFinder=()=>{
    this.props.navigation.navigate('ReportFoundPage',  { 
      user_id: '1' });
    
  }

  parseLoser=()=>{
    this.props.navigation.navigate('ReportLostPage', {
      user_id:'2'});
  }

  render(){
    //console.log(JSON.stringify(this.props));
    return (
      
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/logo.png')}></Image>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            //labelValue={email}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            //onChangeText={(email) => setEmail(email)}
          />
        </View> 

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            //labelValue={password}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            //onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={()=>this.parseFinder()} >
         
          <Text style={styles.loginText}>Sign in as finder</Text>
  
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={()=>this.parseLoser() } >
         
          <Text style={styles.loginText}>Sign in as loser</Text>
  
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
});

