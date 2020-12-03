import React from 'react';
import 'react-native-gesture-handler';
import styles from './styles';
import {
  Button,
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
} from 'react-native';

const pet_text = "Pet's Information";

export default class BrowseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      petArray: null,
      user_id: this.props.navigation.state.params.user_id,
      isFinder: this.props.navigation.state.params.isFinder,
      addressArr: [],
    };
  }

  async componentDidMount() {
    const url =
      this.state.isFinder === 0
        ? `http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/pets/searchFoundPets/${this.state.user_id}`
        : `http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/pets/searchLostPets/${this.state.user_id}`;

    console.log(url);

    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, request);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    this.setStateFunction(data);


    await this.populateAddressArr();

    this.setState({loading: false});
  }

  setStateFunction(data) {
    this.setState({petArray: data});
  }

  async convertToAddress(latitude, longitude) {
    console.log(`Lat: ${latitude}, lon: ${longitude}`);
    const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + latitude + "," + longitude + "&key=" + "AIzaSyBk1oSy9YTS0SjTxnHiznhPyQpai8mgJh8")

    const data = await response.json();
    console.log(data);

    if (data.results.length == 0) {
      return `No Address: (${latitude}, ${longitude})`;
    } else {
      return data.results[0].formatted_address;
    }
  }

  async populateAddressArr() {
    for (var i = 0; i < this.state.petArray.length; i++) {
      const report = this.state.petArray[i].report;
      console.log(report);
      const address = await this.convertToAddress(report.location_x, report.location_y);
      console.log(`Address: ${address}`);
      this.state.addressArr[i] = address;
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!this.state.petArray) {
      return (
        <View style={styles.container}>
          <Text>didn't get a post</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.browse_container}>
        <ScrollView style={styles.scrollView} testID={'BrowseView_detox'} contentContainerStyle={styles.scrollViewCellContainer}>
          {this.state.petArray.map((pet, index) => {
            const petReport = pet.report;

            const date = new Date(petReport.report_date);

            var options = {
              timeZone: 'America/New_York', 
              hour12: true,
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            };
            
            console.log(date);

            const dateString = date.toLocaleString('en-US');

            return (
              <View style={styles.scrollViewCell} testID={'ScrollViewCell_detox'} key={index}>
                <Text style={styles.titleText}> {`Similarity: ${((pet['total score']*100 / 4)).toFixed(0)+'%'}`} </Text>
                <View style={styles.imageAndTextContainer}>
                  <Image
                    source={{
                      uri: `https://lostpetpictures.s3-us-west-2.amazonaws.com/${petReport.file_name}`,
                    }}
                    style={styles.imageView}
                  />
                  <View style={styles.detailsView}>
                    <View style={{width: '100%'}}>
                      <Text style={styles.rateTitleText}>Address: </Text>
                      <Text style={styles.rateText}>{`${this.state.addressArr[index]}`}</Text>
                      <Text style={styles.rateTitleText}>Reported: </Text>
                      <Text style={styles.rateText}>{`${dateString}`}</Text>
                      <Button style={styles.buttonStyle} testID={'learnmore_detox'}
                        title="Learn More"
                        onPress={() => this.props.navigation.navigate('ContactOwnerScreen', {petInfo: this.state.petArray[index], address: this.state.addressArr[index], dateString: dateString})}
                      />
                    </View>
                    
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
