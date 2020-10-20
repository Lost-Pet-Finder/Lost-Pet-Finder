import React,{Component} from 'react';
import 'react-native-gesture-handler';

import{StyleSheet, View, Text, Image, Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { withNavigation } from 'react-navigation';

const options={
    takePhotoButtonTitle:'Take Photos',
    chooseFromLibraryButtonTitle:'Photo Gallery',
}

class FindScreen extends Component{
 
    // pressHandler=()=>{
    //     navigation.goBack();
    // }

    constructor(props){
        super(props);
        this.state={
            avatarSource: null
        }
    }

    getSelectedImages(image){
        if(image[0]){
            alert(image[0].uri);
        }
    }


    myfun=()=>{
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              //const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source,
              });
            }
          });
    }

    render(){
        return (
            <View style={styles.container}>
                {/* <CameraRollPicker callBack={this.getSelectedImages}/> */}
                <Image source={this.state.avatarSource}
                 style={{width:200, height:200, padding:10}}/>

                <TouchableOpacity style={styles.SearchButton} onPress={this.myfun} >
                    <Text style={styles.loginText}>I lost my pet</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.SearchButton} onPress={this.props.goBack()} >
                    <Text style={styles.loginText}>I lost my pet</Text>

                </TouchableOpacity>
    
                <TouchableOpacity style={styles.ReportButton} onPress={pressHandler} >
                    <Text style={styles.loginText}>I found a pet</Text>
    
                </TouchableOpacity> */}
                
            </View>
        )
    }

    
}

export default withNavigation(FindScreen);

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#BBDEFB',
      alignItems: 'stretch',
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

    SearchButton: {
        alignSelf: 'center',
        padding: 12,
        backgroundColor: '#2196F3',
        borderRadius: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
      },
    
    ReportButton: {
        alignSelf: 'center',
        padding: 12,
        backgroundColor: '#2196F3',
        borderRadius: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
      },
    
  });
  
  