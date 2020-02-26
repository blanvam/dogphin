/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { Provider } from 'react-redux';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import firebase from '@react-native-firebase/app';

import store from './src/store/index'
import LoadingScreen from './src/loading/LoadingScreen';
import HomeScreen from './src/home/HomeScreen';
import ProfileScreen from './src/profile/ProfileScreen';

// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer initialRouteName="Loading">
          <Stack.Navigator>
            <Stack.Screen name="Loading">
              {props => <LoadingScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Home" component={HomeScreen} />
            
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
