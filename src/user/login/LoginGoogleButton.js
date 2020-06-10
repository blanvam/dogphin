import React from 'react'
import { Button, Text } from 'native-base'

import userServices from '../user.services'


export default LoginGoogleButton = props => {
  return (
    <Button block
      style={{...props.style, marginTop: 10, backgroundColor: '#DB4437' }}
      title="Google Sign-In"
      onPress={userServices.signInWithFacebook}
    >
      <Text> Google </Text>
    </Button>
  )
}