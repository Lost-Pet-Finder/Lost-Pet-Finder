import React,{Component} from 'react';
import 'react-native-gesture-handler';

import{StyleSheet, View, Text, Modal, Image, TextInput,Button, TouchableOpacity, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
//import CameraRollPicker from 'react-native-camera-roll-picker';
import { withNavigation } from 'react-navigation';
import {RNS3} from 'react-native-aws3'

const options ={
    takePhotoButtonTitle:'Take Photos',
    chooseFromLibraryButtonTitle:'Photo Gallery',
}

export default class ReportScreen extends React.Component {

    constructor(props){
        super(props);

        this.state={
          user_id: this.props.navigation.state.params.user_id,
          isFinder: this.props.navigation.state.isFinder,

          avatarSource: null,
          filename: null,
          loc_x: null,
          loc_y: null,
          date: null,
          bucket: 'lostpetpictures',

          didUploadPicture: false
        };
    }

    componentDidMount() {
    }

    //submit the report
    submit() {
      const url = this.state.isFinder == 0 ? 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/pets/postLostPets': 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/pets/postFoundPets';

      if (this.state.didUploadPicture == false) {
        Alert.alert('Upload Picture First!', 'You need to provide a picture of your pet so we can run AI/ML image recognition');
        return;
      }

      if (this.state.user_id == null || this.state.filename == null || this.state.loc_x == null || this.state.loc_y == null || this.state.date == null) {
        Alert.alert('Incomplete Submission!', 'Please make sure you fill in all the fields and upload a picture');
        console.log(this.state);
        return;
      }

      let body = JSON.stringify(
          { userid: this.state.user_id,
            filename: this.state.filename,
            location_x: this.state.loc_x,
            location_y: this.state.loc_y,
            date: this.state.date,
            bucketName: this.state.bucket,   
          });

      this.postToNodeServer(body, url);

      return;
    }

    async postToNodeServer(body, url) {
      console.log(`Calling API Endpoint: ${url}`);

      const response = await fetch(url, 
        {
            method:'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: body
        })

        if (response.status == 201 || response.status == 200) {
          const json = await response.json();

          console.log(json);

          Alert.alert('Report Submitted!', `Tags Generated: ${json[0].tags}`, [
            { text: "OK", onPress: () => this.props.navigation.navigate("HomePage") }
          ]);
        }
    }



    // get photo from photo gallery
    getPhoto() {
        ImagePicker.showImagePicker(options, (response) => 
        {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              this.uploadPhotoToS3(response);
            }
        })
    }

    async uploadPhotoToS3(imagePickerResponse) {
      const source = { uri: imagePickerResponse.uri };
      var photo_str =  `${imagePickerResponse.fileName}`;
      this.setState({filename: photo_str});
    
      // send images to S3
      const file = {
        uri: imagePickerResponse.uri,
        name: this.state.filename,
        type: 'image/png'
      }

      const config = {
        bucket: 'lostpetpictures',
        region: 'us-west-2',
        accessKey: 'AKIAJ5OYQDSWAJXXAVFQ',
        secretKey: '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',
        successActionStatus:201
      }
      const response = await RNS3.put(file, config);

      if (response.status == 201 || response.status == 200) {
        this.setState({
          didUploadPicture: true
        });
      }

      this.setState({
        avatarSource: source,
      });
    }

    

    render(){        
        return (
            <View style={styles.container}>

              <View style={styles.imageWrapper}>
                <Image source={this.state.avatarSource} style={styles.photolist}/>
              </View>
              

              <TextInput 
              style={styles.textInputField} 
              placeholder="Longitude: -180 to 180" 
              onChangeText={(value)=>this.setState({loc_x:value})}
              value={this.state.loc_x}
              ></TextInput>

              <TextInput 
              style={styles.textInputField} 
              placeholder="Latitude: -180 to 180" 
              onChangeText={(value)=>this.setState({loc_y:value})}
              value={this.state.loc_y}
              ></TextInput>

              <TextInput 
              style={styles.textInputField} 
              placeholder="Date: (yyyy-mm-dd hr-min)" 
              onChangeText={(value)=>this.setState({date:value})}
              value={this.state.date}
              ></TextInput>

              <TouchableOpacity style={styles.SearchButton} onPress={() => this.getPhoto()} >
                  <Text style={styles.textStyle}>Upload Photos</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.SearchButton} onPress={()=>this.submit()}>
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#BBDEFB',
      alignItems: 'baseline',
      justifyContent: 'center',
    },
    imageWrapper: {
      width: "100%",
      height: 200,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    photolist: {
      width: 200,
      height: 200
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
      marginVertical: 50,
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
    textInputField: {
      fontSize: 30,
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
    image: {
      marginBottom: 40,
      width: 120,
      height: 120,
      resizeMode: 'cover',
    },
  });
  