import React from 'react';
import 'react-native-gesture-handler';
import {Button, View, Text, Image} from 'react-native';
import {rgbToHex} from '../util/rgbToHex';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const pet_text = "Pet's Information";

export default class ContactOwnerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pet: this.props.navigation.state.params.petInfo,
      // totalColor: this.props.navigation.state.params.petInfo.colours.totalColor,
      // croppedColor: this.props.navigation.state.params.petInfo.colours
      //   .croppedColor,
      // finalColor: this.props.navigation.state.params.petInfo.colours.finalColor,
    };
  }

  async contact(){
    //get the reporter's user id
    var id = this.state.pet.information.fk_user_id;
    const url = "http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/getUserContactInfo/" +  `${id}`;
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    //get the reporter's contact information
    let result = await fetch(url, request);
    if(result.status === 400){
      this.setState({contactInfo: 'Sorry, reporter rejects your contact request'});
    }
    else{
      this.setState({contactInfo: result.json()});
    }
  }

  printtags(arr){
    var tag = '';
    for(let i = 0; i < arr.length; i ++){
      tag += JSON.parse(arr)[i].Name + ",";
    }
    return tag;
  }

  render() {
    return (
      <View style={styles.contact_container} testID={'ContactScreen_detox'}>
        <Text style={styles.contact_titleText}> {pet_text} </Text>
        <View style={styles.imageAndTextContainer}>
          <Image
            source={{
              uri: `https://lostpetpictures.s3-us-west-2.amazonaws.com/${this.state.pet.information.file_name}`,
            }}
            style={styles.imageView}
          />
          <View style={styles.detailsView}>
            <Text>{`Reporter ID: ${this.state.pet.information.fk_user_id}`}</Text>
            <Text>{`Location: (${this.state.pet.information.location_x}, ${this.state.pet.information.location_y})`}</Text>
            <Text>{`Report Date: \n${this.state.pet.information.report_date}`}</Text>
          </View>
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.aiTags}>{'AI Generated Tags:'}</Text>
          <Text
            style={
              styles.infoText
            }>{`${this.printtags(this.state.pet.information.tags)}`}</Text>
        </View>

        {/* <Text>
            {"reporter contact information will be shown"}
        </Text> */}

        <TouchableOpacity style={styles.contactButton} testID={'ContactButton_detox'} onPress={() => this.contact()}>
            <Text style={styles.textStyle}>Contact reporter</Text>
          </TouchableOpacity>


        {/* <View style={styles.horizontalFlexContainer}>
          <View style={styles.colorUnit}>
            <View
              style={[
                styles.colorBox,
                {
                  backgroundColor: rgbToHex(
                    this.state.totalColor[0],
                    this.state.totalColor[1],
                    this.state.totalColor[2],
                  ),
                },
              ]}
            />
            <Text style={styles.colorText}>Overall Color</Text>
          </View>

          <View style={styles.colorUnit}>
            <View
              style={[
                styles.colorBox,
                {
                  backgroundColor: rgbToHex(
                    this.state.croppedColor[0],
                    this.state.croppedColor[1],
                    this.state.croppedColor[2],
                  ),
                },
              ]}
            />
            <Text style={styles.colorText}>Cropped Color</Text>
          </View>

          <View style={styles.colorUnit}>
            <View
              style={[
                styles.colorBox,
                {
                  backgroundColor: rgbToHex(
                    this.state.finalColor[0],
                    this.state.finalColor[1],
                    this.state.finalColor[2],
                  ),
                },
              ]}
            />
            <Text style={styles.colorText}>Final Color</Text>
          </View>
        </View> */}
      </View>
    );
  }
}
