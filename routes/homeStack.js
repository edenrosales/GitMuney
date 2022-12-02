import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import ViewAccountScreen from '../screens/ViewAccountScreen';

const screens = {
    Home: {
        screen: WelcomeScreen,
        navigationOptions: {
            title: 'Home',
            headerTintColor: '#746961',
            headerStyle: { backgroundColor: '#e9e7e4'}
        }
    },
    ViewAccount: {
        screen: ViewAccountScreen,
        navigationOptions: {
            title: 'My Account',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#2d2e30'}
        }
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);