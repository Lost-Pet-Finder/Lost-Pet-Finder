import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator
} from 'react-native';

import styles from './styles';

import { NavigationContainer } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { withNavigation } from 'react-navigation';
import { RNS3 } from 'react-native-aws3';

import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Callout } from 'react-native-maps';

const options = {
  takePhotoButtonTitle: 'Take Photos',
  chooseFromLibraryButtonTitle: 'Photo Gallery',
};

// Google Map
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0922;

export default class ReportScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.navigation.state.params.user_id,
      isFinder: this.props.navigation.state.isFinder,

      avatarSource: null,
      filename: null,
      lat: null,
      lon: null,
      date: null,
      bucket: 'lostpetpictures',

      didUploadPicture: false,

      // Google Maps
      //region: 'unknown',
      loading: true,
      // currentPosition: {
      //   latitude: 49.260605000000005,
      //   longitude: -123.24599333333332,
      //   latitudeDelta: 0,
      //   longitudeDelta: 0
      // },
      region: {
        latitude: 49.2606052,
        longitude: -123.2459939,
        latitudeDelta: 0,
        longitudeDelta: 0
      },

      isMapReady: false,
      userLocation: "",
      regionChangeProgress: false
    };

  }


  componentDidMount() {
    Geolocation.getCurrentPosition((position) => {
      console.log("Called");
      const current_pos = JSON.stringify(position);
      //this.setState({ region: current_pos });
      console.log("latitude is: " + position.coords.latitude);
      console.log("longitude is: " + position.coords.longitude);

      var coordination_info = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

      this.setState(
        {
          region: coordination_info,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          loading: false,
        });

    },
      (error) => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false,
        })
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
    );
  }


  onMapReady = () => {
    this.setState({ isMapReady: true, });
    //console.log(this.state.currentPosition)
  }

  fetchAddress = () => {
    console.log(this.state.region.latitude + ", " + this.state.region.longitude);
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + "AIzaSyBk1oSy9YTS0SjTxnHiznhPyQpai8mgJh8")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const userLocation = responseJson.results[0].formatted_address;
        console.log(userLocation);

        var change_coordination_info = {
          latitude: responseJson.results[0].geometry.location.lat,
          longitude: responseJson.results[0].geometry.location.lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        this.setState(
          {
            region: change_coordination_info,
            userLocation: userLocation,
            lat: responseJson.results[0].geometry.location.lat,
            lon: responseJson.results[0].geometry.location.lng,
            regionChangeProgress: false
          });
      });
  }

  onRegionChange = (region) => {
    this.setState({
      region,
      regionChangeProgress: true
    }, () => this.fetchAddress());
    //console.log(currentPosition);
  }

  onLocationSelect = () => alert(this.state.userLocation);

  //submit the report
  submit() {
    const url = this.state.isFinder == 0 ? 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/pets/postLostPets' : 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/pets/postFoundPets';

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
      {
        userid: this.state.user_id,
        filename: this.state.filename,
        location_x: this.state.lat,
        location_y: this.state.lon,
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
        method: 'POST',
        headers: {
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
    ImagePicker.showImagePicker(options, (response) => {
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
    var photo_str = `${imagePickerResponse.fileName}`;
    this.setState({ filename: photo_str });

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
      successActionStatus: 201
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

  render() {
    if (this.state.loading) {
      return (
        // Might change this page
        <View style={styles.report_container}>
          <Text>Loading</Text>
          <Text>{`${JSON.stringify(this.state.region)}`}</Text>

        </View>
      );
    } else {
      return (
        <View style={styles.report_container}>

          {/* photo part */}
          <View style={styles.imageWrapper}>
            <Image source={this.state.avatarSource} style={styles.report_image} />
          </View>

          {/* google map */}
          <View style={styles.mapcontainer} >
            {!!this.state.region.latitude && !!this.state.region.longitude &&
              <MapView
                style={{ flex: 1, }}
                initialRegion={this.state.region}
                showsUserLocation={true}
                onMapReady={this.onMapReady}
                onRegionChangeComplete={this.onRegionChange}
              >
                <MapView.Marker
                  coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                  title={"Your Location"}
                  draggable
                />
              </MapView>
            }

          </View>

          {/* google map dragger and info */}
          <View style={styles.detailSection}>
            <Text style={styles.move_style}>Move map for location</Text>
            <Text style={styles.loc_style}>LOCATION</Text>
            <Text numberOfLines={2} style={styles.identity_style}>
              {!this.state.regionChangeProgress ? this.state.userLocation : "Identifying Location..."}</Text>
          </View>

          <View style={styles.btnContainer}>
            <Button
              title="PICK THIS LOCATION"
              disabled={this.state.regionChangeProgress}
              onPress={this.onLocationSelect}
            >
            </Button>
          </View>

          {/* user input date */}
          <TextInput
            style={styles.textInputField}
            testID={'DateInput_detox'}
            placeholder="Date: (yyyy-mm-dd hr-min)"
            onChangeText={(value) => this.setState({ date: value })}
            value={this.state.date}
          ></TextInput>

          <View style={styles.buttonWrapper}>
            {/* upload photo button */}
            <TouchableOpacity style={styles.SearchButton} testID={'UploadButton_detox'} onPress={() => this.getPhoto()}>
              <Text style={styles.textStyle}>Upload Photos</Text>
            </TouchableOpacity>

            {/* submit report button */}
            <TouchableOpacity style={styles.SearchButton} testID={'Reportsubmit_detox'} onPress={() => this.submit()}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

