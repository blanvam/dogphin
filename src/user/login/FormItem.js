import React, { Component } from 'react'
import { Item, Label, Text, Row, Input, Button, Icon } from 'native-base'


export default class FormItem extends Component {
  render() {
    if (this.props.error) {
      return (
        <Item stackedLabel error>
          <Label>{this.props.label} <Text style={{color: '#d9534f'}}>*</Text></Label>
          <Row>
            <Input 
              value={this.props.value} 
              secureTextEntry={this.props.secureTextEntry} 
              onChangeText={(v) => this.props.onChangeText(v)} 
            />
            <Button danger transparent>
              <Icon name="close-circle" />
            </Button>
          </Row>
        </Item> )
    }
    return (
      <Item stackedLabel>
        <Label>{this.props.label}</Label>
        <Input 
          value={this.props.value} 
          secureTextEntry={this.props.secureTextEntry} 
          onChangeText={(v) => this.props.onChangeText(v)} 
        />
      </Item>
    )
  }

}