import React from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
} from 'react-native';

const pet_text = "Pet's Name";

export default class BrowseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      petArray: null,
      user_id: this.props.navigation.state.params.user_id,
      isFinder: this.props.navigation.state.params.isFinder
    };
  }

  async componentDidMount() {
    const url = this.state.isFinder === 0 ?
      'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/pets/searchFoundPets' :
      'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/pets/searchLostPets';

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
    //this.setState({petArray: data, loading: false});
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
        <View style={style.container}>
          <Text>didn't get a post</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewCellContainer}>
          {this.state.petArray.map((pet, index) => {
            return (
              <View style={styles.scrollViewCell} key={index}>
                <Text style={styles.titleText}> `${pet_text}` </Text>
                <View style={styles.imageAndTextContainer}>
                  <Image source={{ uri: `https://lostpetpictures.s3-us-west-2.amazonaws.com/${pet.information.file_name}` }} style={styles.imageView}></Image>
                  <View style={styles.detailsView}>
                    <Text>{`Reporter ID: ${pet.information.fk_user_id}`}</Text>
                    <Text>{`Location: (${pet.information.location_x}, ${pet.information.location_y})`}</Text>
                    <Text>{`Report Date: \n${pet.information.report_date}`}</Text>
                    <Button title="Learn More" onPress={() => this.props.navigation.navigate('ContactOwnerScreen', { petInfo: this.state.petArray[index] })}></Button>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  scrollViewCellContainer: {
  },
  scrollViewCell: {
    backgroundColor: '#BBDEFB',
    marginBottom: 10,
    borderRadius: 15,
  },
  titleText: {
    marginLeft: 20,
    fontSize: 20,
    textAlign: 'left',
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
});
