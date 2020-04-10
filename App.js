/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { Container } from 'native-base';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import firebase from '@react-native-firebase/app';

import store from './src/store/index'
import HomeScreen from './src/home/HomeScreen';
import NotificationScreen from './src/notification/NotificationScreen';
import LoadingScreen from './src/user/loading/LoadingScreen';
import LoginScreen from './src/user/login/LoginScreen';
import SignupScreen from './src/user/signup/SignupScreen';
import ProfileScreen from './src/user/profile/ProfileScreen';

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
      <Container>
        <Provider store={store}>
          <NavigationContainer initialRouteName="Home">
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My home' }} />
              <Stack.Screen name="Notifications">
                {props => <NotificationScreen {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Loading" component={LoadingScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Login" component={LoginScreen}
                options={{
                  headerStyle: {
                    backgroundColor: '#00576a',
                  },
                  headerTintColor: '#fff',
                }}
              />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </Container>
    )
  }
}
