import React, { useState, useEffect } from 'react'
import { Item, Label, Text, Row, Input, Button, Icon } from 'native-base'

const LabelError = props => {
  if (props.obligatory) {
    return (<Label>{props.label} <Text style={{color: '#d9534f'}}>*</Text></Label>)
  } else {
    return (<Label>{props.label}</Label>)
  }
}

export default FormItem = props => {

  const [hideValue, setHideValue] = useState(true)

  useEffect(() => { }, [hideValue])

  getButton = () => {
    if (props.disabled) {
      return (
        <Button dark transparent>
          <Icon type="MaterialIcons" name="block" />
        </Button>
      )
    }
    if (props.secureTextEntry) {
      return (
        <>
          <Button dark danger={props.error} transparent 
            //onPress={() => setHideValue(!hideValue)}
            onPressIn={() => setHideValue(false)}
            onPressOut={() => setHideValue(true)}
          >
            <Icon type="MaterialCommunityIcons" name={hideValue ? 'eye-off' : 'eye-outline'} />
          </Button>
        </>
      )
    }
    if (props.error){
      return (
        <Button danger transparent>
          <Icon type="MaterialCommunityIcons" name="close-circle" />
        </Button>
      )
    }
  }
  
  return (
    <Item stackedLabel>
      <LabelError label={props.label} obligatory={props.obligatory} />
      <Row>
          <Input 
            error={props.error || false}
            disabled={props.disabled || false}
            placeholder={props.placeholder} 
            value={props.value} 
            secureTextEntry={props.secureTextEntry && hideValue} 
            onChangeText={(v) => props.onChangeText(v)} 
            keyboardType={props.keyboardType || 'default'}
          />
          {getButton()}
      </Row>
    </Item>
  )
}