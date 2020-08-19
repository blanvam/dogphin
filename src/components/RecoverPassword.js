import React, { useState } from 'react'
import { ListItem, CheckBox, Body, Text, Button } from 'native-base'

export default RecoverPassword = props => {

  const [showButton, setButton] = useState(false)

  getButton = () => {
    if (showButton) {
      return (
        <Button dark primary onPress={props.onPress}>
          <Text>{props.textForgot}</Text>
        </Button>
      )
    }
  }
  
  return (
    <ListItem style={{borderBottomWidth: 0, minHeight: 100}}>
      <CheckBox checked={showButton} onPress={() => setButton(!showButton)} />
      <Body>
        <Text>{props.textRecover}</Text>
      </Body>
      {getButton()}
    </ListItem>
  )
}