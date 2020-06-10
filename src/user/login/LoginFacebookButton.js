import React from 'react'
import { Button, Text } from 'native-base'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import auth from '@react-native-firebase/auth'

import userServices from '../user.services'


const authErrors = {
  "auth/account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address",
  "auth/invalid-credential": "",
  "auth/operation-not-allowed": "",
  "auth/user-disabled": "",
  "auth/user-not-found": "",
  "auth/wrong-password": "",
  "auth/invalid-verification-code": "",
  "auth/invalid-verification-id": "",
  "default": "Unable to access your facebook account at this time, please try again later"
}

export default LoginFacebookButton = props => {

  signInWithFacebook = () => {
    props.onLoad(true, '')
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          props.onLoad(false, 'Login with Facebook was cancelled.')
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)
              userServices.signInWithCredential(
                facebookCredential,
                () => {
                  props.onLoad(false, '')
                  props.navigation.navigate('Profile')
                },
                (error) => {
                  let e = (authErrors[error.code] || error.message.split("] ")[1] || authErrors['default'])
                  props.onLoad(false, e)
                }
              )
            }
          )
        }
      },
      (error) => {
        props.onLoad(false, `Imposible to do Login with facebook ${error}`)
      }
    )
  }

  return (
    <Button block
      style={{...props.style, marginTop: 10 }}
      title="Facebook Sign-In"
      onPress={signInWithFacebook}
    >
      <Text> Facebook </Text>
    </Button>
  )
}
