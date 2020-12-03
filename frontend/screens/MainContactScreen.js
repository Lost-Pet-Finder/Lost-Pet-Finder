import React from 'react';
import 'react-native-gesture-handler';
import {
  Button,
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class MainContactScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.containerView}>
        <TouchableOpacity
          style={styles.reportView}
          testID={'Pending_detox'}
          onPress={() => {
            this.props.navigation.navigate('DetailsContactScreen', {
              screenType: 'pending',
              requestUrl: `http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/notif/pendingRequests`,
              user_id: this.props.navigation.state.params.user_id,
            });
          }}>
          <View>
            <Text style={styles.viewTitle}>Pending Requests</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.browseView}
          testID={'Sent_detox'}
          onPress={() => {
            this.props.navigation.navigate('DetailsContactScreen', {
              screenType: 'sent',
              requestUrl: `http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/notif/sentRequests`,
              user_id: this.props.navigation.state.params.user_id,
            });
          }}>
          <View>
            <Text style={styles.viewTitle}>My Sent Requests</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#BBDEFB',
  },
  reportView: {
    backgroundColor: '#22577A',
    height: '30%',
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseView: {
    backgroundColor: '#2F8789',
    height: '30%',
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactView: {
    backgroundColor: '#2E8B57',
    height: '30%',
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});
