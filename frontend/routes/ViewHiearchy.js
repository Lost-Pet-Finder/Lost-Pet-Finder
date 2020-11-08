import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../screens/LoginScreen';
import HomePage from '../screens/HomePage';
import ReportScreen from '../screens/ReportScreen';
import BrowseScreen from '../screens/BrowseScreen';
import ContactOwnerScreen from '../screens/ContactOwnerScreen';

const screens = {
    LoginPage: {
        screen: Login,
        navigationOptions: {
            title: 'FirstPage',
            headerShown: false
        },
    },
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            title: 'Home Page',
            headerShown: false
        }
    },
    ReportScreen: {
        screen: ReportScreen,
        navigationOptions: {
            title: 'Report Screen',
            headerShown: true
        }
    },
    BrowseScreen: {
        screen: BrowseScreen,
        navigationOptions: {
            title: 'Browse Screen',
            headerShown: true
        }
    },
    ContactOwnerScreen: {
        screen: ContactOwnerScreen,
        navigationOptions: {
            title: 'Contact Owner Screen',
            headerShown: true
        }
    }
};

//create new stack navigator, pass the screens you want to navigate in the app
const ViewHierarchy = createStackNavigator(screens);

//wrap the stack navigator inside the app container, this function returns an
//component that we can render to App.js, and it contains all the navigation stuff
//in the navigation stack
export default createAppContainer(ViewHierarchy);