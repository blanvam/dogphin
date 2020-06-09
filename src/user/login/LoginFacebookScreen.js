import React from 'react'
import { connect } from 'react-redux'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { Alert, Button, Text } from 'native-base'

import * as userActions from '../user.actions'
import userServices from '../user.services'
import authErrors from './LoginScreen'


const LoginFacebookScreen = props => {
  async function signInWithFacebook () {
    // Attempt login with permissions
    console.log(`signInWithFacebook 1`)
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
  
    console.log(`signInWithFacebook 2`)
    if (result.isCancelled) {
      console.log(`isCancelled`)
      Alert.alert('User cancelled the login process')
    }
  
    console.log(`signInWithFacebook 3`)
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken()
  
    if (!data) {
      Alert.alert('Something went wrong obtaining access token')
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)
    
    return facebookCredential
  }

  signIn = () => {
    console.log(`signIn 1`)
    props.onLoad(true, '', '')
    console.log(`signIn 2`)
    const facebookCredential = signInWithFacebook()
    userServices.signInWithEmail(
      facebookCredential, 
      {},
      (res) => {
        props.onLoad(false, '', '')
        console.log(`OKKKKK ${res}`)
        props.updateUser(res)
        props.navigation.navigate('Profile')
      },
      (error) => {
        console.log(`KKKKKO ${error}`)
        let e = (authErrors[error.code] || authErrors['default'])
        props.onLoad(false, e, e.message)
      }
    )
  }

  return (
    <Button block
      style={{...props.style, marginTop: 10 }}
      title="Facebook Sign-In"
      onPress={signIn}
    >
      <Text> Facebook </Text>
    </Button>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => dispatch(userActions.update(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFacebookScreen)