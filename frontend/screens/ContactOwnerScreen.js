import React from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  Text,
  Image} from 'react-native';
import {rgbToHex} from '../util/rgbToHex';


export default class ContactOwnerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pet: this.props.navigation.state.params.petInfo,
      totalColor: this.props.navigation.state.params.petInfo.colours.totalColor,
      croppedColor: this.props.navigation.state.params.petInfo.colours.croppedColor,
      finalColor: this.props.navigation.state.params.petInfo.colours.finalColor
    };
  }

  render(){
      return (
      <View style={styles.container}>
        <Text style={styles.titleText}> Pet's Name </Text>
        <View style={styles.imageAndTextContainer}>
          <Image source={{uri:`https://lostpetpictures.s3-us-west-2.amazonaws.com/${this.state.pet.information.file_name}`}} style = {styles.imageView}></Image>
          <View style={styles.detailsView}>
            <Text>{`Reporter ID: ${this.state.pet.information.fk_user_id}`}</Text>
            <Text>{`Location: (${this.state.pet.information.location_x}, ${this.state.pet.information.location_y})`}</Text>
            <Text>{`Report Date: \n${this.state.pet.information.report_date}`}</Text>
          </View>
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.aiTags}>{`AI Generated Tags:`}</Text>
          <Text style={styles.infoText}>{`${this.state.pet.information.tags}`}</Text>
        </View>
        
        <View style={styles.horizontalFlexContainer}>
          <View style={styles.colorUnit}>
            <View style={[styles.colorBox, {backgroundColor: rgbToHex(this.state.totalColor[0], this.state.totalColor[1], this.state.totalColor[2])}]}></View>
            <Text style={styles.colorText}>Overall Color</Text>
          </View>

          <View style={styles.colorUnit}>
            <View style={[styles.colorBox, {backgroundColor: rgbToHex(this.state.croppedColor[0], this.state.croppedColor[1], this.state.croppedColor[2])}]}></View>
            <Text style={styles.colorText}>Cropped Color</Text>
          </View>

          <View style={styles.colorUnit}>
            <View style={[styles.colorBox, {backgroundColor: rgbToHex(this.state.finalColor[0], this.state.finalColor[1], this.state.finalColor[2])}]}></View>
            <Text style={styles.colorText}>Final Color</Text>
          </View>
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  viewContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  horizontalFlexContainer: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  colorUnit: {
    alignItems: 'center',
    width: '30%',
  },
  colorBox: {
    backgroundColor: '#000000',
    height: '50%',
    width: '100%',
  },
  colorText: {
    fontSize: 18
  },
  imageAndTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageView: {
    width: 140,
    height: 140,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  aiTags: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
  }
})