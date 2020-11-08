import React from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
//import { useEffect } from 'react';

// FCM
import messaging from '@react-native-firebase/messaging';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.navigation.state.params.user_id,
            isFinder: this.props.navigation.state.params.isFinder
        };
    }

    componentDidMount() {
        this.setupForegroundNotifications();
        console.log(`State: ${this.state.user_id}`);
    }

    async setupForegroundNotifications() {
        // register foreground handler
        const unsubscribeFore = messaging().onMessage(remoteMessage => {
            Alert.alert(
                `${remoteMessage.notification.title}`,
                `${remoteMessage.notification.body}`);
        });

        return unsubscribeFore;
    }

    render() {
        return (
            <View style={styles.containerView} testID={'HomePage_detox'}>
                <TouchableOpacity
                    style={styles.reportView}
                    onPress={() => {
                        this.props.navigation.navigate('ReportScreen',
                            {
                                user_id: this.state.user_id,
                                isFinder: this.state.isFinder
                            });
                    }}
                >
                    <View>
                        <Text style={styles.viewTitle}>📸 Report 📸</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.browseView}
                    onPress={() => {
                        this.props.navigation.navigate('BrowseScreen',
                            {
                                user_id: this.state.user_id,
                                isFinder: this.state.isFinder
                            });
                    }}
                >
                    <View>
                        <Text style={styles.viewTitle}>🔎 Browse 🔍</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.contactView}
                    onPress={() => {
                        console.log('go to contact page');
                    }}
                >
                    <View>
                        <Text style={styles.viewTitle}>📱 Contact 📱</Text>
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
        alignItems: "center",
        backgroundColor: "#BBDEFB"
    },
    reportView: {
        backgroundColor: '#22577A',
        height: "30%",
        width: "90%",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    browseView: {
        backgroundColor: '#2F8789',
        height: "30%",
        width: "90%",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    contactView: {
        backgroundColor: '#2E8B57',
        height: "30%",
        width: "90%",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    viewTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    }
});