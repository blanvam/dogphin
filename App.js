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
import * as RNLocalize from 'react-native-localize'

import store from './src/store/index'
import HomeScreen from './src/home/HomeScreen'
import NotificationScreen from './src/notification/NotificationScreen'
import LoginScreen from './src/user/login/LoginScreen'
import SignupScreen from './src/user/signup/SignupScreen'
import ProfileScreen from './src/user/profile/ProfileScreen'
import translations from './src/home/translations.json'

// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

const usedLanguages = RNLocalize.getLocales()

let allLanguages = Object.keys(translations)
let languages = usedLanguages.map(e => e.languageCode)
let lenguage = languages.filter(e => allLanguages.includes(e))[0] || 'en'
let currentTranslations = translations[lenguage]

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
    title: currentTranslations.profile,
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
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: currentTranslations.map, header: () => {} }} />
                <Stack.Screen name="Notifications" options={{ title: currentTranslations.notifications}} >
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
