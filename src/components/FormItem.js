import React, { Component } from 'react'
import { Item, Label, Text, Row, Input, Button, Icon } from 'native-base'

const LabelError = (props) => {
  if (props.obligatory) {
    return (<Label>{props.label} <Text style={{color: '#d9534f'}}>*</Text></Label>)
  } else {
    return (<Label>{props.label}</Label>)
  }
}

export default class FormItem extends Component {
  render() {
    if (this.props.error) {
      return (
        <Item stackedLabel error>
          <LabelError label={this.props.label} obligatory={this.props.obligatory} />
          <Row>
            <Input 
              value={this.props.value}
              secureTextEntry={this.props.secureTextEntry}
              onChangeText={(v) => this.props.onChangeText(v)}
              keyboardType={this.props.keyboardType || 'default'}
            />
            <Button danger transparent>
              <Icon type="MaterialCommunityIcons" name="close-circle" />
            </Button>
          </Row>
        </Item> )
    } 
    if (this.props.disabled) {
      return (
      <Item stackedLabel>
        <LabelError label={this.props.label} obligatory={this.props.obligatory} />
        <Row>
            <Input 
              disabled
              placeholder={this.props.placeholder} 
              value={this.props.value} 
              secureTextEntry={this.props.secureTextEntry} 
            />
            <Button dark transparent>
              <Icon type="MaterialIcons" name="block" />
            </Button>
        </Row>
      </Item>
      )
    }
    return (
      <Item stackedLabel>
        <LabelError label={this.props.label} obligatory={this.props.obligatory} />
        <Input 
          value={this.props.value} 
          secureTextEntry={this.props.secureTextEntry} 
          onChangeText={(v) => this.props.onChangeText(v)} 
          keyboardType={this.props.keyboardType || 'default'}
        />
      </Item>
    )
  }

}