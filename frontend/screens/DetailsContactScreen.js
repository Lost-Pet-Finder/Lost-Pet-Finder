import React from 'react';
import 'react-native-gesture-handler';
// import styles from './styles';
import {
  Button,
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';

export default class DetailsContactScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenType: this.props.navigation.state.params.screenType,
            user_id: this.props.navigation.state.params.user_id,
            requestUrl: this.props.navigation.state.params.requestUrl,
            
            loading: true,
            contactsArr: null,
        };
      }
    
      componentDidMount() {    
        this.getContactsList();
      }

      async getContactsList() {
        const request = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        };
    
        const response = await fetch(`${this.state.requestUrl}/${this.state.user_id}`, request);
        // console.log(response.status);
        const data = await response.json();
        // console.log(data);
        this.setStateFunction(data);
      }
    
      setStateFunction(data) {
        this.setState({contactsArr: data, loading: false});
      }

      async respondToContactRequest(targetId, didAccept) {
        const baseUrl = 'http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/notif/respondToContactRequest';
        const body = {
          userid: parseInt(this.state.user_id),
          requesterid: targetId,
          accepted: didAccept
        }

        const request = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        };

        console.log(request);

        const response = await fetch(baseUrl, request);
        // const data = await response.json();
        console.log(await response.text());

        await this.getContactsList();
      }
    
      render() {

        if (this.state.loading) {
          return (
            <View style={styles.container}>
              <Text>Loading...</Text>
            </View>
          );
        }
    
        if (!this.state.contactsArr) {
          return (
            <View style={styles.container}>
              <Text>didn't get a post</Text>
            </View>
          );
        }

        if (this.state.screenType == 'sent') {
            // My Sent Requests Screen
            return (
                <SafeAreaView style={styles.browse_container}>
                  <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewCellContainer}>
                    {this.state.contactsArr.map((contact, index) => {
                      const showContactInfo = contact.did_accept; 
                      const status = showContactInfo == 0 ? 'Pending' : 'Accepted';
      
                      const cellStyle = {
                          backgroundColor: showContactInfo == 0 ? '#F08080' : '#90EE90',
                          margin: 10,
                          borderRadius: 15,
                      };
                      return (
                        <View style={cellStyle} key={index}>
                          <Text style={styles.titleText}> {`${contact.first_name} ${contact.last_name}`}</Text>
                          <View style={styles.detailsView}>
                              <Text>{`Status: ${status}`}</Text>
                              <Text>{showContactInfo == 0 ? `` : `Email: ${contact.email == null ? 'did not provide' : contact.email}`}</Text>
                              <Text>{showContactInfo == 0 ? `` : `Phone number: ${contact.phone_number == null ? 'did not provide' : contact.phone_number}`}</Text>
                          </View>
                      </View>
                      );
                    })}
                  </ScrollView>
                </SafeAreaView>
              );
        } else {
            // Pending Requests Screen
            return (
                <SafeAreaView style={styles.browse_container}>
                  <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewCellContainer}>
                    {this.state.contactsArr.map((contact, index) => {
                      const showContactInfo = contact.did_accept;
                      const status = showContactInfo == 0 ? 'Pending' : 'Accepted';
      
                      const cellStyle = {
                          backgroundColor: showContactInfo == 0 ? '#BBDEFB' : '#90EE90',
                          margin: 10,
                          borderRadius: 15,
                      };

                      if (showContactInfo == 0) {
                        return (
                          <View style={cellStyle} key={index}>
                            <Text style={styles.titleText}> {`${contact.first_name} ${contact.last_name}`}</Text>
                            <View style={styles.detailsView}>
                                <Text>{`Status: ${status}`}</Text>
                                <View style={styles.horizontalButtonView}>
                                  <Button color={'#90EE90'} title={`Accept`} onPress={
                                    () => {
                                      console.log(contact.fk_user_id);
                                      this.respondToContactRequest(contact.fk_user_id, true);
                                    }}></Button>
                                  <Button color={'#F08080'} title={`Decline`} onPress={
                                    () => {
                                      this.respondToContactRequest(contact.fk_user_id, false);
                                    }}></Button>
                                </View>
                            </View>
                        </View>
                        );
                      } else {
                        return (
                          <View style={cellStyle} key={index}>
                            <Text style={styles.titleText}> {`${contact.first_name} ${contact.last_name}`}</Text>
                            <View style={styles.detailsView}>
                                <Text>{`Status: ${status}`}</Text>
                                <Text>{showContactInfo == 0 ? `` : `Email: ${contact.email == null ? 'did not provide' : contact.email}`}</Text>
                                <Text>{showContactInfo == 0 ? `` : `Phone number: ${contact.phone_number == null ? 'did not provide' : contact.phone_number}`}</Text>
                            </View>
                        </View>
                        );
                      }
                    })}
                  </ScrollView>
                </SafeAreaView>
              );
        }
    
        
      }
}

const styles = StyleSheet.create({
    browse_container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        width: '100%',
    },
    scrollViewCellContainer: {},
    scrollViewCell: {
        backgroundColor: '#BBDEFB',
        margin: 10,
        borderRadius: 15,
    },
    titleText: {
        marginLeft: 20,
        fontSize: 20,
        textAlign: 'left',
    },
    imageView: {
        height: 140,
        marginHorizontal: 20,
        width: 140,
        marginBottom: 20,
    },
    imageAndTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
    },
    horizontalButtonView: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
      alignItems: 'center',
    }
})