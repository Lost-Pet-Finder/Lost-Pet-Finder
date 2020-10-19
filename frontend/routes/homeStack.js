import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';

import Login from '../screens/LoginScreen';
import FindPet from '../screens/FindScreen';

const screens = {

    FirstPage: {
        screen: Login,
        navigationOptions: {
            title: 'FirstPage',
            headerShown: false
        },
    },
    FindPetPage: {
        screen: FindPet,
        navigationOptions: {
            title: 'FindPage',
            headerShown: false
        },
    }
}

//create new stack navigator, pass the screens you want to navigate in the app
const HomeStack = createStackNavigator(screens);

//wrap the stack navigator inside the app container, this function returns an
//component that we can render to App.js, and it contains all the navigation stuff
//in the navigation stack
export default createAppContainer(HomeStack);
