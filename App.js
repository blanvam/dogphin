/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { Root, Container, Button, Icon } from 'native-base'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import auth from '@react-native-firebase/auth'
import PushNotificationIOS from "@react-native-community/push-notification-ios";

import store from './src/store/index'
import HomeScreen from './src/home/HomeScreen'
import NotificationScreen from './src/notification/NotificationScreen'
import LoginScreen from './src/user/login/LoginScreen'
import SignupScreen from './src/user/signup/SignupScreen'
import ProfileScreen from './src/user/profile/ProfileScreen'


var PushNotification = require("react-native-push-notification");

// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

const Stack = createStackNavigator()
const navigationAuthOptions = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: '#00576a',
    },
    headerTintColor: 'white',
    headerLeft: () => (
      <HeaderBackButton label='Atrás' tintColor='white' onPress={() => {navigation.navigate('Home')}}/>
    )
  }
}
const navigationProfileOptions = ({ navigation }) => {
  return {
    title: 'Perfil',
    headerStyle: {
      backgroundColor: '#00576a',
    },
    headerTintColor: 'white',
    headerLeft: () => (
      <HeaderBackButton label='Atrás' tintColor='white' onPress={() => {navigation.navigate('Home')}}/>
    ),
    headerRight: () => (
      <Button transparent onPress={() => {auth().signOut()}} color="white" >
        <Icon type="MaterialCommunityIcons" name="power" style={{ fontSize: 30, color: 'white' }} />
      </Button>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <Root>
        <Container>
          <Provider store={store}>
            <NavigationContainer initialRouteName="Home">
              <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mapa', header: () => {} }} />
                <Stack.Screen name="Notifications" options={{ title: 'Notificaciones'}} >
                  {props => <NotificationScreen {...props} />}
                </Stack.Screen>
                <Stack.Screen name="Profile" component={ProfileScreen} options={navigationProfileOptions} />
                <Stack.Screen name="Login" component={LoginScreen} options={navigationAuthOptions} />
                <Stack.Screen name="Signup" component={SignupScreen} options={navigationAuthOptions} />
              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
        </Container>
      </Root>
    )
  }
}
