import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Button, View, Text, Image, FlatList} from 'react-native';

export default class BrowseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, petArray: null};
  }

  // componentDidMount() {
  //   this.timer = setInterval(() => this.getAllPosts(), 3000);
  // }

  async componentDidMount() {
    // {
    // "message": [{http/sdfsdf} , "http/sdfsdfdsf", "http/sdfsdfdsf"],
    //  "status":"success"
    //}
    const url = 'http://10.0.2.2:6464/pets/searchLostPets';
    // const breed = 'bulldog';

    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   userid : "sdfsdf",
      //   bucket : "lostpet",
      //   date : 10,
      //   filename: "sdfsdf",
      //   location : "sdfsdf",
      // }),
    };

    const response = await fetch(url, request);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
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
        <View style={style.container}>
          <Text>didn't get a post</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {this.state.petArray.map((pet) => {
          // return <Image source={{uri: `${pet}`}} style={styles.image}></Image>;
          // https://lostpetpictures.s3-us-west-2.amazonaws.com/s3/user1_lost.png
          const something = [
            <Text style = {styles.headerText}>basic info:</Text>,
            <Text style = {styles.textStyle}>{`date reported: ${pet.report_date}`}</Text>,
            <Text style = {styles.textStyle}>{`location reported: (${pet.location_x},${pet.location_y})`}</Text>,
            <Image source={{uri:`https://lostpetpictures.s3-us-west-2.amazonaws.com/${pet.file_name}`}} style = {styles.image}></Image>,            
          ]
          return something
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#BBDEFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperbox: {
    flex: 8,
    flexWrap: 'wrap',
    backgroundColor: '#BBDEFB',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  lowerbox: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#BBDEFB',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  SearchButton: {
    flex: 1,
    alignSelf: 'center',
    padding: 12,
    backgroundColor: '#2196F3',
    borderRadius: 25,
    height: 45,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 80,
  },
  ReportButton: {
    flex: 1,
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
  textStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 16,
    padding: 2,
  },
  headerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 20,
    padding: 2,
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
    marginBottom: 20,
    width: 140,
    height: 140,
  },
});
