import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Button, View, Text, Image, FlatList} from 'react-native';

export default class BrowseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, petArray: null};
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getAllPosts(), 3000);
  }

  async getAllPosts() {
    const url = 'https://dog.ceo/api/breeds/image/random/3';
    const breed = 'bulldog';
    const request = {
      // currently a GET request
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(breed),
    };
    const response = await fetch(url, request);
    const data = await response.json();
    this.setState({petArray: data.message, loading: false});
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text>loading.....</Text>
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
        {/* <Text>`${this.state.petArray}`</Text> */}
        {this.state.petArray.map((pet) => {
          return <Image source={{uri: `${pet}`}} style={styles.image}></Image>;
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
  photolist: {
    width: 200,
    height: 200,
    padding: 10,
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
    width: 160,
    height: 160,
    resizeMode: 'stretch',
  },
});
