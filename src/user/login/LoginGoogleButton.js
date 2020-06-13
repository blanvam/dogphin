import React from 'react'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'

import userServices from '../user.services'

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/user.phonenumbers.read', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '931610236572-betpi524hlbovob3gs95bamhd7ccp9t9.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  //accountName: 'Dogphin', // [Android] specifies an account name on the device that should be used
  iosClientId: 'com.googleusercontent.apps.448549857379-mredr5d177dca81efkn3r0tk2ld2o5aa', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
})

export default LoginGoogleButton = props => {

  signInWithGoogle = () => {
    GoogleSignin.signIn().then(
      (token) => {
        console.log(`signIn ${JSON.stringify(token)}`)
        const googleCredential = auth.GoogleAuthProvider.credential(token)
        console.log(`googleCredential ${JSON.stringify(googleCredential)}`)
        userServices.signInWithCredential(
          googleCredential,
          (result) => {
            console.log(`GUAYYYY ${JSON.stringify(result)}`)
            props.onLoad(false, '')
            props.navigation.navigate('Profile')
          },
          (error) => {
            console.log(`EEERROR`)
            errorFun(error)
          }
        )
      },
      (error) => {
        console.log(`EEERROR 2`)
        errorFun(error)
      }
    )
  }

  errorFun = (error) => {
    let e = 'some other error happened'
    console.log(`Error ${error}`)
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      e = 'User cancelled the login with google'
    } else if (error.code === statusCodes.IN_PROGRESS) {
      e = 'Sign in operation is in progress already'
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      e = 'Google Play services not available'
    }
    props.onLoad(false, e)
  }

  return (
    <GoogleSigninButton
      style={{...props.style, marginTop: 10, width: '100%' }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signInWithGoogle}
    />
  )
}