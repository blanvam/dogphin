import React, { useState, useEffect } from 'react'
import { ListItem, CheckBox, Body, Text, Button, Icon } from 'native-base'

export default RecoverPassword = props => {

  const [showButton, setButton] = useState(false)

  getButton = () => {
    if (showButton) {
      return (
        <Button dark primary onPress={props.onPress}>
          <Text> Recurperar </Text>
        </Button>
      )
    }
  }
  
  return (
    <ListItem style={{borderBottomWidth: 0, minHeight: 100}}>
      <CheckBox checked={showButton} onPress={() => setButton(!showButton)} />
      <Body>
        <Text>Olvidé contraseña</Text>
      </Body>
      {getButton()}
    </ListItem>
  )
}