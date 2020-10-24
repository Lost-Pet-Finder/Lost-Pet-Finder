import React,{Component} from 'react';
import 'react-native-gesture-handler';

import{StyleSheet, View, Text, Image, Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { withNavigation } from 'react-navigation';
import {RNS3} from 'react-native-aws3'

const options ={
    takePhotoButtonTitle:'Take Photos',
    chooseFromLibraryButtonTitle:'Photo Gallery',
}

class FindScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={avatarSource: null};
    }
    
    // getSelectedImages(image){
    //     if(image[0]){
    //         alert(image[0].uri);
    //     }
    // }

    //get photo from photo gallery
    getPhoto(){
        ImagePicker.showImagePicker(options, (response) => {
            //don't need to print out the response for now
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
        
              // You can also display the image using data:
              //const source = { uri: 'data:image/jpeg;base64,' + response.data };
              
              // send images to S3
              const file = {
                uri: response.uri,
                name: response.fileName,
                type: 'image/png'
              }
              console.log(file);
              const config = {
                keyPrefix : 's3/',
                bucket: 'lostpetpictures',
                region: 'us-west-2',
                accessKey: 'AKIAJ5OYQDSWAJXXAVFQ',
                secretKey: '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',
                successActionStatus:201
              }
              RNS3.put(file, config)
              .then((response)=>{
                console.log(response);
              })
              // post a post
              this.setState({
                avatarSource: source,
              });
            }
          });
    }

    render(){
        console.log(JSON.stringify(this.props));
        return (
            <View style={styles.container}>
                {/* <CameraRollPicker callBack={this.getSelectedImages}/> */}
                <View style={styles.upperbox}>
                  <Image source={this.state.avatarSource} style={styles.photolist}/>
                </View>
              

                <View style={styles.lowerbox}>
                    <TouchableOpacity style={styles.SearchButton} onPress={() => this.getPhoto()} >
                      <Text style={styles.textStyle}>Upload Photos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.SearchButton} onPress={() => this.props.navigation.navigate('BrowsePetPage')} >
                      <Text style={styles.textStyle}>Go Back</Text>
                    </TouchableOpacity>
                </View>
                
    
                {/*<TouchableOpacity style={styles.ReportButton} onPress={pressHandler} >
                    <Text style={styles.loginText}>I found a pet</Text>
    
                </TouchableOpacity> */}
                
            </View>
        )
    }

    
}

export default FindScreen;

const styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#BBDEFB',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    upperbox:{
      flex:8,
      flexWrap:'wrap',
      backgroundColor:'#BBDEFB',
      alignItems:'stretch',
      justifyContent:'center',
    },
    lowerbox:{
      flex:2,
      flexDirection:'row',
      backgroundColor:'#BBDEFB',
      alignItems:'stretch',
      justifyContent:'center',
    },
    photolist: {
        width:200,
        height:200,
        padding:10,
    }, 
    SearchButton: {
      flex:1,
      alignSelf: 'center',
      padding: 12,
      backgroundColor: '#2196F3',
      borderRadius: 25,
      height: 45,
      justifyContent: 'center',
      marginHorizontal:20,
      marginVertical:80,
    },
    ReportButton: {
      flex:1,
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
    textStyle:{
      textAlign:'center',
      textAlignVertical:'center',
      color: '#fff',
      fontSize: 16,
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
  
  