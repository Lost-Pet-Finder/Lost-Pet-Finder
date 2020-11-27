import 'react-native-gesture-handler';
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
import React from 'react';  
import { firebase } from '@react-native-firebase/messaging';

class SignScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_email: '',
            new_pwd: '',
            isLoading: false
        }
    }

    createUser() {
        if(this.state.new_pwd === '' && this.state.new_pwd === ''){
            Alert.alert('Sign up information incomplete, please complete the procedure');
        } else{
            this.setState({isLoading: true});
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
                this.props.navigation.navigate('LoginPage')
            }).catch((e)=>{
                console.log(e);
            });

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholderTextColor="#003f5c"
                        placeholder="Enter email address"
                        onChangeText={(email_input)=>this.setState({new_email: email_input})}
                        value = {this.state.new_email}/>
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholderTextColor="#003f5c"
                        placeholder="Enter password"
                        onChangeText={(pwd_input)=>this.setState({new_pwd: pwd_input})}
                        value = {this.state.new_pwd}/>
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
  