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
    };
  }

  async componentDidMount() {
    const url =
      this.state.isFinder === 0
        ? 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/pets/searchFoundPets'
        : 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/pets/searchLostPets';

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
  }

  setStateFunction(data) {
    this.setState({petArray: data, loading: false});
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
            return (
              <View style={styles.scrollViewCell} testID={'ScrollViewCell_detox'} key={index}>
                <Text style={styles.titleText}> {pet_text} </Text>
                <View style={styles.imageAndTextContainer}>
                  <Image
                    source={{
                      uri: `https://lostpetpictures.s3-us-west-2.amazonaws.com/${pet.information.file_name}`,
                    }}
                    style={styles.imageView}
                  />
                  <View style={styles.detailsView}>
                    <Text>{`Reporter ID: ${pet.information.fk_user_id}`}</Text>
                    <Text>{`Location: (${pet.information.location_x}, ${pet.information.location_y})`}</Text>
                    <Text>{`Report Date: \n${pet.information.report_date}`}</Text>
                    <Button testID={'learnmore_detox'}
                      title="Learn More"
                      onPress={() => this.props.navigation.navigate('ContactOwnerScreen', {petInfo: this.state.petArray[index]})}
                    />
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
