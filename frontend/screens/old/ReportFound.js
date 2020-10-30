import React,{Component} from 'react';
import 'react-native-gesture-handler';

import{StyleSheet, View, Text, Modal, Image, TextInput,Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { withNavigation } from 'react-navigation';
import {RNS3} from 'react-native-aws3'

const options ={
    takePhotoButtonTitle:'Take Photos',
    chooseFromLibraryButtonTitle:'Photo Gallery',
}

class ReportFoundScreen extends React.Component{

    constructor(props){
        super(props);

        this.state={
          avatarSource: null,
          show:false,
          user_id:null,
          name:null,
          filename:null,
          loc_x:null,
          loc_y:null,
          date:null,
          bucket: 'lostpetpictures',
        };

        this.status=(this.state.user_id == 1 ? 'found': 'lost');
    }

    //submit the report
    submit(){
      const url = 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/pets/postFoundPets';
      this.setState({show:false,
                    });

      let body = JSON.stringify(
          { userid:this.state.user_id,
            filename:this.state.filename,
            location_x:this.state.loc_x,
            location_y:this.state.loc_y,
            date:this.state.date,
            bucketName: this.state.bucket,   
           });

      return fetch(url, {
        method:'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body
        })
        .then((response)=> response.text())
        .then((responseJson)=>{
          console.log(responseJson)
          return responseJson
        })
    }

    //get photo from photo gallery
    getPhoto(){
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
              var photo_str =  `${response.fileName}`;
              this.setState({filename:photo_str});

              // You can also display the image using data:
              //const source = { uri: 'data:image/jpeg;base64,' + response.data };
            
              // send images to S3
              const file = {
                uri: response.uri,
                name: this.state.filename,
                type: 'image/png'
              }
             //console.log(this.state.filename);
              const config = {
                bucket: 'lostpetpictures',
                region: 'us-west-2',
                accessKey: 'AKIAJ5OYQDSWAJXXAVFQ',
                secretKey: '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',
                successActionStatus:201
              }
              RNS3.put(file, config)
              .then((response)=>{
                //console.log(response);

              })
              // post a post

              this.setState({
                avatarSource: source,
              });
            }
          });
    }

    firebaseTest() {
      console.log('Button pressed')
    }

    render(){
        console.log(JSON.stringify(this.props));
        
        return (
            <View style={styles.container}>
                {/* <CameraRollPicker callBack={this.getSelectedImages}/> */}
                <View style={styles.upperbox}>
                  
                </View>

                <Button 
                  onPress={() => {
                    this.firebaseTest()
                  }}
                  title="Firebase Test"
                />
              

                <View style={styles.lowerbox}>
                    {/* <TouchableOpacity style={styles.SearchButton} onPress={() => this.getPhoto()} >
                      <Text style={styles.textStyle}>Upload Photos</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.SearchButton} onPress={()=>
                    this.setState({
                        show:true,
                        user_id:this.props.navigation.state.params.user_id,
                        })}>
                      <Modal style={{flex:1}} transparent={true} visible={this.state.show} flexDirection='column'>
                        <View style={{backgroundColor:"#000000aa", flex:1}}>
                          <View style={{backgroundColor:"#ffffff", margin:50, padding:40, borderRadius:10}}>
                            
                            <Image source={this.state.avatarSource} style={styles.photolist}/>
                          
                            <TextInput 
                            style={{fontSize:30}} 
                            placeholder="Stree address" 
                            onChangeText={(value)=>this.setState({loc_x:value})}
                            value={this.state.loc_x}
                            ></TextInput>

                            <TextInput 
                            style={{fontSize:30}} 
                            placeholder="City" 
                            onChangeText={(value)=>this.setState({loc_y:value})}
                            value={this.state.loc_y}
                            ></TextInput>

                            <TextInput 
                            style={{fontSize:30}} 
                            placeholder="Date" 
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
                        </View>
                      </Modal>
                      <Text style={styles.textStyle}>Report Found</Text>
                    </TouchableOpacity>
                    
                    {/* <TouchableOpacity style={styles.SearchButton} onPress={() => this.getPhoto()} >
                      <Text style={styles.textStyle}>Upload Photos</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={styles.SearchButton} onPress={() => this.props.navigation.navigate('BrowsePetPage', {user_type : "lost"})} >
                      <Text style={styles.textStyle}>Browse Posts</Text>
                    </TouchableOpacity>
                </View>
                
    
                {/*<TouchableOpacity style={styles.ReportButton} onPress={pressHandler} >
                    <Text style={styles.loginText}>I found a pet</Text>
    
                </TouchableOpacity> */}
                
            </View>
        )
    }

    
}

export default ReportFoundScreen;

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
      marginVertical:50,
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
  
  